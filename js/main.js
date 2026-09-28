fetch("partials/header.html")
  .then((res) => res.text())
  .then((data) => {
    const header = document.getElementById("header");
    if (!header) return;

    header.innerHTML = data;

    const currentPage = window.location.pathname.split("/").pop().split("?")[0];

    document.querySelectorAll(".nav-links a").forEach((link) => {
      const href = link.getAttribute("href");

      if (href === currentPage) {
        link.classList.add("active");
      }
    });

    const profileLink = document.getElementById("profileLink");

    if (profileLink) {
      const user = JSON.parse(localStorage.getItem("user"));
      profileLink.href = user ? "profile.html" : "login.html";
    }

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  })
  .catch((err) => console.error("Header error:", err));

fetch("partials/footer.html")
  .then((res) => res.text())
  .then((data) => {
    const footer = document.getElementById("footer");
    if (footer) footer.innerHTML = data;
  })
  .catch((err) => console.error("Footer error:", err));
