const pool = require('./db');

class UserRepositoryAdapter {

    async create(user) {
        const [resultado] = await pool.query(
            `INSERT INTO usuarios
            (nombre, email, password)
            VALUES (?, ?, ?)`,
            [user.nombre, user.email, user.password]
        );

        return {
            id: resultado.insertId,
            nombre: user.nombre,
            email: user.email
        };
    }

    async findAll() {
        const [usuarios] = await pool.query(
            `SELECT id, nombre, email
             FROM usuarios`
        );

        return usuarios;
    }

    async findByEmail(email) {
        const [usuarios] = await pool.query(
            `SELECT *
             FROM usuarios
             WHERE email = ?`,
            [email]
        );

        return usuarios[0];
    }

    async findById(id) {
        const [usuarios] = await pool.query(
            `SELECT id, nombre, email
             FROM usuarios
             WHERE id = ?`,
            [id]
        );

        return usuarios[0];
    }

    async update(id, user) {
        await pool.query(
            `UPDATE usuarios
             SET nombre = ?, email = ?
             WHERE id = ?`,
            [user.nombre, user.email, id]
        );

        return {
            id: Number(id),
            nombre: user.nombre,
            email: user.email
        };
    }

    async delete(id) {
        const [resultado] = await pool.query(
            `DELETE FROM usuarios
             WHERE id = ?`,
            [id]
        );

        return resultado.affectedRows > 0;
    }
}

module.exports = UserRepositoryAdapter;