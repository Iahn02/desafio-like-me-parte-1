const express = require("express");
const cors = require("cors");
const { obtenerPosts, agregarPost } = require("./consultas");

const app = express();
const PORT = 3000;

// Habilita CORS para que el cliente React (otro puerto) pueda consultar al servidor
app.use(cors());
// Permite leer el payload JSON de las consultas POST
app.use(express.json());

// GET /posts : devuelve todos los posts de la base de datos
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudieron obtener los posts" });
  }
});

// POST /posts : recibe un post y lo guarda en la base de datos
app.post("/posts", async (req, res) => {
  // El cliente envía la imagen en el campo "url"; en la tabla se guarda como "img"
  const { titulo, url, img, descripcion } = req.body ?? {};
  const imagen = url ?? img;

  if (!titulo || !imagen || !descripcion) {
    return res.status(400).json({ mensaje: "Faltan datos: titulo, url y descripcion son obligatorios" });
  }

  // Largos máximos definidos en la tabla posts
  if (titulo.length > 25 || imagen.length > 1000 || descripcion.length > 255) {
    return res.status(400).json({
      mensaje: "Datos muy largos: titulo hasta 25, url hasta 1000 y descripcion hasta 255 caracteres",
    });
  }

  try {
    const post = await agregarPost(titulo, imagen, descripcion);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudo guardar el post" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor encendido en http://localhost:${PORT}`);
});
