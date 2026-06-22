/**
 * 212 CLOTHING — Related Products Widget
 *
 * Reads JS/product-catalog.js and shows 4 other real products from the
 * same category on the current product page (excluding the current one).
 * Requires a <div id="relatedProductsGrid"></div> placeholder on the page.
 *
 * Respects whatever currency the customer currently has selected
 * (uses the same window.getActiveCurrencyConfig() that currency.js
 * exposes), so prices shown here always match the rest of the site.
 */
document.addEventListener('DOMContentLoaded', function () {
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

  function renderPrice(usdPrice) {
    const cfg = typeof window.getActiveCurrencyConfig === 'function'
      ? window.getActiveCurrencyConfig()
      : { symbol: '$', rate: 1, label: 'USD' };
    const converted = usdPrice * cfg.rate;
    const isWhole = cfg.label === 'MAD';
    return cfg.symbol + (isWhole ? Math.round(converted) : converted.toFixed(2));
  }

  function render() {
    grid.innerHTML = picks.map(p => `
      <a class="related-product-card" href="${p.link}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <h4>${p.name}</h4>
        <p class="related-product-price">${renderPrice(parseFloat(p.price))}</p>
      </a>
    `).join('');
  }

  render();
  // Re-render if the customer switches currency while looking at this page
  window.addEventListener('currencyChanged', render);
});
