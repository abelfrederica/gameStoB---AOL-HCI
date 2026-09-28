const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const logoutBtn = document.getElementById("logoutBtn");
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
} else {
  if (profileName) {
    profileName.textContent = user.name;
  }

  if (profileEmail) {
    profileEmail.textContent = user.email;
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    window.location.href = "login.html";
  });
}
