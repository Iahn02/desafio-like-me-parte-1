const { pool } = require("./connection");

// Devuelve todos los posts guardados en la tabla posts
const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id");
  return rows;
};

// Guarda un nuevo post. Los likes parten en 0.
// Se usan parámetros ($1, $2, $3) para evitar inyección SQL.
const agregarPost = async (titulo, img, descripcion) => {
  const consulta =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *";
  const values = [titulo, img, descripcion];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

module.exports = { obtenerPosts, agregarPost };
