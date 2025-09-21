// Contenedor donde se mostrarán los productos
const catalogoContainer = document.getElementById("catalogo-products");

// Función para mostrar todos los productos
function mostrarTodos() {
  renderizarCatalogo(productos);
}

// Función para filtrar por categoría
function filtrarProductos(categoria) {
  const filtrados = productos.filter(p => p.categoria === categoria);
  renderizarCatalogo(filtrados);
}

// Función de renderizado (reutilizable)
function renderizarCatalogo(lista) {
  if (!catalogoContainer) return; // seguridad por si no existe el contenedor
  catalogoContainer.innerHTML = "";

  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick='agregarAlCarrito(${JSON.stringify(p)}, 1)'>Agregar al carrito</button>
    `;
    catalogoContainer.appendChild(card);
  });
}

// Cuando se cargue la página, mostrar todos los productos
document.addEventListener("DOMContentLoaded", mostrarTodos);