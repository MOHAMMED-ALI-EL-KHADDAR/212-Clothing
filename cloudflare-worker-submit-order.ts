/**
 * 212 CLOTHING - SECURE ORDER PROCESSING
 * Cloudflare Workers Function
 * 
 * Deploy to: src/workers/submit-order.ts (or .js)
 * 
 * SETUP:
 * 1. Install Wrangler: npm install -g wrangler
 * 2. Create worker: wrangler init
 * 3. Copy this code to src/index.ts
 * 4. Set environment variables in wrangler.toml
 * 5. Deploy: wrangler publish
 */

export interface Env {
  GOOGLE_APPS_SCRIPT_URL: string;
  PUSHOVER_API_TOKEN: string;
  PUSHOVER_USER_KEY: string;
  API_KEY: string;
}

// Rate limiting: simple in-memory store (KV store recommended for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Configuration
const CONFIG = {
  RATE_LIMIT_PER_HOUR: 10,
  INVENTORY: {
    'tshirt14': { price: 24.99, stock: 50 },
    'tshirt16': { price: 24.99, stock: 50 },
    'tshirt13': { price: 24.99, stock: 45 },
    'tshirt15': { price: 24.99, stock: 50 },
    'hoodie20': { price: 59.99, stock: 30 },
    'hoodie23': { price: 59.99, stock: 30 },
    'hoodie19': { price: 59.99, stock: 25 },
    'hoodie21': { price: 59.99, stock: 30 },
    // Add more products here
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function sanitizeString(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/[<>"/]/g, '')
    .substring(0, 500);
}

function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+212|0)[567]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateOrderData(data: any): string[] {
  const errors: string[] = [];

  if (!data.name || sanitizeString(data.name).length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!validatePhoneNumber(data.phone)) {
    errors.push('Invalid phone number format (use +212 or 0)');
  }

  if (!data.city || sanitizeString(data.city).length < 2) {
    errors.push('City name must be at least 2 characters');
  }

  if (!data.address || sanitizeString(data.address).length < 5) {
    errors.push('Address must be at least 5 characters');
  }

  if (!Array.isArray(data.cart) || data.cart.length === 0) {
    errors.push('Cart is empty');
  }

  return errors;
}

function verifyCartPrices(cart: any[]): { errors: string[]; calculatedTotal: number } {
  let calculatedTotal = 0;
  const errors: string[] = [];

  for (const item of cart) {
    const product = (CONFIG.INVENTORY as any)[item.id];

    if (!product) {
      errors.push(`Product ${item.id} not found in inventory`);
      continue;
    }

    if (Math.abs(item.price - product.price) > 0.01) {
      errors.push(`Price mismatch for ${item.id}: expected ${product.price}, got ${item.price}`);
    }

    if (product.stock < item.quantity) {
      errors.push(`Insufficient stock for ${item.id}: only ${product.stock} available`);
    }

    calculatedTotal += product.price * item.quantity;
  }

  return { errors, calculatedTotal };
}

function generateOrderId(): string {
  const now = new Date();
  const dateStr =
    now.getUTCFullYear().toString() +
    String(now.getUTCMonth() + 1).padStart(2, '0') +
    String(now.getUTCDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `212-${dateStr}-${rand}`;
}

function checkRateLimit(ip: string): boolean {
  const key = ip;
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (record && record.resetTime > now) {
    if (record.count >= CONFIG.RATE_LIMIT_PER_HOUR) {
      return false; // Rate limited
    }
    record.count++;
  } else {
    // New hour or new IP
    rateLimitMap.set(key, { count: 1, resetTime: now + 3600000 });
  }

  return true;
}

async function sendPushoverNotification(
  orderData: any,
  env: Env
): Promise<void> {
  try {
    const params = new URLSearchParams({
      token: env.PUSHOVER_API_TOKEN,
      user: env.PUSHOVER_USER_KEY,
      title: `New Order #${orderData.orderId}`,
      message: `${orderData.name}\n📍 ${orderData.city}\n💰 ${orderData.total}`,
      priority: '1',
      sound: 'cashregister',
    });

    await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      body: params,
    });
  } catch (error) {
    console.error('Pushover notification failed:', error);
  }
}

async function submitToGoogleSheet(
  orderData: any,
  env: Env
): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      action: 'saveOrder',
      orderId: orderData.orderId,
      name: orderData.name,
      phone: orderData.phone,
      city: orderData.city,
      address: orderData.address,
      notes: orderData.notes || '',
      product: orderData.productSummary,
      total: orderData.total,
    });

    const response = await fetch(
      env.GOOGLE_APPS_SCRIPT_URL + '?' + params.toString(),
      {
        method: 'GET',
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Google Sheets submission error:', error);
    return false;
  }
}

