// --- Shopping Cart Logic ---
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
  const existingItemIndex = cart.findIndex(item =>
    item.id === product.id &&
    item.color === product.color &&
    item.size === product.size
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }
  
  saveCart();
  alert(`${product.name} (${product.color}, ${product.size}) added to cart!`);
}

function removeFromCart(productId, color, size) {
  cart = cart.filter(item => !(item.id === productId && item.color === color && item.size === size));
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
  alert('Cart has been cleared.');
  hideCartModal();
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cartItems');
  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align: center; color: #aaa;">Your cart is empty.</p>';
    return;
  }
  
  cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Color: ${item.color}, Size: ${item.size}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-item-button" data-product-id="${item.id}" data-color="${item.color}" data-size="${item.size}">X</button>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
  });

  document.querySelectorAll('.remove-item-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.dataset.productId;
      const color = event.target.dataset.color;
      const size = event.target.dataset.size;
      removeFromCart(productId, color, size);
    });
  });
}

function updateCartTotal() {
  const cartTotalSpan = document.getElementById('cartTotal');
  if (!cartTotalSpan) return;
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalSpan.textContent = total.toFixed(2);
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
  if (cartModal) {
    cartModal.style.display = 'none';
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Cart Icon Click
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) {
    cartIcon.addEventListener('click', (event) => {
      event.preventDefault();
      showCartModal();
    });
  }

  // Close Button for Modal
  const closeButton = document.querySelector('#cartModal .close-button');
  if (closeButton) {
    closeButton.addEventListener('click', hideCartModal);
  }

  // Close modal when clicking outside of it
  window.addEventListener('click', (event) => {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
      hideCartModal();
    }
  });

  // Add to Cart Button Click
  const addToCartButton = document.getElementById('addToCartButton');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      const productName = document.getElementById('productName').textContent;
      const productPrice = parseFloat(document.getElementById('productPrice').textContent);
      // Failsafe in case a product doesn't have a size dropdown (like some caps)
      const sizeElement = document.getElementById('productSize');
      const productSize = sizeElement ? sizeElement.value : 'One Size';
      const productImage = document.getElementById('mainProductImage').src;
      
      const product = {
        id: productName.replace(/\s/g, '').toLowerCase(),
        name: productName,
        price: productPrice,
        size: productSize,
        color: selectedColor, 
        image: productImage,
        quantity: 1 
      };
      addToCart(product);
    });
  }

  // Checkout Button Click
  const checkoutButton = document.getElementById('checkoutButton');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (cart.length > 0) {
        alert('Proceeding to checkout with ' + cart.length + ' items. (This is where you need to integrate your payment gateway)');
      } else {
        alert('Your cart is empty.');
      }
    });
  }

  // Clear Cart Button Click
  const clearCartButton = document.getElementById('clearCartButton');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart);
  }

  // Initial UI update on load
  updateCartUI();
});