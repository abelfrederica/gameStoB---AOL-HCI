const genreFilter = document.getElementById("genreFilter");
const sortFilter = document.getElementById("sortFilter");
const platformBtns = document.querySelectorAll(".platform-btn");
const productsGrid = document.getElementById("productsGrid");
const emptyState = document.getElementById("emptyState");
const resetFilters = document.getElementById("resetFilters");
const toast = document.getElementById("toastNotification");

let currentPlatform = "all";

document.addEventListener("DOMContentLoaded", () => {
  initCartButtons();
  filterGames();
});

platformBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    platformBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    currentPlatform = btn.dataset.platform;
    filterGames();
  });
});

if (genreFilter) genreFilter.addEventListener("change", filterGames);
if (sortFilter) sortFilter.addEventListener("change", filterGames);

if (resetFilters) {
  resetFilters.addEventListener("click", () => {
    genreFilter.value = "all";
    sortFilter.value = "featured";
    currentPlatform = "all";

    platformBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.platform === "all");
    });

    filterGames();
  });
}

function filterGames() {
  const selectedGenre = genreFilter.value;
  const selectedSort = sortFilter.value;

  let cards = Array.from(document.querySelectorAll(".product-card"));

  cards.forEach((card) => {
    const genreMatch =
      selectedGenre === "all" || card.dataset.genre === selectedGenre;

    const platformMatch =
      currentPlatform === "all" || card.dataset.platform === currentPlatform;

    card.style.display = genreMatch && platformMatch ? "flex" : "none";
  });

  let visibleCards = cards.filter((c) => c.style.display !== "none");

  const sortMap = {
    priceLow: (a, b) => a.dataset.price - b.dataset.price,
    priceHigh: (a, b) => b.dataset.price - a.dataset.price,
    ratingHigh: (a, b) => b.dataset.rating - a.dataset.rating,
    ratingLow: (a, b) => a.dataset.rating - b.dataset.rating,
  };

  if (sortMap[selectedSort]) {
    visibleCards.sort(sortMap[selectedSort]);
  }

  visibleCards.forEach((card) => productsGrid.appendChild(card));

  if (emptyState) {
    emptyState.classList.toggle("show", visibleCards.length === 0);
  }
}

function initCartButtons() {
  document.querySelectorAll(".btn-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");

      const item = {
        id: card.dataset.name,
        name: card.dataset.name,
        price: Number(card.dataset.price),
        image: card.dataset.image,
      };

      addToCart(item);
      showToast(`${item.name} added to cart`);
    });
  });
}

function showToast(msg) {
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
