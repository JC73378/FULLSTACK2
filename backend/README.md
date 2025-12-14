# FunkoStore API (Spring Boot)

API que alimenta el frontend React (`src/api/client.js`). Usa Spring Boot 3, H2 en memoria y datos iniciales para productos, coming soon y un usuario demo (`demo@funkostore.com` / `demo123`).

## Requisitos
- Java 17+
- Maven 3.9+ (o wrapper si ya lo tienes instalado)

## Correr la API
```bash
mvn spring-boot:run
```
La API queda en `http://localhost:8080/api`. Ajusta el origen permitido editando `funkostore.cors.allowed-origins` en `application.properties` si tu frontend vive en otra URL.

## Ejecutar pruebas
```bash
mvn test
```
Incluye 3 pruebas unitarias principales:
1. `ProductServiceTest` valida que el listado respete `includeInactive`.
2. `OrderServiceTest` verifica stock y totales al crear ordenes.
3. `AuthServiceTest` prueba registro/login y errores por emails duplicados.

## Endpoints principales
- `GET /api/products` (filtros: `onSale`, `category`, `includeInactive`).
- `POST /api/products`, `PUT /api/products/{id}`, `DELETE /api/products/{id}`.
- `GET /api/coming-soon`.
- `GET /api/orders`, `POST /api/orders`, `PATCH /api/orders/{id}/status?status=SHIPPED`.
- `POST /api/auth/register`, `POST /api/auth/login`.

Cada controlador valida entradas con `jakarta.validation` y responde errores JSON uniformes.
