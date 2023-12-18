const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de MongoDB (asegúrate de tener MongoDB instalado)
mongoose.connect('mongodb://localhost:27017/tienda', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir un modelo simple
const Producto = mongoose.model('Producto', {
  nombre: String,
  precio: Number,
});

app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener productos
app.get('/api/productos', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
