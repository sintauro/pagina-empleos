const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const conexion = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint de registro
app.post('/registro', (req, res) => {
  const { nombre, email, password } = req.body;

  const verificarSql = 'SELECT * FROM usuarios WHERE email = ?';
  conexion.query(verificarSql, [email], (error, resultados) => {
    if (error) {
      console.error('Error al verificar email:', error);
      return res.status(500).json({ mensaje: 'Error del servidor al verificar el correo' });
    }

    if (resultados.length > 0) {
      return res.status(400).json({ mensaje: 'Este correo ya está registrado' });
    }

    const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
    conexion.query(sql, [nombre, email, password], (error, resultadoInsert) => {
      if (error) {
        console.error('Error al insertar usuario:', error);
        return res.status(500).json({ mensaje: 'No se pudo registrar el usuario' });
      }

      console.log('Usuario guardado en MySQL:', nombre);
      return res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    });
  });
});

// Endpoint de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  conexion.query(sql, [email, password], (error, resultados) => {
    if (error) {
      console.error('Error al intentar login:', error);
      return res.status(500).json({ mensaje: 'Error del servidor al iniciar sesión' });
    }

    if (resultados.length > 0) {
      console.log('Usuario autenticado:', email);
      return res.status(200).json({ acceso: true, mensaje: 'Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ acceso: false, mensaje: 'Correo o contraseña incorrectos' });
    }
  });
});

// Activar servidor
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

