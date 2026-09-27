require('dotenv').config();

const express = require('express');
const cors = require('cors');

const UserRepositoryAdapter =
    require('./infrastructure/userRepositoryAdapter');
const UserService =
    require('./application/userService');
const UserController =
    require('./interfaces/userController');

const app = express();

app.use(cors());
app.use(express.json());


// =============================
// MIDDLEWARES
// =============================

// =============================
// ARQUITECTURA HEXAGONAL
// =============================

const userRepository =
    new UserRepositoryAdapter();

const userService =
    new UserService(userRepository);

const userController =
    new UserController(userService);


// =============================
// RUTA PRINCIPAL
// =============================

app.get('/', (req, res) => {

    res.json({
        mensaje:
            'API REST CRUD con Arquitectura Hexagonal'
    });

});


// =============================
// CRUD DE USUARIOS
// =============================

// CREATE
app.post(
    '/usuarios',
    userController.crearUsuario
);


// READ
app.get(
    '/usuarios',
    userController.obtenerUsuarios
);


// UPDATE
app.put(
    '/usuarios/:id',
    userController.actualizarUsuario
);


// DELETE
app.delete(
    '/usuarios/:id',
    userController.eliminarUsuario
);


// =============================
// SERVIDOR
// =============================

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );

});