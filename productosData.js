const productos = [ 
  { 
    id: 1, 
    nombre: "Funko Pop Darth Vader", 
    precio: 15990, 
    categoria: "Funko",
    descripcion: "¡Siente el poder del lado oscuro! Este Funko Coleccionable de Darth Vader, directamente desde Star Wars: Episodio IV, es la pieza que tu colección necesita para infundir respeto. Con su casco icónico y su imponente presencia, es un recordatorio de que la fuerza es poderosa.", 
    imagen: "https://i.pinimg.com/736x/b6/02/2f/b6022fe446f016d69f78d9d7b0d15ac6.jpg" 
  },
  { 
    id: 2, 
    nombre: "Poster Marvel Avengers", 
    precio: 8990, 
    categoria: "Poster",
    descripcion: "¡Un tributo a los héroes más grandes de la Tierra! Este póster de Avengers: Endgame captura el clímax de una era heroica. Es la pieza perfecta para cualquier fan que quiera revivir la épica batalla que unió a los Vengadores contra Thanos. Cuelga esta obra de arte y honra el legado de los héroes.", 
    imagen: "https://i.pinimg.com/736x/cc/f9/6a/ccf96acf55509bdc961b63252644625a.jpg" 
  },
  { 
    id: 3, 
    nombre: "Figura Batman 30cm", 
    precio: 24990, 
    categoria: "Figura", 
    descripcion: "Prepárate para proteger la noche con esta impresionante figura de Batman de 30cm. Con detalles esculpidos que capturan la esencia del Caballero Oscuro, esta pieza es un poderoso tributo a uno de los superhéroes más icónicos de todos los tiempos. Una adición esencial para cualquier fan del universo DC.",
    imagen: "https://i.pinimg.com/1200x/97/44/31/974431814ed05bf8d2e7b9c04236210b.jpg" 
  },
  { 
    id: 4, 
    nombre: "Funko Pop Harry Potter", 
    precio: 16990, 
    categoria: "Funko", 
    descripcion: "¡Expelliarmus a la rutina! Trae la magia del Mundo Mágico a tu hogar con este encantador Funko Pop de Harry Potter. Con su distintivo uniforme de Hogwarts, esta figura captura perfectamente al “niño que vivió”. Es el amuleto perfecto para recordar que la verdadera magia está en la amistad y el coraje.",
    imagen: "https://i.pinimg.com/736x/bd/e5/de/bde5de444b3995dc9d09e0ddd9842774.jpg" 
  },
  { 
    id: 5, 
    nombre: "Poster Star Wars Clásico", 
    precio: 10990, 
    categoria: "Poster", 
    descripcion: "Viaja a una galaxia muy, muy lejana. Este póster clásico de Star Wars es una obra de arte nostálgica que evoca los primeros combates entre la Alianza Rebelde y el Imperio Galáctico. Una pieza imprescindible para cualquier fan que quiera revivir la magia de la saga original.",
    imagen: "https://i.pinimg.com/736x/e8/0f/bc/e80fbcd629d490271952793f85fc7f54.jpg" 
  },
  { 
    id: 6, 
    nombre: "Figura Iron Man Edición Especial", 
    precio: 34990, 
    categoria: "Figura", 
    descripcion: "¡Un genio, millonario, playboy, filántropo en tu colección! Esta figura de Iron Man en edición especial es una pieza de ingeniería heroica. Con acabados detallados y una pose dinámica, representa el espíritu de innovación de Tony Stark. Es la pieza central perfecta para rendir homenaje al héroe que lo dio todo.",
    imagen: "https://i.pinimg.com/1200x/f7/a2/fd/f7a2fd36fb46f0f68882ebd7da21ad35.jpg" 
  },
  { 
    id: 7, 
    nombre: "Funko Pop Spiderman", 
    precio: 14990, 
    categoria: "Funko", 
    descripcion: "¡Tu amigo y vecino Spiderman ha llegado! Este Funko Pop de Spiderman captura toda la energía y el encanto del trepamuros. Con su traje icónico y su pose lista para la acción, esta figura es el recordatorio perfecto de que un gran poder conlleva una gran responsabilidad. Ideal para añadir un toque de heroísmo arácnido a tu colección.",
    imagen: "https://i.pinimg.com/736x/08/8d/4f/088d4f6ad02ea92cb5749301ab42517c.jpg" 
  },
  { 
    id: 8, 
    nombre: "Poster Dragon Ball Z", 
    precio: 9990, 
    categoria: "Poster", 
    descripcion: "¡Prepárate para el Super Saiyan! Este póster de Dragon Ball Z desata toda la energía y la intensidad de una de las series de anime más legendarias. Con los guerreros Z listos para la batalla, este diseño vibrante es el combustible visual perfecto para cualquier fan. Siéntete como un guerrero Z en cada rincón.",
    imagen: "https://i.pinimg.com/1200x/5b/8d/e2/5b8de21fd62ad558f04d9ef5713c5537.jpg" 
  },
  { 
    id: 9, 
    nombre: "Mascara Iron Man Mk 5", 
    precio: 157990, 
    categoria: "Mascara", 
    descripcion: "¿Sueñas con ser Tony Stark? Hazlo realidad con esta asombrosa máscara de Iron Man Mk 5. Con un diseño fiel a la película y detalles que te harán sentir como si estuvieras en el Salón de la Armadura, es el accesorio definitivo para los fans de Marvel. Una pieza de coleccionista que grita '¡Soy Iron Man!'.",
    imagen: "https://i.pinimg.com/736x/b3/50/89/b35089a75dcb3fd9e84aad3121aac111.jpg" 
  },
  { 
    id: 10, 
    nombre: "Funko Pop Super Mario", 
    precio: 9990, 
    categoria: "Funko", 
    descripcion: "¡Mamma mía! Revive tus aventuras en el Reino Champiñón con este adorable Funko Pop de Super Mario. Con su icónico overol y gorra roja, esta figura captura la esencia del fontanero más famoso de los videojuegos. Es un tesoro para gamers y coleccionistas que quieran rendir homenaje a una de las franquicias más queridas de la historia.",
    imagen: "https://i.pinimg.com/1200x/3b/92/4e/3b924e8d87d76710215f49a5f69d1b63.jpg" 
  }
];