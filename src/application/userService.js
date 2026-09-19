const bcrypt = require('bcrypt');
const User = require('../domain/user');

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }


    // CREAR USUARIO
    async crearUsuario(nombre, email, password) {

        if (!nombre || !email || !password) {
            throw new Error(
                'Todos los campos son obligatorios'
            );
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error(
                'El correo electrónico no es válido'
            );
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


    // OBTENER USUARIOS
    async obtenerUsuarios() {
        return await this.userRepository.findAll();
    }


    // MODIFICAR USUARIO
    async modificarUsuario(id, nombre, email, password) {

        // Buscar usuario
        const usuarioActual =
            await this.userRepository.findById(id);

        if (!usuarioActual) {
            throw new Error(
                'Usuario no encontrado'
            );
        }

        if (!nombre || !email) {
            throw new Error(
                'Nombre y email son obligatorios'
            );
        }

        // Validar email
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error(
                'El correo electrónico no es válido'
            );
        }

        // Verificar correo duplicado
        const usuarioConEmail =
            await this.userRepository.findByEmail(email);

        if (
            usuarioConEmail &&
            usuarioConEmail.id != id
        ) {
            throw new Error(
                'El correo electrónico ya está registrado'
            );
        }

        let passwordFinal =
            usuarioActual.password;

        // Solo modificar contraseña si se envía una nueva
        if (password) {

            if (password.length < 6) {
                throw new Error(
                    'La contraseña debe tener mínimo 6 caracteres'
                );
            }

            passwordFinal =
                await bcrypt.hash(password, 10);
        }

        const usuario = new User(
            id,
            nombre,
            email,
            passwordFinal
        );

        const resultado =
            await this.userRepository.update(
                id,
                usuario
            );

        if (resultado === 0) {
            throw new Error(
                'No se pudo modificar el usuario'
            );
        }

        return {
            id,
            nombre,
            email
        };
    }


    // ELIMINAR USUARIO
    async eliminarUsuario(id) {

        const usuario =
            await this.userRepository.findById(id);

        if (!usuario) {
            throw new Error(
                'Usuario no encontrado'
            );
        }

        const resultado =
            await this.userRepository.delete(id);

        if (resultado === 0) {
            throw new Error(
                'No se pudo eliminar el usuario'
            );
        }

        return true;
    }
}

module.exports = UserService;