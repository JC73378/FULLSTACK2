// Catalogo base de productos rederizados
export const products = [
  { id: 1,  name: 'Homer Donut (Underwear)',  price: 24.99,  category: 'Limited Edition • The Simpsons', onSale: true,  img: 'assets/homer-donut.png',        stock: 18 },
  { id: 2,  name: 'Kuromi Bow (Supreme)',     price: 19.99,  category: 'Limited Edition • Sanrio',       onSale: true,  img: 'assets/kuromi-bow.jpg',        stock: 6  },
  { id: 3,  name: 'Tyrael Gold (Diablo)',     price: 249.99, category: 'Limited Edition • Blizzard',     onSale: false, img: 'assets/diablo-tyrael-gold.jpg', stock: 2  },
  { id: 4,  name: 'Hatbox Ghost Glow',        price: 24.99,  category: 'Limited Edition • Disney',       onSale: false, img: 'assets/hatbox-ghost-glow.png',  stock: 12 },
  { id: 5,  name: 'Godzilla Chibi',           price: 24.99,  category: 'Limited Edition • Toho',         onSale: true,  img: 'assets/godzilla-chibi.jpg',    stock: 20 },
  { id: 6,  name: 'Jigsaw (Saw)',             price: 19.99,  category: 'Limited Edition • Horror',       onSale: false, img: 'assets/jigsaw-saw.png',         stock: 4  },
  { id: 7,  name: 'Spider-Cat (Flocked)',     price: 24.99,  category: 'Limited Edition • Marvel',       onSale: true,  img: 'assets/spider-cat-plush.jpg',  stock: 9  },
  { id: 8,  name: 'Itachi Uchiha (Akatsuki)', price: 24.99,  category: 'Limited Edition • Naruto',       onSale: false, img: 'assets/itachi-akatsuki.jpg',    stock: 7  },
  { id: 9,  name: 'Batman Blue Edition',      price: 22.99,  category: 'Limited Edition • DC',           onSale: true,  img: 'assets/spider-cat-plush.jpg',  stock: 11 },
  { id: 10, name: 'Godzilla Gold Variant',    price: 26.99,  category: 'Limited Edition • Toho',         onSale: false, img: 'assets/godzilla-chibi.jpg',     stock: 8  },
  { id: 11, name: 'Akatsuki Itachi (Alt)',    price: 24.99,  category: 'Limited Edition • Naruto',       onSale: true,  img: 'assets/itachi-akatsuki.jpg',    stock: 6  },
  { id: 12, name: 'Kuromi Crystal Seat',      price: 21.99,  category: 'Limited Edition • Sanrio',       onSale: false, img: 'assets/kuromi-bow.jpg',         stock: 10 },
]

const KEY = 'gse-products-v4' // clave nueva para refrescar cache local

export function loadProducts(){
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  localStorage.setItem(KEY, JSON.stringify(products))
  return products
}
export function saveProducts(list){ localStorage.setItem(KEY, JSON.stringify(list)) }
export function createProduct(p){
  const list = loadProducts()
  const id = list.reduce((m,x)=>Math.max(m,x.id),0)+1
  const np = { ...p, id }; list.push(np); saveProducts(list); return np
}
export function updateProduct(p){
  const list = loadProducts()
  const i = list.findIndex(x=>x.id===p.id)
  if(i>=0){ list[i]=p; saveProducts(list); return true }
  return false
}
export function deleteProduct(id){
  const list = loadProducts().filter(x=>x.id!==id)
  saveProducts(list); return true
}

// Próximamente (con precio)
export const comingSoon = [
  { id: 'cs1', name: 'Hello Kitty Racecar',       category: 'Coming Soon • Sanrio', img: 'assets/coming-hello-kitty-racecar.png',   eta: 'Q1 2026', price: 29.99 },
  { id: 'cs2', name: 'Pompompurin Egg',           category: 'Coming Soon • Sanrio', img: 'assets/coming-pompompurin-egg.png',       eta: 'Q1 2026', price: 11.99 },
  { id: 'cs3', name: 'Hello Kitty Bunny',         category: 'Coming Soon • Sanrio', img: 'assets/coming-hellokitty-bunny.png',       eta: 'Q1 2026', price: 9.99 },
  { id: 'cs4', name: 'Cinnamoroll Bunny',         category: 'Coming Soon • Sanrio', img: 'assets/coming-cinnamoroll-bunny.png',      eta: 'Q1 2026', price: 12.49 },
  { id: 'cs5', name: 'Lou & Raymond',             category: 'Coming Soon • Disney', img: 'assets/coming-lou-raymond.png',            eta: 'Q2 2026', price: 19.99 },
  { id: 'cs6', name: 'Pooh Honey Tree (Diorama)', category: 'Coming Soon • Disney', img: 'assets/coming-pooh-honey-tree.png',        eta: 'Q2 2026', price: 24.99 },
  { id: 'cs7', name: 'Sleeping Pooh',             category: 'Coming Soon • Disney', img: 'assets/coming-pooh-sleeping.png',          eta: 'Q2 2026', price: 14.99 },
  { id: 'cs8', name: 'Pooh with Balloon',         category: 'Coming Soon • Disney', img: 'assets/coming-pooh-balloon.png',           eta: 'Q2 2026', price: 7.99 },
]
