let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
 
function saveCart() {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  updateCartUI();
}
 
function updateCartUI() {
  const cartItemCount = document.getElementById('cartItemCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartItemCount) {
    cartItemCount.textContent = totalItems;
    cartItemCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
  renderCartItems();
  updateCartTotal();
}
 
function addToCart(product) {
  const priceSpan = document.getElementById('productPrice');
  if (priceSpan) {
    const usdBase = parseFloat(priceSpan.dataset.usd);
    if (!isNaN(usdBase)) product.price = usdBase;
  }
 
  const existingItemIndex = cart.findIndex(item =>
    item.id === product.id &&
    item.color === product.color &&
    item.size === product.size
  );
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push(product);
  }
  saveCart();
  showCartModal();
}
 
function updateCartItemQuantity(productId, color, size, newQuantity) {
  const item = cart.find(i => i.id === productId && i.color === color && i.size === size);
  if (item) {
    const qty = parseInt(newQuantity);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId, color, size);
    } else {
      item.quantity = qty;
      saveCart();
    }
  }
}
 
function removeFromCart(productId, color, size) {
  cart = cart.filter(item => !(item.id === productId && item.color === color && item.size === size));
  saveCart();
}
 
function clearCart() {
  cart = [];
  saveCart();
  hideCartModal();
}
 
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cartItems');
  if (!cartItemsContainer) return;
 
  cartItemsContainer.innerHTML = '';
 
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align:center;color:#aaa;">' + (window.t ? window.t('cart.empty') : 'Your cart is empty.') + '</p>';
    return;
  }
 
  const cfg = typeof window.getActiveCurrencyConfig === 'function'
    ? window.getActiveCurrencyConfig()
    : { symbol: '$', rate: 1 };
 
  cart.forEach((item, index) => {
    const displayPrice = (item.price * item.quantity * cfg.rate).toFixed(2);
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${window.t ? window.t('cart.color') : 'Color'}: ${item.color}, ${window.t ? window.t('cart.size') : 'Size'}: ${item.size}</p>
        <div class="cart-quantity-control">
          <button class="qty-btn qty-minus" data-index="${index}">−</button>
          <input type="number" class="cart-qty-input" data-index="${index}"
            value="${item.quantity}" min="1">
          <button class="qty-btn qty-plus" data-index="${index}">+</button>
        </div>
      </div>
      <span class="cart-item-price" data-usd="${(item.price * item.quantity).toFixed(2)}">
        ${cfg.symbol}${displayPrice}
      </span>
      <button class="remove-item-button" data-index="${index}">✕</button>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
  });
 
  cartItemsContainer.querySelectorAll('.remove-item-button').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.currentTarget.dataset.index);
      if (!isNaN(idx)) {
        cart.splice(idx, 1);
        saveCart();
      }
    });
  });
 
  cartItemsContainer.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.currentTarget.dataset.index);
      if (!isNaN(idx) && cart[idx]) {
        cart[idx].quantity += 1;
        saveCart();
      }
    });
  });
 
  cartItemsContainer.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.currentTarget.dataset.index);
      if (!isNaN(idx) && cart[idx]) {
        if (cart[idx].quantity <= 1) {
          cart.splice(idx, 1);
        } else {
          cart[idx].quantity -= 1;
        }
        saveCart();
      }
    });
  });
 
  cartItemsContainer.querySelectorAll('.cart-qty-input').forEach(input => {
    input.addEventListener('input', e => {
      const idx = parseInt(e.target.dataset.index);
      const qty = parseInt(e.target.value);
      if (!isNaN(idx) && cart[idx]) {
        if (isNaN(qty) || qty <= 0) {
          cart.splice(idx, 1);
          saveCart();
        } else {
          cart[idx].quantity = qty;
          saveCart();
        }
      }
    });
  });
}
 
function updateCartTotal() {
  const cartTotalSpan = document.getElementById('cartTotal');
  if (!cartTotalSpan) return;
  const cfg = typeof window.getActiveCurrencyConfig === 'function'
    ? window.getActiveCurrencyConfig()
    : { symbol: '$', rate: 1 };
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalSpan.textContent = (total * cfg.rate).toFixed(2);
 
  const parent = cartTotalSpan.parentElement;
  if (parent) {
    parent.childNodes.forEach(node => {
      if (node.nodeType === 3 && /[\$€]|MAD/.test(node.textContent)) {
        node.textContent = node.textContent.replace(/MAD\s*|\$|€/g, cfg.symbol);
      }
    });
  }
}
 
function showCartModal() {
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.style.display = 'block';
    renderCartItems();
    updateCartTotal();
  }
}
 
function hideCartModal() {
  const cartModal = document.getElementById('cartModal');
  if (cartModal) cartModal.style.display = 'none';
}
 
// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) {
    cartIcon.addEventListener('click', e => { e.preventDefault(); showCartModal(); });
  }
 
  const closeButton = document.querySelector('#cartModal .close-button');
  if (closeButton) closeButton.addEventListener('click', hideCartModal);
 
  window.addEventListener('click', e => {
    const cartModal = document.getElementById('cartModal');
    if (e.target === cartModal) hideCartModal();
  });
 
  const addToCartButton = document.getElementById('addToCartButton');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      const productName = document.getElementById('productName').textContent;
      const productPriceEl = document.getElementById('productPrice');
      const productPrice = parseFloat(productPriceEl.dataset.usd || productPriceEl.textContent);
      const sizeElement = document.getElementById('productSize');
      const productSize = sizeElement ? sizeElement.value : 'One Size';
      const productImage = document.getElementById('mainProductImage').src;
 
      const product = {
        id: productName.replace(/[^a-z0-9]/gi, '').toLowerCase(),
        name: productName,
        price: productPrice,
        size: productSize,
        color: typeof selectedColor !== 'undefined' ? selectedColor : 'Standard',
        image: productImage,
        quantity: 1
      };
      addToCart(product);
    });
  }
 
  const checkoutButton = document.getElementById('checkoutButton');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (cart.length > 0) window.location.href = '/checkout.html';
      else alert('Your cart is empty.');
    });
  }
 
  const clearCartButton = document.getElementById('clearCartButton');
  if (clearCartButton) clearCartButton.addEventListener('click', clearCart);
 
  updateCartUI();
});
 
