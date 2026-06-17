/**
 * 212 CLOTHING — Stock / Availability Indicator
 *
 * Since you print-on-demand, "out of stock" is really about the
 * BLANK garment running out in a given size — not one specific design.
 * So this works per CATEGORY (T-Shirt / Hoodie / Cap / Slide), and
 * applies automatically to every product page in that category.
 *
 * WHAT THIS DOES:
 *   - Greys out and disables any size you mark as sold out for a
 *     category, on every product page in that category at once.
 *   - Shows a small "Message us on WhatsApp" note under the size
 *     selector, but only on products that actually have a sold-out size.
 *   - If every size of a category is sold out, disables the
 *     "Add to Cart" button too and relabels it "Out of Stock".
 *
 * HOW TO MARK A SIZE AS OUT OF STOCK:
 *   Just edit the category's list below. That single edit applies
 *   to every T-shirt (or every hoodie, etc.) on the whole site.
 *
 *   Example:
 *     tshirt: ['S'],          // size S sold out on ALL t-shirts
 *     hoodie: ['M', 'L'],     // M and L sold out on ALL hoodies
 *
 *   When a size is back in stock, just delete it from the array
 *   (or delete the whole line).
 */
const STOCK_CONFIG = {
  tshirt: ['S'],
  hoodie: ['M', 'L', 'XL', 'XXL','S'],
  cap:    ['XL', 'S'],
  slide:  ['M', 'L'],
};

(function () {
  // Capture the <script> tag's data-category attribute now — this only
  // works synchronously, before any other code runs.
  var scriptTag = document.currentScript;
  var category = scriptTag ? scriptTag.dataset.category : null;

  document.addEventListener('DOMContentLoaded', function () {
    var sizeSelect = document.getElementById('productSize');
    if (!sizeSelect || !category) return;

    var outOfStock = STOCK_CONFIG[category] || [];
    if (outOfStock.length === 0) return; // nothing to do, category fully in stock

    var options = Array.prototype.slice.call(sizeSelect.options);
    var anyDisabled = false;

    options.forEach(function (option) {
      if (outOfStock.indexOf(option.value) !== -1) {
        option.disabled = true;
        if (option.textContent.indexOf('(Out of Stock)') === -1) {
          option.textContent = option.value + ' (Out of Stock)';
        }
        anyDisabled = true;
      }
    });

    if (!anyDisabled) return;

    // If the option that's selected by default just got disabled,
    // jump to the first size that's still available.
    var firstAvailable = options.find(function (o) { return !o.disabled; });
    if (sizeSelect.options[sizeSelect.selectedIndex] && sizeSelect.options[sizeSelect.selectedIndex].disabled) {
      if (firstAvailable) sizeSelect.value = firstAvailable.value;
    }

    // Show the "message us" note once, right after the size selector
    var note = document.createElement('p');
    note.className = 'stock-note';
    note.style.cssText = 'font-size:0.8rem;color:#ff4500;margin:6px 0 0;';
    note.innerHTML = 'Some sizes are sold out. <a href="https://wa.me/212651866578" target="_blank" style="color:#ff4500;text-decoration:underline;">Message us on WhatsApp</a> to check availability or restock.';
    sizeSelect.insertAdjacentElement('afterend', note);

    // If literally nothing is available, disable Add to Cart entirely
    if (!firstAvailable) {
      var addBtn = document.getElementById('addToCartButton');
      if (addBtn) {
        addBtn.disabled = true;
        addBtn.textContent = 'Out of Stock';
        addBtn.style.opacity = '0.5';
        addBtn.style.cursor = 'not-allowed';
      }
    }
  });
})();
