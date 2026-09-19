require('dotenv').config();

const express = require('express');

const UserRepositoryAdapter =
    require('./infrastructure/userRepositoryAdapter');

const UserService =
    require('./application/userService');

const UserController =
    require('./interfaces/userController');

const app = express();

app.use(express.json());

const userRepository =
    new UserRepositoryAdapter();

const userService =
    new UserService(userRepository);

const userController =
    new UserController(userService);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API REST con Arquitectura Hexagonal'
    });
});

// POST - Registrar usuario
app.post(
    '/usuarios',
    userController.crearUsuario
);

// GET - Obtener usuarios
app.get(
    '/usuarios',
    userController.obtenerUsuarios
);

// PUT - Modificar usuario
app.put(
    '/usuarios/:id',
    userController.modificarUsuario
);

// DELETE - Eliminar usuario
app.delete(
    '/usuarios/:id',
    userController.eliminarUsuario
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});