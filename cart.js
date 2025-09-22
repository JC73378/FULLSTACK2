// cart.js

// --- PASO 1: Detectar si la página fue recargada (con F5) ---
// Este código revisa cómo se cargó la página.
const navEntries = performance.getEntriesByType("navigation");
if (navEntries.length > 0 && navEntries[0].type === 'reload') {
  // Si fue por un "reload", borramos solo el carrito de la memoria de sesión.
  sessionStorage.removeItem('carrito');
}

// --- PASO 2: Cargar el carrito desde la memoria de sesión ---
// Si la página no se recargó, aquí se recuperarán los productos que ya tenías.
// Si se recargó, 'sessionStorage' estará vacío y el carrito empezará en 0.
let carrito = [];
try {
  carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
  if (!Array.isArray(carrito)) carrito = [];
} catch {
  carrito = [];
}

// --- PASO 3: Funciones normales del carrito ---

// Guarda el carrito en la memoria de sesión
function guardarCarrito() {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualiza el número en el ícono del carrito
function actualizarContador() {
  const total = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);
  document.querySelectorAll(".cart-count, #cart-count").forEach(el => {
    el.textContent = total || "0";
  });
}

// Añade productos al carrito
function agregarAlCarrito(producto, cantidad) {
  const index = carrito.findIndex(item => item.id === producto.id);
  if (index !== -1) {
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }
  guardarCarrito();
  actualizarContador();
}

// Actualizar el contador cuando la página carga por primera vez
document.addEventListener("DOMContentLoaded", actualizarContador);