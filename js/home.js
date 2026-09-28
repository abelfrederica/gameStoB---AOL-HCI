const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

function updateCarousel() {
  if (!track) return;

  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));

  if (dots[currentSlide]) {
    dots[currentSlide].classList.add("active");
  }
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    updateCarousel();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    updateCarousel();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    updateCarousel();
  });
});

if (slides.length > 0) {
  setInterval(() => {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    updateCarousel();
  }, 5000);
}

const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialPages = document.querySelectorAll(".testimonial-page");

const nextReview = document.querySelector(".next-review");
const prevReview = document.querySelector(".prev-review");

let currentPage = 0;

function updateReviewSlider() {
  testimonialTrack.style.transform = `translateX(-${currentPage * 100}%)`;
}

if (nextReview) {
  nextReview.addEventListener("click", () => {
    currentPage++;

    if (currentPage >= testimonialPages.length) {
      currentPage = 0;
    }

    updateReviewSlider();
  });
}

if (prevReview) {
  prevReview.addEventListener("click", () => {
    currentPage--;

    if (currentPage < 0) {
      currentPage = testimonialPages.length - 1;
    }

    updateReviewSlider();
  });
}

window.addEventListener("resize", () => {
  currentPage = 0;
  updateReviewSlider();
});

window.addEventListener("resize", updateReviewSlider);

const downloadToast = document.getElementById("downloadToast");
const claimButtons = document.querySelectorAll(".claim-btn");

claimButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (downloadToast) {
      downloadToast.classList.add("show");

      setTimeout(() => {
        downloadToast.classList.remove("show");
      }, 3000);
    }
  });
});

function showToast(msg) {
  const toast = document.getElementById("toastNotification");

  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function addGameToCart(item) {
  addToCart(item);
  showToast(`${item.name} added to cart`);
}
