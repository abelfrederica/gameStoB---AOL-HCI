const toggleBtn = document.getElementById("toggleDLCs");
const hiddenCards = document.querySelectorAll(".hidden-dlc");

let expanded = false;

toggleBtn.addEventListener("click", () => {
  expanded = !expanded;

  hiddenCards.forEach((card) => {
    card.classList.toggle("show");
  });

  toggleBtn.textContent = expanded ? "View Less" : "Load More Results";
});

const toast = document.getElementById("downloadToast");
const claimButtons = document.querySelectorAll(".claim-btn, .hero-btn");

claimButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  });
});
