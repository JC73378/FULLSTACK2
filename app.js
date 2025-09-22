
function crearTarjetaProducto(prod) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const img = document.createElement("img");
  img.src = prod.imagen;
  img.alt = prod.nombre;
  card.appendChild(img);

  const titulo = document.createElement("h3");
  titulo.textContent = prod.nombre;
  card.appendChild(titulo);

  const precio = document.createElement("p");
  precio.textContent = `$${prod.precio.toLocaleString()}`;
  card.appendChild(precio);

  // Agregar un enlace que dirige a la página de detalle
  const btn = document.createElement("a");
  btn.textContent = "Ver detalle";
  btn.href = `detalle.html?id=${prod.id}`;
  btn.classList.add("btn-detalle-home");
  card.appendChild(btn);

  return card;
}

// Función para renderizar 4 productos destacados
function renderizarProductosDestacados() {
  const featuredContainer = document.getElementById("featured-products");
  if (!featuredContainer) return;

  featuredContainer.innerHTML = ""; // limpiar contenido previo

  // Seleccionar 4 productos destacados — aquí simplemente los primeros 4
  const destacados = productos.slice(0, 4);

  destacados.forEach(prod => {
    const card = crearTarjetaProducto(prod);
    featuredContainer.appendChild(card);
  });
}

// Al cargar la página, renderizamos los productos destacados.
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductosDestacados();
});


