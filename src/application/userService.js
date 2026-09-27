const bcrypt = require('bcrypt');
const User = require('../domain/user');

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async crearUsuario(nombre, email, password) {

        if (!nombre || !email || !password) {
            throw new Error('Todos los campos son obligatorios');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error('El correo electrónico no es válido');
        }

        if (password.length < 6) {
            throw new Error(
                'La contraseña debe tener mínimo 6 caracteres'
            );
        }

        const usuarioExistente =
            await this.userRepository.findByEmail(email);

        if (usuarioExistente) {
            throw new Error(
                'El correo electrónico ya está registrado'
            );
        }

        const passwordHash =
            await bcrypt.hash(password, 10);

        const usuario = new User(
            null,
            nombre,
            email,
            passwordHash
        );

        return await this.userRepository.create(usuario);
    }


    async obtenerUsuarios() {
        return await this.userRepository.findAll();
    }


    async actualizarUsuario(id, nombre, email) {

        if (!nombre || !email) {
            throw new Error(
                'Nombre y correo son obligatorios'
            );
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error(
                'El correo electrónico no es válido'
            );
        }

        const usuario =
            await this.userRepository.findById(id);

        if (!usuario) {
            throw new Error(
                'Usuario no encontrado'
            );
        }

        const usuarioConEmail =
            await this.userRepository.findByEmail(email);

        if (
            usuarioConEmail &&
            usuarioConEmail.id !== Number(id)
        ) {
            throw new Error(
                'El correo electrónico ya está registrado'
            );
        }

        return await this.userRepository.update(
            id,
            {
                nombre,
                email
            }
        );
    }


    async eliminarUsuario(id) {

        const usuario =
            await this.userRepository.findById(id);

        if (!usuario) {
            throw new Error(
                'Usuario no encontrado'
            );
        }

        await this.userRepository.delete(id);

        return {
            mensaje: 'Usuario eliminado correctamente'
        };
    }
}

module.exports = UserService;