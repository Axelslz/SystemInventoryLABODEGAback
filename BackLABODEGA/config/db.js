import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Ponlo en true si quieres ver SQL en la consola
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL exitosa.');
    } catch (error) {
        console.error('❌ Error de conexión a la BD:', error);
        process.exit(1); // Detener la app si no hay BD
    }
};

export default sequelize;