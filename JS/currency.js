
const CURRENCY_CONFIG = {
  USD: { symbol: '$',     rate: 1,     label: 'USD', flag: '🇺🇸' },
  EUR: { symbol: '€',     rate: 0.92,  label: 'EUR', flag: '🇪🇺' },
  MAD: { symbol: 'MAD ', rate: 10.0,  label: 'MAD', flag: '🇲🇦' },
};

let activeCurrency = localStorage.getItem('212_currency') || 'MAD';
 
function getConfig() { return CURRENCY_CONFIG[activeCurrency]; }
 
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
      #currency-toggle-btn {
        padding: 7px 12px;
        font-size: 11px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.5), 0 0 14px rgba(255,69,0,0.3);
        backdrop-filter: blur(6px);
        background: rgba(17,17,17,0.85);
      }
      #currency-toggle-btn .btn-flag { font-size: 13px; }
    }
  `;
  document.head.appendChild(s);
})();
 
function buildWidget() {
  const wrapper = document.createElement('div');
  wrapper.id = 'currency-switcher';
 
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
 
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'currency-toggle-btn';
  updateToggleBtn(toggleBtn);
 
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    toggleBtn.classList.toggle('open', isOpen);
  });
 
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
 
function scanPrices() {
  const productPriceSpan = document.getElementById('productPrice');
  if (productPriceSpan && !productPriceSpan.dataset.usd) {
    const usd = parseFloat(productPriceSpan.textContent);
    if (!isNaN(usd)) productPriceSpan.dataset.usd = usd;
  }
 
  document.querySelectorAll('p strong, p').forEach(el => {
    if (el.dataset.priceScanned) return;
    const text = el.textContent || '';
    const match = text.match(/Price:\s*\$?([\d.]+)/i);
    if (match) {
      el.dataset.priceScanned = '1';
      const usd = parseFloat(match[1]);
      if (isNaN(usd)) return;
 
      const cfgNow = getConfig();
      const displayNow = cfgNow.symbol + (usd * cfgNow.rate).toFixed(2);
      el.innerHTML = el.innerHTML.replace(
        /Price:\s*[$€]?[\d.]+|Price:\s*MAD\s*[\d.]+/i,
        `Price: <span class="converted-price" data-usd="${usd}">${displayNow}</span>`
      );
    }
  });
}
 
function convertAllPrices() {
  const cfg = getConfig();
  const productPriceSpan = document.getElementById('productPrice');
  if (productPriceSpan && productPriceSpan.dataset.usd) {
    productPriceSpan.classList.add('price-converting');
    setTimeout(() => {
      productPriceSpan.textContent = convert(parseFloat(productPriceSpan.dataset.usd));
      productPriceSpan.classList.remove('price-converting');
    }, 100);
 
    const parent = productPriceSpan.parentElement;
    if (parent) {
      parent.childNodes.forEach(node => {
        if (node.nodeType === 3 && /[\$€]|MAD/.test(node.textContent)) {
          node.textContent = node.textContent.replace(/MAD\s*|\$|€/g, cfg.symbol);
        }
      });
    }
  }
 
  document.querySelectorAll('.converted-price[data-usd]').forEach(span => {
    span.classList.add('price-converting');
    setTimeout(() => {
      const usd = parseFloat(span.dataset.usd);
      span.textContent = cfg.symbol + convert(usd);
      span.classList.remove('price-converting');
    }, 100);
  });
 
  updateCartTotalDisplay();
 
  if (typeof renderCartItems === 'function') renderCartItems();
}
 
function convert(usdAmount) {
  const cfg = getConfig();
  return (usdAmount * cfg.rate).toFixed(2);
}
 

function updateCartTotalDisplay() {
  const cfg = getConfig();
  const cartData = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
  const total = cartData.reduce((s, i) => s + i.price * i.quantity, 0);
 
  const cartTotalSpan = document.getElementById('cartTotal');
  if (cartTotalSpan) {
    cartTotalSpan.textContent = (total * cfg.rate).toFixed(2);
    const parent = cartTotalSpan.parentElement;
    if (parent) {
      parent.childNodes.forEach(node => {
        if (node.nodeType === 3 && /[$€]|MAD/.test(node.textContent)) {
          node.textContent = node.textContent.replace(/MAD\s*|\$|€/g, cfg.symbol);
        }
      });
    }
  }
  const checkoutTotalSpan = document.getElementById('checkoutTotal');
  if (checkoutTotalSpan) {
    checkoutTotalSpan.textContent = (total * cfg.rate).toFixed(2);
    const symbolSpan = document.getElementById('checkoutTotalSymbol');
    if (symbolSpan) symbolSpan.textContent = cfg.symbol;
  }
}
 
function switchCurrency(code) {
  activeCurrency = code;
  localStorage.setItem('212_currency', code);
 
  document.querySelectorAll('.currency-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.currency === code);
  });
 
  updateToggleBtn();
 
  document.getElementById('currency-dropdown')?.classList.remove('open');
  document.getElementById('currency-toggle-btn')?.classList.remove('open');
 
  convertAllPrices();

  window.dispatchEvent(new CustomEvent('currencyChanged'));
}
 
window.getActiveCurrencyConfig = () => getConfig();
window.convertFromUSD = (usd) => parseFloat((usd * getConfig().rate).toFixed(2));
window.getActiveCurrencySymbol = () => getConfig().symbol;
 
document.addEventListener('DOMContentLoaded', () => {
  buildWidget();
  const productPriceSpan = document.getElementById('productPrice');
  if (productPriceSpan && !productPriceSpan.dataset.usd) {
    const usd = parseFloat(productPriceSpan.textContent);
    if (!isNaN(usd)) productPriceSpan.dataset.usd = usd;
  }
 
  setTimeout(() => {
    scanPrices();
    if (activeCurrency !== 'USD') {
      convertAllPrices();
    }
  }, 400);
});
 
window.addEventListener('currencyRescan', () => {
  scanPrices();
  convertAllPrices();
});
