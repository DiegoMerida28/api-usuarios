require('dotenv').config();

const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        const connection = await pool.getConnection();

        console.log('✅ Conexión exitosa con MySQL');

        connection.release();

        app.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error al conectar con MySQL:');
        console.error(error.message);
    }
};

iniciarServidor();