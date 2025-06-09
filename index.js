// Email validation
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
emailInput.addEventListener("input", () => validate(emailInput));
function validate(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity("Email is not in the right format");
        emailError.style.display = "block";
        element.reportValidity();
    } else {
        element.setCustomValidity('');
        emailError.style.display = "none";
    }
}

// DOB validation (18-55 years)
const dobInput = document.getElementById("dob");
const dobError = document.getElementById("dobError");
dobInput.addEventListener("input", () => {
    const dobValue = dobInput.value;
    if (!dobValue) {
        dobInput.setCustomValidity("Please enter your date of birth");
        dobError.style.display = "block";
        return;
    }
    const today = new Date();
    const dobDate = new Date(dobValue);
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }
    if (age < 18 || age > 55) {
        dobInput.setCustomValidity("Age must be between 18 and 55.");
        dobError.style.display = "block";
    } else {
        dobInput.setCustomValidity('');
        dobError.style.display = "none";
    }
});

// Table and localStorage logic
const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#userTable tbody");

function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    tableBody.innerHTML = "";
    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>${user.dob}</td>
                    <td>${user.acceptedTerms}</td>
                `;
        tableBody.appendChild(row);
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Validate DOB again before saving
    dobInput.dispatchEvent(new Event('input'));
    if (!form.checkValidity()) return;

    const user = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        dob: form.dob.value,
        acceptedTerms: form.acceptTerms.checked ? "true" : "false"
    };
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
    form.reset();
});

// On page load
window.onload = function () {
    loadUsers();
};
