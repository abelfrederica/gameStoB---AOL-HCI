function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const cartItemsEl = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotalPrice");
const taxEl = document.getElementById("taxPrice");
const discountEl = document.getElementById("discountPrice");
const totalEl = document.getElementById("totalPrice");
const itemCountEl = document.getElementById("itemCount");
const form = document.getElementById("checkoutForm");
const toast = document.getElementById("toast");

let cart = getCart();
let discountValue = 0;

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateUI();
  initPromo();
});

function showToast(msg, type = "success") {
  if (!toast) return;

  toast.textContent = msg;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function renderCart() {
  cart = getCart();

  if (!cartItemsEl) return;
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p>Your cart is empty</p>`;
    updateUI();
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Rp ${item.price.toLocaleString()}</p>

                <div class="cart-actions">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>

            <button onclick="removeItem(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

    cartItemsEl.appendChild(div);
  });

  updateUI();
}

function changeQty(index, delta) {
  cart = getCart();

  if (!cart[index]) return;
  cart[index].quantity += delta;

  if (cart[index].quantity > 3) {
    cart[index].quantity = 3;
    showToast("Max quantity is 3", "error");
  }

  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  cart = getCart();
  cart.splice(index, 1);

  saveCart(cart);
  renderCart();
}

function updateSummary() {
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  let tax = subtotal * 0.1;
  let discount = discountValue;
  let total = subtotal + tax - discount;

  if (total < 0) total = 0;
  if (subtotalEl) subtotalEl.textContent = "Rp " + subtotal.toLocaleString();
  if (taxEl) taxEl.textContent = "Rp " + tax.toLocaleString();
  if (discountEl) discountEl.textContent = "- Rp " + discount.toLocaleString();
  if (totalEl) totalEl.textContent = "Rp " + total.toLocaleString();
}

function updateItemCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (itemCountEl) {
    itemCountEl.textContent = `${totalItems} Items`;
  }
}

function updateHeaderCart() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const el = document.getElementById("cartCount");
  if (el) el.textContent = total;
}

function updateUI() {
  updateSummary();
  updateItemCount();
  updateHeaderCart();
}

function initPromo() {
  const btn = document.getElementById("applyPromo");
  const input = document.getElementById("promoCode");

  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    const code = input.value.trim().toUpperCase();

    if (code === "GAME10") {
      discountValue = 10000;
      showToast("Promo applied: -10.000", "success");
    } else {
      discountValue = 0;
      showToast("Invalid promo code", "error");
    }

    updateUI();
  });
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    cart = getCart();

    const name = document.getElementById("fullname")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const card = document.getElementById("cardNumber")?.value || "";
    const expiry = document.getElementById("expiry")?.value || "";
    const cvv = document.getElementById("cvv")?.value || "";
    const terms = document.getElementById("terms")?.checked;

    if (cart.length === 0) {
      return showToast("Cart is empty!", "error");
    }
    if (name.trim().length < 3) {
      return showToast("Name must be at least 3 characters", "error");
    }
    if (!email.includes("@")) {
      return showToast("Invalid email", "error");
    }
    if (card.length !== 19) {
      return showToast(
        "Card must be 16 digits + spaces (#### #### #### ####)",
        "error",
      );
    }

    const parts = expiry.split("/");

    if (parts.length !== 2) {
      return showToast("Expiry format must be MM/YY", "error");
    }

    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);

    if (isNaN(month) || month < 1 || month > 12) {
      return showToast("Month must be 01 - 12", "error");
    }
    if (isNaN(year) || parts[1].length !== 2) {
      return showToast("Year must be 2 digits", "error");
    }
    if (cvv.length !== 3) {
      return showToast("CVV must be 3 digits", "error");
    }
    if (!terms) {
      return showToast("Please accept terms", "error");
    }

    showToast("Purchase successful 🎉", "success");

    localStorage.removeItem("cart");
    cart = [];

    renderCart();
    updateUI();
    form.reset();
  });
}
