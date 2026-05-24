/**
 * 212 CLOTHING — Currency Switcher
 * Supports: USD ($) · EUR (€) · MAD (د.م.)
 *
 * HOW TO ADD TO ANY PAGE:
 *   Add this ONE line before </body>:
 *   <script src="/CSS/currency.js"></script>
 *
 * HOW IT WORKS:
 *   1. Reads every price on the page and stores its USD base value.
 *   2. When user picks a currency, converts all prices instantly.
 *   3. Patches the cart so cart totals and item prices convert too.
 *   4. Saves the user's choice in localStorage — persists across pages.
 */

/* ─────────────────────────────────────────────
   RATES  (base: 1 USD)
   Update these numbers when rates change.
───────────────────────────────────────────── */
const CURRENCY_CONFIG = {
  USD: { symbol: '$',     rate: 1,     label: 'USD', flag: '🇺🇸' },
  EUR: { symbol: '€',     rate: 0.92,  label: 'EUR', flag: '🇪🇺' },
  MAD: { symbol: 'MAD ', rate: 10.0,  label: 'MAD', flag: '🇲🇦' },
};

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
let activeCurrency = localStorage.getItem('212_currency') || 'USD';

function getConfig() { return CURRENCY_CONFIG[activeCurrency]; }

/* ─────────────────────────────────────────────
   INJECT WIDGET STYLES
───────────────────────────────────────────── */
(function injectStyles() {
  const s = document.createElement('style');
  s.textContent = `
    /* ── Floating currency button ── */
    #currency-switcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9000;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
    }

    #currency-toggle-btn {
      background: #111;
      border: 1px solid #ff4500;
      color: #ff4500;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      padding: 10px 18px;
      border-radius: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 0 18px rgba(255,69,0,0.25);
      transition: box-shadow 0.3s, background 0.3s;
      user-select: none;
    }
    #currency-toggle-btn:hover {
      background: #1a0800;
      box-shadow: 0 0 28px rgba(255,69,0,0.45);
    }
    #currency-toggle-btn .btn-flag { font-size: 16px; }
    #currency-toggle-btn .btn-chevron {
      font-size: 10px;
      transition: transform 0.25s;
    }
    #currency-toggle-btn.open .btn-chevron { transform: rotate(180deg); }

    /* ── Dropdown ── */
    #currency-dropdown {
      display: none;
      flex-direction: column;
      background: #111;
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      animation: dropIn 0.2s ease;
    }
    #currency-dropdown.open { display: flex; }
    @keyframes dropIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .currency-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      cursor: pointer;
      font-size: 14px;
      letter-spacing: 1.5px;
      color: #ccc;
      border: none;
      background: transparent;
      text-align: left;
      transition: background 0.2s, color 0.2s;
      white-space: nowrap;
    }
    .currency-option:hover { background: #1a1a1a; color: #fff; }
    .currency-option.active {
      color: #ff4500;
      background: rgba(255,69,0,0.08);
    }
    .currency-option .opt-flag { font-size: 18px; }
    .currency-option .opt-label { font-weight: 600; }
    .currency-option .opt-name { color: #555; font-size: 12px; }

    /* ── Price flash animation on switch ── */
    .price-converting {
      transition: opacity 0.2s;
      opacity: 0.4;
    }

    @media (max-width: 480px) {
      #currency-switcher { bottom: 16px; right: 16px; }
    }
  `;
  document.head.appendChild(s);
})();

/* ─────────────────────────────────────────────
   BUILD THE WIDGET
───────────────────────────────────────────── */
function buildWidget() {
  const wrapper = document.createElement('div');
  wrapper.id = 'currency-switcher';

  // Dropdown
  const dropdown = document.createElement('div');
  dropdown.id = 'currency-dropdown';

  Object.entries(CURRENCY_CONFIG).forEach(([code, cfg]) => {
    const btn = document.createElement('button');
    btn.className = 'currency-option' + (code === activeCurrency ? ' active' : '');
    btn.dataset.currency = code;
    btn.innerHTML = `
      <span class="opt-flag">${cfg.flag}</span>
      <span class="opt-label">${cfg.label}</span>
      <span class="opt-name">${cfg.symbol} — ${code === 'MAD' ? 'Moroccan Dirham' : code === 'EUR' ? 'Euro' : 'US Dollar'}</span>
    `;
    btn.addEventListener('click', () => switchCurrency(code));
    dropdown.appendChild(btn);
  });

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'currency-toggle-btn';
  updateToggleBtn(toggleBtn);

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    toggleBtn.classList.toggle('open', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
    toggleBtn.classList.remove('open');
  });

  wrapper.appendChild(dropdown);
  wrapper.appendChild(toggleBtn);
  document.body.appendChild(wrapper);
}

