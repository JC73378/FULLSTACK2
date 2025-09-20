// Lista de productos
const productos = [ 
  { id: 1, nombre: "Funko Pop Darth Vader", precio: 15990, categoria: "Funko", imagen: "https://i.pinimg.com/736x/b6/02/2f/b6022fe446f016d69f78d9d7b0d15ac6.jpg" },
  { id: 2, nombre: "Poster Marvel Avengers", precio: 8990, categoria: "Poster", imagen: "https://i.pinimg.com/736x/cc/f9/6a/ccf96acf55509bdc961b63252644625a.jpg" },
  { id: 3, nombre: "Figura Batman 30cm", precio: 24990, categoria: "Figura", imagen: "https://i.pinimg.com/1200x/97/44/31/974431814ed05bf8d2e7b9c04236210b.jpg" },
  { id: 4, nombre: "Funko Pop Harry Potter", precio: 16990, categoria: "Funko", imagen: "https://i.pinimg.com/736x/bd/e5/de/bde5de444b3995dc9d09e0ddd9842774.jpg" },
  { id: 5, nombre: "Poster Star Wars Clásico", precio: 10990, categoria: "Poster", imagen: "https://i.pinimg.com/736x/e8/0f/bc/e80fbcd629d490271952793f85fc7f54.jpg" },
  { id: 6, nombre: "Figura Iron Man Edición Especial", precio: 34990, categoria: "Figura", imagen: "https://i.pinimg.com/1200x/f7/a2/fd/f7a2fd36fb46f0f68882ebd7da21ad35.jpg" },
  { id: 7, nombre: "Funko Pop Spiderman", precio: 14990, categoria: "Funko", imagen: "https://i.pinimg.com/736x/08/8d/4f/088d4f6ad02ea92cb5749301ab42517c.jpg" },
  { id: 8, nombre: "Poster Dragon Ball Z", precio: 9990, categoria: "Poster", imagen: "https://i.pinimg.com/1200x/5b/8d/e2/5b8de21fd62ad558f04d9ef5713c5537.jpg" },
  { id: 9, nombre: "Mascara Iron Man Mk 5", precio: 157990, categoria: "Mascara", imagen: "https://i.pinimg.com/736x/b3/50/89/b35089a75dcb3fd9e84aad3121aac111.jpg" },
  { id: 10, nombre: "Funko Pop Super Mario", precio: 9990, categoria: "Funko", imagen: "https://i.pinimg.com/1200x/3b/92/4e/3b924e8d87d76710215f49a5f69d1b63.jpg" }
];

// Obtener contenedor de productos
const catalogoContainer = document.getElementById("catalogo-productos");

// Renderizar productos
function renderProductos(lista) {
  catalogoContainer.innerHTML = "";
  lista.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p class="categoria">${prod.categoria}</p>
      <p class="precio">$${prod.precio.toLocaleString()}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    catalogoContainer.appendChild(card);
  });
}

// Filtros por categoría
function filtrarProductos(categoria) {
  if (categoria === "Todos") {
    renderProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    renderProductos(filtrados);
  }
}

// Carrito con persistencia
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarContadorCarrito();

// Función para agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar carrito en localStorage
  alert(`${producto.nombre} agregado al carrito`);
  actualizarContadorCarrito();
}

// Actualizar número en ícono carrito
function actualizarContadorCarrito() {
  const contador = document.getElementById("cart-count");
  if (contador) {
    contador.textContent = carrito.length;
  }
}

// Mostrar todos al cargar
renderProductos(productos);
