const express = require('express');

const router = express.Router();

const {
    crearUsuario,
    obtenerUsuarios
} = require('../controllers/usuarios.controller');

// POST /usuarios
router.post('/', crearUsuario);

// GET /usuarios
router.get('/', obtenerUsuarios);

module.exports = router;