function updateToggleBtn(btn) {
  const cfg = getConfig();
  if (!btn) btn = document.getElementById('currency-toggle-btn');
  if (!btn) return;
  btn.innerHTML = `
    <span class="btn-flag">${cfg.flag}</span>
    <span>${cfg.label}</span>
    <span class="btn-chevron">▲</span>
  `;
}

/* ─────────────────────────────────────────────
   PRICE SCANNING
   Finds every price element on the page and
   stores its original USD value as data-usd.
───────────────────────────────────────────── */
function scanPrices() {
  /* 1. Product page: <span id="productPrice">39.99</span> */
  const productPriceSpan = document.getElementById('productPrice');
  if (productPriceSpan && !productPriceSpan.dataset.usd) {
    const usd = parseFloat(productPriceSpan.textContent);
    if (!isNaN(usd)) productPriceSpan.dataset.usd = usd;
  }

  /* 2. Listing pages: <p><strong>Price: $00.00</strong></p>
     We wrap the number part so we can update it later. */
  document.querySelectorAll('p strong, p').forEach(el => {
    if (el.dataset.priceScanned) return;
    const text = el.textContent || '';
    const match = text.match(/Price:\s*\$?([\d.]+)/i);
    if (match) {
      el.dataset.priceScanned = '1';
      const usd = parseFloat(match[1]);
      if (isNaN(usd)) return;

      // Replace the text content with a structured span we can update
      el.innerHTML = el.innerHTML.replace(
        /Price:\s*\$?[\d.]+/i,
        `Price: <span class="converted-price" data-usd="${usd}"></span>`
      );
    }
  });

  /* 3. Cart total label: <p>Total: $<span id="cartTotal">...</span></p>
     We find the "$" text node before #cartTotal and store it. */
  // Handled inside patchCartRendering()
}

/* ─────────────────────────────────────────────
   CONVERT ALL PRICES
───────────────────────────────────────────── */
function convertAllPrices() {
  const cfg = getConfig();

  /* 1. Product page #productPrice */
  const productPriceSpan = document.getElementById('productPrice');
  if (productPriceSpan && productPriceSpan.dataset.usd) {
    productPriceSpan.classList.add('price-converting');
    setTimeout(() => {
      productPriceSpan.textContent = convert(parseFloat(productPriceSpan.dataset.usd));
      productPriceSpan.classList.remove('price-converting');
    }, 100);

    // Also fix the $ symbol before it
    const parent = productPriceSpan.parentElement;
    if (parent) {
      parent.childNodes.forEach(node => {
        if (node.nodeType === 3 && node.textContent.includes('$')) {
          node.textContent = node.textContent.replace(/\$|€|MAD\s*/g, cfg.symbol);
        }
      });
    }
  }

  /* 2. .converted-price spans (listing pages) */
  document.querySelectorAll('.converted-price[data-usd]').forEach(span => {
    span.classList.add('price-converting');
    setTimeout(() => {
      const usd = parseFloat(span.dataset.usd);
      span.textContent = cfg.symbol + convert(usd);
      span.classList.remove('price-converting');
    }, 100);
  });

  /* 3. Cart total */
  updateCartTotalDisplay();

  /* 4. Cart item prices (already rendered in DOM) */
  document.querySelectorAll('.cart-item-price').forEach(el => {
    el.classList.add('price-converting');
    const usd = parseFloat(el.dataset.usd || el.textContent.replace(/[^0-9.]/g, ''));
    if (!el.dataset.usd) el.dataset.usd = usd;
    setTimeout(() => {
      el.textContent = cfg.symbol + convert(usd);
      el.classList.remove('price-converting');
    }, 100);
  });

  /* 5. Currency label in cart total row */
  const totalPre = document.getElementById('cartTotalPre');
  if (totalPre) totalPre.textContent = cfg.symbol;
}

