// Usar sessionStorage en vez de localStorage
let carrito = [];
try {
  carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
  if (!Array.isArray(carrito)) carrito = [];
} catch {
  carrito = [];
}

function guardarCarrito() {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  const total = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);
  document.querySelectorAll(".cart-count, #cart-count").forEach(el => {
    el.textContent = total || "0";
  });
}

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

document.addEventListener("DOMContentLoaded", actualizarContador);