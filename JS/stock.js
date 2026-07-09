/**
 * HOW TO MARK SOMETHING AS OUT OF STOCK:
 *   Just edit the category's lists below. That single edit applies
 *   to every T-shirt (or every hoodie, etc.) on the whole site.
 *
 *   Example:
 *     tshirt: { sizes: ['S'], colors: ['white'] },
 *     // size S AND the color white are both sold out on ALL t-shirts
 *
 *     hoodie: { sizes: ['M', 'L'], colors: [] },
 *     // M and L sold out on ALL hoodies, all colors still in stock
 *
 *   When something is back in stock, just delete it from the array.
 *   Color names are matched case-insensitively, so "White", "white",
 *   and "WHITE" all work the same.
 */
const STOCK_CONFIG = {
  tshirt: { sizes: ['XXL'], colors: [] },
  hoodie: { sizes: ['M', 'L', 'XL', 'XXL', 'S'], colors: [] },
};

(function () {
  var scriptTag = document.currentScript;
  var category = scriptTag ? scriptTag.dataset.category : null;

  document.addEventListener('DOMContentLoaded', function () {
    if (!category) return;

    var rules = STOCK_CONFIG[category] || { sizes: [], colors: [] };
    var outOfStockSizes  = rules.sizes  || [];
    var outOfStockColors = (rules.colors || []).map(function (c) { return c.toLowerCase(); });

    var sizeNoticeNeeded  = false;
    var colorNoticeNeeded = false;
    var sizeFullyOut  = false;
    var colorFullyOut = false;

    var sizeSelect = document.getElementById('productSize');
    if (sizeSelect && outOfStockSizes.length > 0) {
      var sizeOptions = Array.prototype.slice.call(sizeSelect.options);

      sizeOptions.forEach(function (option) {
        if (outOfStockSizes.indexOf(option.value) !== -1) {
          option.disabled = true;
          if (option.textContent.indexOf('(Out of Stock)') === -1) {
            option.textContent = option.value + ' (Out of Stock)';
          }
          sizeNoticeNeeded = true;
        }
      });

      if (sizeNoticeNeeded) {
        var firstAvailableSize = sizeOptions.find(function (o) { return !o.disabled; });
        var currentSizeOption = sizeSelect.options[sizeSelect.selectedIndex];
        if (currentSizeOption && currentSizeOption.disabled && firstAvailableSize) {
          sizeSelect.value = firstAvailableSize.value;
        }
        if (!firstAvailableSize) sizeFullyOut = true;
      }
    }

    var swatches = Array.prototype.slice.call(document.querySelectorAll('.color-swatch'));
    if (swatches.length > 0 && outOfStockColors.length > 0) {
      swatches.forEach(function (swatch) {
        var swatchColor = (swatch.dataset.color || '').toLowerCase();
        if (outOfStockColors.indexOf(swatchColor) !== -1) {
          swatch.disabled = true;
          swatch.classList.add('stock-swatch-disabled');
          swatch.title = 'Out of Stock';
          colorNoticeNeeded = true;
        }
      });

      if (colorNoticeNeeded) {
        var firstAvailableSwatch = swatches.find(function (s) { return !s.disabled; });
        var activeSwatch = swatches.find(function (s) { return s.classList.contains('active'); });
        if (activeSwatch && activeSwatch.disabled && firstAvailableSwatch) {
          if (typeof window.selectColor === 'function') {
            window.selectColor(firstAvailableSwatch.dataset.color);
          }
        }
        if (!firstAvailableSwatch) colorFullyOut = true;
      }
    }

    if (!sizeNoticeNeeded && !colorNoticeNeeded) return; 

    if (sizeNoticeNeeded && sizeSelect) {
      var sizeNote = document.createElement('p');
      sizeNote.className = 'stock-note';
      sizeNote.setAttribute('data-stock-key', 'product.sizeout');
      sizeNote.style.cssText = 'font-size:0.8rem;color:#ff4500;margin:6px 0 0;';
      sizeNote.innerHTML = window.t ? window.t('product.sizeout') : 'Some sizes are sold out. <a href="https://wa.me/212664890937" target="_blank" style="color:#ff4500;text-decoration:underline;">Message us on WhatsApp</a> to check availability or restock.';
      sizeSelect.insertAdjacentElement('afterend', sizeNote);
    }

    if (colorNoticeNeeded) {
      var colorContainer = document.querySelector('.color-options') || swatches[swatches.length - 1];
      if (colorContainer) {
        var colorNote = document.createElement('p');
        colorNote.className = 'stock-note';
        colorNote.setAttribute('data-stock-key', 'product.colorout');
        colorNote.style.cssText = 'font-size:0.8rem;color:#ff4500;margin:6px 0 0;';
        colorNote.innerHTML = window.t ? window.t('product.colorout') : 'Some colors are sold out. <a href="https://wa.me/212664890937" target="_blank" style="color:#ff4500;text-decoration:underline;">Message us on WhatsApp</a> to check availability or restock.';
        colorContainer.insertAdjacentElement('afterend', colorNote);
      }
    }

    if (sizeFullyOut || colorFullyOut) {
      var addBtn = document.getElementById('addToCartButton');
      if (addBtn) {
        addBtn.disabled = true;
        addBtn.textContent = 'Out of Stock';
        addBtn.style.opacity = '0.5';
        addBtn.style.cursor = 'not-allowed';
      }
      if (typeof window.showBackInStockForm === 'function') {
        window.showBackInStockForm(category, outOfStockSizes);
      }
    }
  });
})();
