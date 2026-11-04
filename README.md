# Desafío - Like Me (Parte I)

Servidor con Express que guarda y entrega los posts de la red social "Like Me" en una base de datos PostgreSQL, usando el paquete `pg`. Incluye el cliente React entregado en el material de apoyo.

## Estructura

- `backend/`: servidor Express.
  - `index.js`: rutas `GET /posts` y `POST /posts`, con CORS habilitado.
  - `consultas.js`: funciones que consultan la base de datos (`obtenerPosts`, `agregarPost`).
  - `connection.js`: conexión a PostgreSQL con `Pool` de `pg`.
  - `schema.sql`: crea la base `likeme` y la tabla `posts`.
- `frontend/`: cliente React + Vite (material de apoyo, sin cambios).

## Cómo ejecutarlo

Requiere Node.js y PostgreSQL.

1. Crear la base de datos y la tabla:

   ```bash
   psql -U postgres -f backend/schema.sql
   ```

2. Levantar el servidor (puerto 3000):

   ```bash
   cd backend
   npm install
   npm start
   ```

   Por defecto se conecta como usuario `postgres` sin contraseña a la base `likeme` en `localhost:5432`. Si tu PostgreSQL usa otros datos, pásalos como variables de entorno:

   ```bash
   PGUSER=postgres PGPASSWORD=tu_clave npm start
   ```

3. En otra terminal, levantar el cliente:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Abre la URL que muestra Vite (normalmente http://localhost:5173).

## Rutas

| Método | Ruta | Qué hace |
| --- | --- | --- |
| GET | `/posts` | Devuelve todos los posts de la tabla `posts`. |
| POST | `/posts` | Recibe `{ titulo, url, descripcion }` y guarda el post con `likes` en 0. |

El cliente envía la imagen en el campo `url`, y el servidor la guarda en la columna `img`. Si faltan datos o superan el largo de la tabla (título 25, url 1000, descripción 255), responde `400`.
