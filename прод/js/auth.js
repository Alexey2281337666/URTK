document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.elements["name"];
        const email = form.elements["email"];
        const password = form.elements["password"];
        const confirmPassword = form.elements["confirmPassword"];

        const scheduleType = document.querySelectorAll(".input_combobox")[0]
            .querySelector("span").textContent;
        const groupOrTeacher = document.querySelectorAll(".input_combobox")[1]
            .querySelector("span").textContent;

        // Сброс подсветки
        [email, password, confirmPassword].forEach(el => el.classList.remove("input-error"));

        let hasError = false;

        // Проверка на пустые поля
        if (!name.value.trim() || !email.value.trim() || !password.value || !confirmPassword.value || groupOrTeacher === "Выберите...") {
            alert("Пожалуйста, заполните все поля.");
            hasError = true;
        }

        // Проверка email-формата
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add("input-error");
            hasError = true;
        }

        // Проверка совпадения паролей
        if (password.value !== confirmPassword.value) {
            password.classList.add("input-error");
            confirmPassword.classList.add("input-error");
            hasError = true;
        }

        if (hasError) return;

        // Проверка на уже существующего пользователя
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user => user.email === email.value.trim());
        if (existingUser) {
            alert("Пользователь с таким email уже зарегистрирован.");
            email.classList.add("input-error");
            return;
        }

        const newUser = {
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value,
            scheduleType,
            groupOrTeacher
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Регистрация прошла успешно!");
        window.location.href = "/прод/lk/my-schedule.html";
    });
});
