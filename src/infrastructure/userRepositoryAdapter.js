const pool = require('./db');

class UserRepositoryAdapter {

    // Crear usuario
    async create(user) {
        const [resultado] = await pool.query(
            `INSERT INTO usuarios
            (nombre, email, password)
            VALUES (?, ?, ?)`,
            [
                user.nombre,
                user.email,
                user.password
            ]
        );

        return {
            id: resultado.insertId,
            nombre: user.nombre,
            email: user.email
        };
    }


    // Obtener todos los usuarios
    async findAll() {
        const [usuarios] = await pool.query(
            `SELECT id, nombre, email
             FROM usuarios`
        );

        return usuarios;
    }


    // Buscar usuario por correo
    async findByEmail(email) {
        const [usuarios] = await pool.query(
            `SELECT *
             FROM usuarios
             WHERE email = ?`,
            [email]
        );

        return usuarios[0];
    }


    // Buscar usuario por ID
    async findById(id) {
        const [usuarios] = await pool.query(
            `SELECT id, nombre, email, password
             FROM usuarios
             WHERE id = ?`,
            [id]
        );

        return usuarios[0];
    }


    // Modificar usuario
    async update(id, user) {
        const [resultado] = await pool.query(
            `UPDATE usuarios
             SET nombre = ?,
                 email = ?,
                 password = ?
             WHERE id = ?`,
            [
                user.nombre,
                user.email,
                user.password,
                id
            ]
        );

        return resultado.affectedRows;
    }


    // Eliminar usuario
    async delete(id) {
        const [resultado] = await pool.query(
            `DELETE FROM usuarios
             WHERE id = ?`,
            [id]
        );

        return resultado.affectedRows;
    }
}

module.exports = UserRepositoryAdapter;