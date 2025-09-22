// Contenido completo para tu archivo login.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const modal = document.getElementById("loginModal");
    const userIcon = document.getElementById("userIcon");
    const closeModal = document.getElementById("closeModal");
    const userNameSpan = document.getElementById("userName");

    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // --- Lógica del Modal ---

    // Abrir modal al hacer clic en el ícono de usuario (solo si no está logueado)
    userIcon.addEventListener("click", (e) => {
        e.preventDefault();
        if (!localStorage.getItem("usuario")) {
            // CORRECCIÓN: Usamos classList para mostrar el modal
            modal.classList.add("is-visible");
        }
    });

    // Función para cerrar el modal
    function cerrarModal() {
        // CORRECCIÓN: Usamos classList para ocultar el modal
        modal.classList.remove("is-visible");
    }

    // Eventos para cerrar el modal
    closeModal.addEventListener("click", cerrarModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    // --- Lógica de Pestañas (Tabs) ---

    loginTab.addEventListener("click", () => {
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
    });

    registerTab.addEventListener("click", () => {
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
    });

    // --- Simulación de Login y Registro ---

    // LOGIN
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.querySelector("input[type='email']").value;
        const nombre = email.split("@")[0]; 
        
        localStorage.setItem("usuario", nombre);
        mostrarUsuario(nombre);
        cerrarModal();
    });

    // REGISTRO
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = registerForm.querySelector("input[type='text']").value;

        localStorage.setItem("usuario", nombre);
        mostrarUsuario(nombre);
        cerrarModal();
    });

    // --- Funciones de Usuario ---

    function mostrarUsuario(nombre) {
        userIcon.style.display = "none";
        userNameSpan.style.display = "inline";
        userNameSpan.textContent = `👋 ${nombre}`;
    }

    // Cerrar sesión
    userNameSpan.addEventListener("click", () => {
        if (confirm("¿Cerrar sesión?")) {
            localStorage.removeItem("usuario");
            userIcon.style.display = "inline";
            userNameSpan.style.display = "none";
        }
    });

    // Comprobar si ya hay usuario al cargar la página
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
        mostrarUsuario(usuarioGuardado);
    }
});