const ColorSwitcher = {
    cache: {},
 
    async init() {
        if (window.location.protocol === 'file:') {
            console.warn("COLOR SWITCHER: Running on file://. Use a local server.");
        }
        const cards = document.querySelectorAll('.product');
        for (let card of cards) {
            const link = card.querySelector('a');
            if (link) this.setupCard(card, link.getAttribute('href'));
        }
    },
 
    async setupCard(card, url) {
        try {
            const absoluteUrl = new URL(url, window.location.href).href;
 
            if (!this.cache[absoluteUrl]) {
                const resp = await fetch(absoluteUrl);
                const html = await resp.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
 
                const colors = Array.from(doc.querySelectorAll('.color-swatch')).map(s => ({
                    name: (s.dataset.color || '').trim().toLowerCase(),
                    label: (s.dataset.color || ''),
                    css: s.style.backgroundColor || '#ccc'
                })).filter(c => c.name);
 
                const imgData = {};
                const scriptMatch = html.match(/const productImages = (\{[\s\S]*?\});/);
                if (scriptMatch) {
                    const content = scriptMatch[1];
                    const blocks = content.matchAll(/([a-zA-Z0-9_-]+|['"][^'"]+['"])\s*:\s*\{([^{}]*?['"]?front['"]?[^{}]*?)\}/g);
                    for (const b of blocks) {
                        const key = b[1].replace(/['"]/g, '').trim().toLowerCase();
                        const f = b[2].match(/['"]?front['"]?\s*:\s*['"]([^'"]+)['"]/);
                        const bk = b[2].match(/['"]?back['"]?\s*:\s*['"]([^'"]+)['"]/);
                        if (f || bk) imgData[key] = { front: f?.[1], back: bk?.[1] };
                    }
                }
 
                const titleEl = doc.getElementById('productName');
                const realTitle = titleEl ? titleEl.textContent.trim() : null;
 
                const priceEl = doc.getElementById('productPrice');
                const rawPrice = priceEl
                    ? parseFloat(priceEl.dataset.usd || priceEl.textContent.trim())
                    : null;
 
                this.cache[absoluteUrl] = {
                    colors, imgData,
                    base: absoluteUrl.substring(0, absoluteUrl.lastIndexOf('/') + 1),
                    realTitle,
                    realPrice: rawPrice,
                };
            }
 
            const { colors, imgData, base, realTitle, realPrice } = this.cache[absoluteUrl];
 
            if (realTitle) {
                const h3 = card.querySelector('h3');
                if (h3 && h3.textContent.trim() !== realTitle) h3.textContent = realTitle;
            }
 
            if (realPrice !== null && !isNaN(realPrice)) {
                const priceStrong = Array.from(card.querySelectorAll('p strong'))
                    .find(el => el.textContent.match(/Price:/i));
                if (priceStrong) {
                    priceStrong.parentElement.dataset.priceScanned = '1';
                    const cfg = typeof window.getActiveCurrencyConfig === 'function'
                        ? window.getActiveCurrencyConfig()
                        : { symbol: '$', rate: 1 };
                    const displayPrice = (realPrice * cfg.rate).toFixed(2);
                    priceStrong.innerHTML =
                        `Price: <span class="converted-price" data-usd="${realPrice}">${cfg.symbol}${displayPrice}</span>`;
                }
            }
 
            if (colors.length === 0) return;
 
            const pTags = card.querySelectorAll('p');
            let targetP = Array.from(pTags).find(p => p.textContent.toLowerCase().includes('description'));
 
            if (targetP) {
                const container = document.createElement('div');
                container.className = 'product-card-colors';
                container.style.cssText = 'display:flex;justify-content:center;gap:8px;padding:12px 0;border-top:1px solid rgba(255,255,255,0.1);margin-top:10px;';
 
                colors.forEach((c, i) => {
                    const btn = document.createElement('button');
                    btn.className = 'listing-color-swatch' + (i === 0 ? ' active' : '');
                    btn.style.cssText = `background-color:${c.css};width:24px;height:24px;border-radius:50%;border:2px solid ${i === 0 ? '#ff4500' : '#444'};cursor:pointer;transition:0.3s;`;
                    btn.title = c.label;
 
                    btn.onclick = e => {
                        e.preventDefault(); e.stopPropagation();
                        container.querySelectorAll('button').forEach(b => {
                            b.style.borderColor = '#444'; b.style.transform = 'scale(1)';
                        });
                        btn.style.borderColor = '#ff4500'; btn.style.transform = 'scale(1.2)';
 
                        const img = card.querySelector('img');
                        const isBack = decodeURIComponent(img.src).includes('²');
                        const data = imgData[c.name];
                        if (data) {
                            const newPath = (isBack && data.back) ? data.back : (data.front || data.back);
                            if (newPath) img.src = newPath.startsWith('/') ? newPath : base + newPath;
                        }
                    };
                    container.appendChild(btn);
                });
                targetP.replaceWith(container);
            }
        } catch (err) {
            console.error('ColorSwitcher Error:', url, err);
        }
    }
};
 
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ColorSwitcher.init());
} else {
    ColorSwitcher.init();
}
