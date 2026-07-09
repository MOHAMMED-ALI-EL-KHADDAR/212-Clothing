
function initRelatedProducts() {
  const grid = document.getElementById('relatedProductsGrid');
  if (!grid || typeof PRODUCT_CATALOG === 'undefined') return;

  // Current page path, e.g. "/T-Shirts/product-tshirt14.html"
  const currentPath = window.location.pathname;
  const current = PRODUCT_CATALOG.find(p => currentPath.endsWith(p.link));
  if (!current) return; // unknown page — fail silently, don't break the product page

  const sameCategory = PRODUCT_CATALOG.filter(
    p => p.category === current.category && p.link !== current.link
  );
  if (sameCategory.length === 0) return;

  // Pick up to 4 at random so the section looks different on repeat visits
  const shuffled = sameCategory.slice().sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, 4);

  function renderPrice(price) {
    // Handle custom pricing
    if (price === 'custom' || isNaN(parseFloat(price))) {
      return '💬 Ask for Quote';
    }
    const cfg = typeof window.getActiveCurrencyConfig === 'function'
      ? window.getActiveCurrencyConfig()
      : { symbol: '$', rate: 1, label: 'USD' };
    const converted = parseFloat(price) * cfg.rate;
    const isWhole = cfg.label === 'MAD';
    return cfg.symbol + (isWhole ? Math.round(converted) : converted.toFixed(2));
  }

  function render() {
    grid.innerHTML = picks.map(p => `
      <a class="related-product-card" href="${p.link}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <h4>${p.name}</h4>
        <p class="related-product-price">${renderPrice(p.price)}</p>
      </a>
    `).join('');
  }

  render();
  window.addEventListener('currencyChanged', render);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRelatedProducts);
} else {
  initRelatedProducts();
}
