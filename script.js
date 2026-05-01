const form = document.getElementById("signupForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll("input, textarea, select").forEach(el => el.classList.remove("error-input"));

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const age = document.getElementById("age");
    const style = document.getElementById("style");
    const message = document.getElementById("message");
    const agreement = document.getElementById("agreement");
    const experience = document.querySelector('input[name="experience"]:checked');

    if (name.value.trim().length < 3) {
        showError(name, "Name must have at least 3 characters.");
        valid = false;
    }

    if (!email.value.includes("@") || !email.value.includes(".")) {
        showError(email, "Enter a valid email.");
        valid = false;
    }

    if (age.value < 5 || age.value > 100 || age.value === "") {
        showError(age, "Age must be between 5 and 100.");
        valid = false;
    }

    if (style.value === "") {
        showError(style, "Please select a style.");
        valid = false;
    }

    if (!experience) {
        showError(document.querySelector(".radio-group"), "Choose experience level.");
        valid = false;
    }

    if (message.value.trim().length < 10) {
        showError(message, "Message must be at least 10 characters.");
        valid = false;
    }

    if (!agreement.checked) {
        showError(agreement.parentElement, "You must agree.");
        valid = false;
    }

    if (valid) {
        alert("Application sent successfully!");
        form.reset();
    }
});

function showError(input, message) {
    const error = input.nextElementSibling || input.parentElement.nextElementSibling;
    error.textContent = message;

    if (input.tagName !== "DIV") {
        input.classList.add("error-input");
    }
}

fetch("classes.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const tableBody = document.querySelector("#classesTable tbody");
        const programs = data.academy.programs;

        programs.forEach(function(program) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${program.style}</td>
                <td>${program.details.level}</td>
                <td>${program.details.teacher}</td>
                <td>${program.details.schedule.day}</td>
                <td>${program.details.schedule.time}</td>
            `;

            tableBody.appendChild(row);
        });
    })
    .catch(function(error) {
        console.log("Error loading JSON:", error);
    });