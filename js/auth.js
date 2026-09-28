const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.querySelector(".login-btn");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "") {
      alert("Email cannot be empty");
      return;
    }
    if (password === "") {
      alert("Password cannot be empty");
      return;
    }

    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!registeredUser) {
      alert("No account found. Please sign up first.");
      return;
    }
    
    if (
      email !== registeredUser.email ||
      password !== registeredUser.password
    ) {
      alert("Incorrect email or password");
      return;
    }

    loginBtn.textContent = "CONNECTING...";
    loginBtn.disabled = true;

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(registeredUser));

      alert("Login Successful!");

      window.location.href = "index.html";
    }, 1500);
  });
}

const showPassword = document.getElementById("showPassword");

if (showPassword) {
  showPassword.addEventListener("change", function () {
    passwordInput.type = this.checked ? "text" : "password";
  });
}
