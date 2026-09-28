const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    const terms = document.getElementById("terms").checked;

    if (username === "") {
      alert("Username cannot be empty");
      return;
    }
    if (username.length < 3) {
      alert("Username must be at least 3 characters");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Invalid email address");
      return;
    }
    if (password === "") {
      alert("Password cannot be empty");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (confirmPassword === "") {
      alert("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!terms) {
      alert("Please accept Terms & Conditions");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (existingUser && existingUser.email === email) {
      alert("Email already registered");
      return;
    }

    const user = {
      name: username,
      email: email,
      password: password,
    };

    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Account created successfully!");

    window.location.href = "login.html";
  });
}