function convert(usdAmount) {
  const cfg = getConfig();
  return (usdAmount * cfg.rate).toFixed(2);
}

/* ─────────────────────────────────────────────
   PATCH cart.js  — override rendering functions
   so cart items and totals respect active currency
───────────────────────────────────────────── */
function patchCartRendering() {
  /* Wait until cart.js has loaded (it's deferred by DOMContentLoaded) */
  const applyPatch = () => {
    /* ── Patch renderCartItems ── */
    if (typeof renderCartItems === 'function') {
      const _orig = renderCartItems;
      window.renderCartItems = function() {
        _orig(); // run original first

        const cfg = getConfig();

        // Fix each item price
        document.querySelectorAll('.cart-item-price').forEach(el => {
          const raw = el.textContent.replace(/[^0-9.]/g, '');
          const usd = parseFloat(raw);
          if (!isNaN(usd)) {
            if (!el.dataset.usd) el.dataset.usd = usd;
            el.textContent = cfg.symbol + (usd * cfg.rate).toFixed(2);
          }
        });

        // Fix total
        updateCartTotalDisplay();
      };
    }

    /* ── Patch updateCartTotal ── */
    if (typeof updateCartTotal === 'function') {
      window.updateCartTotal = function() {
        const cartTotalSpan = document.getElementById('cartTotal');
        if (!cartTotalSpan) return;
        const cfg = getConfig();
        // cart is a global in cart.js
        if (typeof cart !== 'undefined') {
          const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
          cartTotalSpan.textContent = (total * cfg.rate).toFixed(2);
        }
        updateCartTotalDisplay();
      };
    }
  };

  // Apply immediately if possible, else after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPatch);
  } else {
    // Slight delay to let cart.js finish its own DOMContentLoaded handler
    setTimeout(applyPatch, 200);
  }
}

function updateCartTotalDisplay() {
  const cfg = getConfig();
  const cartTotalSpan = document.getElementById('cartTotal');
  if (!cartTotalSpan) return;

  // Fix the symbol prefix ("Total: $")
  const parent = cartTotalSpan.parentElement;
  if (parent) {
    // Replace the text node that has the old symbol
    parent.childNodes.forEach(node => {
      if (node.nodeType === 3) {
        node.textContent = node.textContent.replace(/Total:\s*[$€]|Total:\s*MAD\s*/i, `Total: ${cfg.symbol}`);
      }
    });
  }

  // Recalculate total in new currency
  if (typeof cart !== 'undefined') {
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    cartTotalSpan.textContent = (total * cfg.rate).toFixed(2);
  }
}

/* ─────────────────────────────────────────────
   SWITCH CURRENCY
───────────────────────────────────────────── */
function switchCurrency(code) {
  activeCurrency = code;
  localStorage.setItem('212_currency', code);

  // Update active state in dropdown
  document.querySelectorAll('.currency-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.currency === code);
  });

  // Update toggle button label
  updateToggleBtn();

  // Close dropdown
  document.getElementById('currency-dropdown')?.classList.remove('open');
  document.getElementById('currency-toggle-btn')?.classList.remove('open');

  // Convert everything
  convertAllPrices();
}

/* ─────────────────────────────────────────────
   ALSO: expose a helper so cart.js addToCart
   always stores the USD price (not the converted one)
   This prevents double-conversion when re-rendering.
───────────────────────────────────────────── */
window.getActiveCurrencyConfig = () => getConfig();
window.convertFromUSD = (usd) => parseFloat((usd * getConfig().rate).toFixed(2));
window.getActiveCurrencySymbol = () => getConfig().symbol;

/* ─────────────────────────────────────────────
   BOOT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildWidget();
  patchCartRendering();

  // Small delay so all dynamic content (ColorSwitcher, cart) renders first
  setTimeout(() => {
    scanPrices();
    // Apply saved currency if not USD
    if (activeCurrency !== 'USD') {
      convertAllPrices();
    }
  }, 400);
});

// Re-scan after any dynamic renders (e.g. ColorSwitcher replaces price p tags)
window.addEventListener('currencyRescan', () => {
  scanPrices();
  convertAllPrices();
});