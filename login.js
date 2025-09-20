// Elementos del modal
const modal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const userIcon = document.getElementById("userIcon");
const userNameSpan = document.getElementById("userName");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Abrir modal al hacer clic en el ícono de usuario (solo si no está logueado)
userIcon.addEventListener("click", (e) => {
  e.preventDefault();
  if (!localStorage.getItem("usuario")) {
    modal.style.display = "flex";
  }
});

// Cerrar modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cambiar entre login y registro
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

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// ------------------------- //
//     SIMULACIÓN LOGIN      //
// ------------------------- //

// LOGIN
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.querySelector("input[type='email']").value;
  const password = loginForm.querySelector("input[type='password']").value;

  if (email && password) {
    // Simulamos login
    const nombre = email.split("@")[0]; // Usa lo que va antes del @ como nombre
    localStorage.setItem("usuario", nombre);
    mostrarUsuario(nombre);
    modal.style.display = "none";
  } else {
    alert("Debes ingresar tus credenciales.");
  }
});

// REGISTRO
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = registerForm.querySelector("input[type='text']").value;
  const email = registerForm.querySelector("input[type='email']").value;
  const password = registerForm.querySelector("input[type='password']").value;

  if (nombre && email && password) {
    localStorage.setItem("usuario", nombre);
    mostrarUsuario(nombre);
    modal.style.display = "none";
  } else {
    alert("Completa todos los campos.");
  }
});

// Mostrar usuario logueado
function mostrarUsuario(nombre) {
  userIcon.style.display = "none";
  userNameSpan.style.display = "inline";
  userNameSpan.textContent = `👋 ${nombre}`;
}

// Cerrar sesión (si clickea el nombre)
userNameSpan.addEventListener("click", () => {
  const confirmar = confirm("¿Cerrar sesión?");
  if (confirmar) {
    localStorage.removeItem("usuario");
    userIcon.style.display = "inline";
    userNameSpan.style.display = "none";
  }
});

// Comprobar si ya hay usuario al cargar
window.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuario");
  if (usuario) {
    mostrarUsuario(usuario);
  }
});
