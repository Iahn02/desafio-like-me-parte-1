const { Pool } = require("pg");

// Datos de conexión a PostgreSQL.
// Se pueden cambiar con variables de entorno sin tocar el código
// (por ejemplo: PGUSER=postgres PGPASSWORD=1234 npm start).
const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "",
  database: process.env.PGDATABASE || "likeme",
  allowExitOnIdle: true,
});

module.exports = { pool };
