// detalle.js

// Obtener el contenedor
const contenedor = document.getElementById("detalle-producto");

// Obtener ID desde URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Obtener producto por ID
const producto = productos.find(p => p.id === id);

// Renderizar producto si existe
if (producto) {
  contenedor.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <div class="detalle-info">
      <h2>${producto.nombre}</h2>
      <p><strong>Categoría:</strong> ${producto.categoria}</p>
      <p><strong>Descripción:</strong> ${producto.descripcion || "Sin descripción."}</p>
      <p class="detalle-precio">$${producto.precio.toLocaleString()}</p>
      <div class="cantidad-container">
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" min="1" value="1" style="width:60px; margin-left:10px;">
      </div>
      <div class="detalle-buttons">
        <button class="btn-volver" id="btnVolver">🔙 Volver</button>
        <button class="btn-carrito" id="btnAgregar">🛒 Agregar al carrito</button>
      </div>
    </div>
  `;

  // Botón Volver
  document.getElementById("btnVolver").addEventListener("click", () => {
    if (document.referrer && document.referrer.includes(window.location.origin)) {
      window.history.back();
    } else {
      window.location.href = "productos.html";
    }
  });

  // Botón Agregar al carrito
  document.getElementById("btnAgregar").addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (cantidad < 1 || isNaN(cantidad)) {
      alert("Cantidad inválida");
      return;
    }

    // Llama a la función global para agregar al carrito
    agregarAlCarrito(producto, cantidad);
    alert(`Se agregaron ${cantidad} unidad(es) de ${producto.nombre} al carrito.`);
  });
} else {
  // Manejo de error si no se encuentra el producto
  contenedor.innerHTML = "<p>Producto no encontrado.</p>";
}