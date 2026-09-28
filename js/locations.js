const toggleBtn = document.getElementById("toggleStores");
const hiddenStores = document.querySelectorAll(".hidden-store");

let expanded = false;

toggleBtn.addEventListener("click", () => {
  expanded = !expanded;

  hiddenStores.forEach((store) => {
    store.style.display = expanded ? "block" : "none";
  });

  toggleBtn.textContent = expanded ? "View Less" : "View More";
});

const availableLocations = [
  "tokyo",
  "new york",
  "london",
  "seoul",
  "berlin",
  "sydney",
];

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("storeSearch");
const resultBox = document.getElementById("searchResult");
const notFoundBox = document.getElementById("searchNotFound");

searchBtn.addEventListener("click", () => {
  const keyword = searchInput.value.trim().toLowerCase();

  resultBox.style.display = "none";
  notFoundBox.style.display = "none";

  if (keyword === "") {
    return;
  }

  if (availableLocations.includes(keyword)) {
    resultBox.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            Store Found:
            ${searchInput.value}
        `;

    resultBox.style.display = "block";
  } else {
    notFoundBox.style.display = "block";
  }
});
