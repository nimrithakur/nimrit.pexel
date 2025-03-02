// Switching between Login & Signup Forms
document.getElementById("show-login").addEventListener("click", function() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
});

document.getElementById("show-signup").addEventListener("click", function() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
});

// Password Validation in Real-Time
document.getElementById("signup-password").addEventListener("input", function() {
    let password = this.value;
    
    document.getElementById("length").classList.toggle("valid", password.length >= 8);
    document.getElementById("uppercase").classList.toggle("valid", /[A-Z]/.test(password));
    document.getElementById("lowercase").classList.toggle("valid", /[a-z]/.test(password));
    document.getElementById("number").classList.toggle("valid", /\d/.test(password));
    document.getElementById("special").classList.toggle("valid", /[@$!%*?&]/.test(password));
});

// Password Toggle Visibility
function togglePassword(inputId) {
    let input = document.getElementById(inputId);
    input.type = input.type === "password" ? "text" : "password";
}

// Signup Form Handling
document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let phone = document.getElementById("signup-phone").value;
    let password = document.getElementById("signup-password").value;

    // Password Validation
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password does not meet the required criteria!");
        return;
    }

    // Store User Data in Local Storage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
        alert("Email already registered!");
        return;
    }

    users.push({ name, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now log in.");
    document.getElementById("signup-form").reset();
});

// Login Form Handling
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Welcome, ${user.name}!`);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password!");
    }
});
