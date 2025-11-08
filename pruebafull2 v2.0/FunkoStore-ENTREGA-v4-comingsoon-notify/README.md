# GeekStore React

Proyecto React listo según pauta: vistas, navegación, carrito, checkout con validación, admin con CRUD en memoria y persistencia en localStorage, y Bootstrap integrado.

## Requisitos
- Node 18+

## Ejecutar
```bash
npm install
npm run dev
```

## Rutas principales
- `/` Home
- `/productos` listado con tarjetas
- `/categorias` categorías desde los productos
- `/ofertas` solo onSale
- `/carrito` tabla + total + limpiar
- `/checkout` formulario validado y redirección a OK/Error
- `/login` y `/register`
- `/admin` CRUD productos

## Datos
- `src/data/store.js` contiene productos y funciones CRUD con persistencia en `localStorage`.
- Imágenes encontradas fusionadas en `src/assets/`: sin imágenes detectadas en los ZIP o nombres no detectados.

## Bootstrap
Ya importado en `src/main.jsx`. Aplica clases utilitarias para estilizar.

## Siguiente
- Ajustar contenido y estilos con Bootstrap según rúbrica del profe.
- Si piden pruebas unitarias: agregar Karma+Jasmine y specs en `src/**/*.spec.jsx`.
