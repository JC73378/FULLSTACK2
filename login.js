// login.js
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("loginModal");
    const userIcon = document.getElementById("userIcon");
    const closeModal = document.getElementById("closeModal");
    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Abrir modal solo si no hay sesión iniciada
    if (userIcon) {
        userIcon.addEventListener("click", (e) => {
            e.preventDefault();
            if (!localStorage.getItem("usuario")) {
                modal.classList.add("is-visible");
            }
        });
    }

    function cerrarModal() {
        if (modal) modal.classList.remove("is-visible");
    }

    if (closeModal) closeModal.addEventListener("click", cerrarModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) cerrarModal();
    });

    // Lógica de pestañas
    if (loginTab) {
        loginTab.addEventListener("click", () => {
            loginTab.classList.add("active");
            registerTab.classList.remove("active");
            loginForm.classList.add("active");
            registerForm.classList.remove("active");
        });
    }

    if (registerTab) {
        registerTab.addEventListener("click", () => {
            registerTab.classList.add("active");
            loginTab.classList.remove("active");
            registerForm.classList.add("active");
            loginForm.classList.remove("active");
        });
    }

    // Proceso de Login
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = loginForm.querySelector("input[type='email']").value;
            const nombre = email.split("@")[0];
            localStorage.setItem("usuario", nombre);
            location.reload(); // Recargar para que auth.js actualice la vista
        });
    }

    // Proceso de Registro
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = registerForm.querySelector("input[type='text']").value;
            localStorage.setItem("usuario", nombre);
            location.reload(); // Recargar para que auth.js actualice la vista
        });
    }
});