// ============================================
// CORS HEADERS
// ============================================

function getCorsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': 'https://212clothing.pages.dev',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    'Content-Type': 'application/json',
  };
}

// ============================================
// MAIN HANDLER
// ============================================

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: getCorsHeaders(),
      });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: getCorsHeaders(),
        }
      );
    }

    try {
      // ============================================
      // 1. AUTHENTICATION
      // ============================================
      const apiKey = request.headers.get('x-api-key');
      if (!apiKey || apiKey !== env.API_KEY) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          {
            status: 401,
            headers: getCorsHeaders(),
          }
        );
      }

      // ============================================
      // 2. RATE LIMITING
      // ============================================
      const clientIp =
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('x-forwarded-for') ||
        'unknown';

      if (!checkRateLimit(clientIp)) {
        return new Response(
          JSON.stringify({ error: 'Too many requests. Try again later.' }),
          {
            status: 429,
            headers: getCorsHeaders(),
          }
        );
      }

      // ============================================
      // 3. PARSE REQUEST
      // ============================================
      let data;
      try {
        data = await request.json();
      } catch {
        return new Response(
          JSON.stringify({ error: 'Invalid JSON' }),
          {
            status: 400,
            headers: getCorsHeaders(),
          }
        );
      }

      // ============================================
      // 4. VALIDATE INPUT
      // ============================================
      const validationErrors = validateOrderData(data);
      if (validationErrors.length > 0) {
        return new Response(
          JSON.stringify({ errors: validationErrors }),
          {
            status: 400,
            headers: getCorsHeaders(),
          }
        );
      }

      // ============================================
      // 5. VERIFY PRICES & INVENTORY
      // ============================================
      const { errors: priceErrors, calculatedTotal } = verifyCartPrices(data.cart);
      if (priceErrors.length > 0) {
        return new Response(
          JSON.stringify({ errors: priceErrors }),
          {
            status: 400,
            headers: getCorsHeaders(),
          }
        );
      }

      // Verify total matches
      const clientTotal = parseFloat(data.total) / (data.currencyRate || 1);
      if (Math.abs(calculatedTotal - clientTotal) > 0.5) {
        return new Response(
          JSON.stringify({
            error: 'Order total mismatch. Please refresh and try again.',
            expected: calculatedTotal,
            received: clientTotal,
          }),
          {
            status: 400,
            headers: getCorsHeaders(),
          }
        );
      }

      // ============================================
      // 6. GENERATE ORDER ID
      // ============================================
      const orderId = generateOrderId();

      // ============================================
      // 7. PREPARE ORDER DATA
      // ============================================
      const productSummary = data.cart
        .map(
          (item: any) =>
            `${item.name} (${item.color}, ${item.size}) x${item.quantity}`
        )
        .join(' | ');

      const orderData = {
        orderId,
        name: sanitizeString(data.name),
        phone: sanitizeString(data.phone),
        city: sanitizeString(data.city),
        address: sanitizeString(data.address),
        notes: sanitizeString(data.notes || ''),
        productSummary,
        total: data.total,
        cart: data.cart,
        timestamp: new Date().toISOString(),
        clientIp: clientIp === 'unknown' ? null : clientIp,
      };

      // ============================================
      // 8. SUBMIT TO GOOGLE SHEETS
      // ============================================
      const sheetSubmitted = await submitToGoogleSheet(orderData, env);

      // ============================================
      // 9. SEND NOTIFICATIONS (async)
      // ============================================
      sendPushoverNotification(orderData, env).catch(console.error);

      // ============================================
      // 10. RETURN SUCCESS
      // ============================================
      return new Response(
        JSON.stringify({
          success: true,
          orderId,
          message: 'Order submitted successfully. Confirm via WhatsApp.',
          whatsappUrl: `https://wa.me/212664890937?text=${encodeURIComponent(
            `Order #${orderId}\n${productSummary}\nTotal: ${data.total}`
          )}`,
        }),
        {
          status: 200,
          headers: getCorsHeaders(),
        }
      );
    } catch (error) {
      console.error('Order processing error:', error);
      return new Response(
        JSON.stringify({
          error: 'Server error processing order. Please try again.',
        }),
        {
          status: 500,
          headers: getCorsHeaders(),
        }
      );
    }
  },
};
