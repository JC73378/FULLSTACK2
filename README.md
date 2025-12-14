# FunkoStore React

Frontend React (Vite) que consume el backend Spring Boot ubicado en `backend/`. Incluye vistas publicas, carrito, checkout, coming soon, autenticacion basica y panel admin.

## Requisitos
- Node 18+

## Ejecutar
```bash
npm install
npm run dev
```
Variables utiles (crear `.env` si es necesario):
```
VITE_API_URL=http://localhost:8080/api
```

## Funciones principales
- `/productos`, `/categorias`, `/ofertas`, `/coming-soon` leen datos desde el backend mediante `src/api/client.js`.
- `/carrito` y `/checkout` usan `CartContext`; el checkout envia la orden con `POST /api/orders`.
- `/login` y `/register` consumen `/api/auth/*` via `AuthContext`.
- `/admin` realiza CRUD con `/api/products`.

## Notas
- Bootstrap ya esta importado en `src/main.jsx`.
- Las suscripciones de Coming Soon se guardan en `localStorage` (solo para avisos).
- Ver `backend/README.md` para levantar la API y ejecutar pruebas (`mvn test`).
