const express = require('express');

const usuariosRoutes = require('./routes/usuarios.routes');

const app = express();

// Permitir recibir JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API REST de usuarios funcionando correctamente'
    });
});

// Rutas de usuarios
app.use('/usuarios', usuariosRoutes);

module.exports = app;