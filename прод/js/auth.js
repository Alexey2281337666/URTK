document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.elements["name"].value.trim();
        const email = form.elements["email"].value.trim();
        const password = form.elements["password"].value;
        const confirmPassword = form.elements["confirmPassword"].value;

        const scheduleType = document.querySelectorAll(".input_combobox")[0]
            .querySelector("span").textContent;
        const groupOrTeacher = document.querySelectorAll(".input_combobox")[1]
            .querySelector("span").textContent;

        // Проверки
        if (!name || !email || !password || !confirmPassword || groupOrTeacher === "Выберите...") {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Пароли не совпадают.");
            return;
        }

        // Получаем уже сохранённых пользователей
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Проверяем, существует ли пользователь с таким email
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert("Пользователь с таким email уже зарегистрирован.");
            return;
        }

        // Сохраняем нового пользователя
        const newUser = {
            name,
            email,
            password,
            scheduleType,
            groupOrTeacher
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Регистрация прошла успешно!");
        window.location.href = "/прод/lk/my-schedule.html"; // Переход на страницу входа (создай её)

    });
});
