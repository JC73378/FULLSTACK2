// Lista de productos geek con imágenes de Pinterest
const productos = [
  { 
    id: 1, 
    nombre: "Funko Pop Darth Vader", 
    precio: 15990, 
    imagen: "https://i.pinimg.com/1200x/d2/a3/f8/d2a3f8e6d9a2f986b9990b24ccf3a298.jpg"},
  { 
    id: 2, 
    nombre: "Poster Marvel Avengers", 
    precio: 8990, 
    imagen: "https://i.pinimg.com/736x/cc/f9/6a/ccf96acf55509bdc961b63252644625a.jpg" 
  },
  { 
    id: 3, 
    nombre: "Figura Batman 30cm", 
    precio: 24990, 
    imagen: "https://i.pinimg.com/1200x/97/44/31/974431814ed05bf8d2e7b9c04236210b.jpg" 
  },
  { 
    id: 4, 
    nombre: "Funko Pop Harry Potter", 
    precio: 16990, 
    imagen: "https://i.pinimg.com/736x/bd/e5/de/bde5de444b3995dc9d09e0ddd9842774.jpg" 
  }
];

// Renderizar productos destacados
const featuredContainer = document.getElementById("featured-products");
productos.forEach(prod => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}">
    <h3>${prod.nombre}</h3>
    <p>$${prod.precio}</p>
    <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
  `;
  featuredContainer.appendChild(card);
});

// Renderizar productos de ofertas (ejemplo: los 2 primeros)
const offersContainer = document.getElementById("offers-products");
productos.slice(0, 2).forEach(prod => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}">
    <h3>${prod.nombre}</h3>
    <p>$${prod.precio}</p>
    <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
  `;
  offersContainer.appendChild(card);
});

// Carrito
let cartCount = 0;

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-cart')) {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
  }
});