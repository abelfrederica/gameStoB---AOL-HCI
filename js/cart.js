const CART_KEY = "cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  syncCartUI();
}

function addToCart(item) {
  let cart = getCart();

  let existing = cart.find((i) => i.id === item.id);

  if (existing) {
    if (existing.quantity < 3) {
      existing.quantity++;
    }
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((i) => i.id !== id);
  saveCart(cart);
}

function changeQty(id, delta) {
  let cart = getCart();

  let item = cart.find((i) => i.id === id);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  if (item.quantity > 3) {
    item.quantity = 3;
  }

  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  syncCartUI();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function syncCartUI() {
  const total = getCartCount();

  const floatEl = document.getElementById("cartCountFloat");
  if (floatEl) {
    floatEl.textContent = total;
    floatEl.style.display = total > 0 ? "flex" : "none";
  }
}

document.addEventListener("DOMContentLoaded", syncCartUI);
