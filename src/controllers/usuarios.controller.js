const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Registrar un usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validar campos obligatorios
        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        // Validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                mensaje: 'El correo electrónico no es válido'
            });
        }

        // Validar contraseña
        if (password.length < 6) {
            return res.status(400).json({
                mensaje: 'La contraseña debe tener mínimo 6 caracteres'
            });
        }

        // Comprobar si el correo ya existe
        const [existente] = await pool.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (existente.length > 0) {
            return res.status(409).json({
                mensaje: 'El correo electrónico ya está registrado'
            });
        }

        // Encriptar contraseña con bcrypt
        const passwordHash = await bcrypt.hash(password, 10);

        // Insertar usuario
        const [resultado] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, passwordHash]
        );

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                id: resultado.insertId,
                nombre: nombre,
                email: email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};


// Consultar usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const [usuarios] = await pool.query(
            'SELECT id, nombre, email FROM usuarios'
        );

        res.status(200).json(usuarios);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};


module.exports = {
    crearUsuario,
    obtenerUsuarios
};