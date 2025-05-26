const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const conexion = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando con MySQL');
});

app.post('/registro', (req, res) => {
  const { nombre, email, password } = req.body;

  const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
  conexion.query(sql, [nombre, email, password], (error, resultados) => {
    if (error) {
      console.error('Error al insertar usuario:', error);
      res.status(500).json({ error: 'No se pudo registrar el usuario' });
    } else {
      console.log('Usuario guardado en MySQL:', nombre);
      res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
