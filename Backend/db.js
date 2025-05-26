const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Si tienes contraseña, colócala aquí
  database: 'tuempleo'
});

conexion.connect((error) => {
  if (error) {
    console.error('Error al conectar a MySQL:', error);
    return;
  }
  console.log('Conectado a MySQL correctamente');
});

module.exports = conexion;

