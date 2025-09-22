// productos.js

const catalogoContainer = document.getElementById("catalogo-productos");

// Función para renderizar productos en catálogo
function renderProductos(lista) {
  catalogoContainer.innerHTML = "";
  lista.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <h3>${prod.nombre}</h3>
      <p class="categoria">${prod.categoria}</p>
      <p class="precio">$${prod.precio.toLocaleString()}</p>
      <div class="btn-group-vertical">
        <button class="btn-detalle" onclick="window.location.href='detalle.html?id=${prod.id}'">🔍 Ver Detalle</button>
      </div>
    `;
    catalogoContainer.appendChild(card);
  });
}

// Filtro básico
function filtrarProductos(categoria) {
  if (categoria === "Todos") {
    renderProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    renderProductos(filtrados);
  }
}

// Al cargar la página mostramos todos los productos
document.addEventListener("DOMContentLoaded", () => {
  renderProductos(productos);
});

// Agrega esta función a tu archivo productos.js
function mostrarTodos() {
  renderProductos(productos); // Llama a tu función principal con la lista completa
}

