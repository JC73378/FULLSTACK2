// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.getElementById("userIcon");
    const userNameSpan = document.getElementById("userName");

    // Función para mostrar el nombre del usuario y ocultar el ícono
    function mostrarUsuario(nombre) {
        if (userIcon) userIcon.style.display = "none";
        if (userNameSpan) {
            userNameSpan.style.display = "inline";
            userNameSpan.textContent = `🎮 ${nombre}`;
        }
    }

    // Función para mostrar el ícono y ocultar el nombre de usuario
    function ocultarUsuario() {
        if (userIcon) userIcon.style.display = "inline";
        if (userNameSpan) userNameSpan.style.display = "none";
    }

    // Comprueba si hay un usuario en localStorage al cargar la página
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
        mostrarUsuario(usuarioGuardado);
    } else {
        ocultarUsuario();
    }

    // Agrega el evento para cerrar sesión al hacer clic en el nombre
    if (userNameSpan) {
        userNameSpan.addEventListener("click", () => {
            if (confirm("¿Deseas cerrar la sesión?")) {
                localStorage.removeItem("usuario");
                ocultarUsuario();
                // Opcional: recargar la página para limpiar todo
                location.reload();
            }
        });
    }

    // Escucha eventos de storage para sincronizar entre pestañas
    window.addEventListener('storage', (event) => {
        if (event.key === 'usuario') {
            if (event.newValue) {
                mostrarUsuario(event.newValue);
            } else {
                ocultarUsuario();
            }
        }
    });
});