import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Seller = sequelize.define('Seller', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Para evitar tener dos vendedores con el mismo nombre
    }
}, {
    timestamps: true // Esto agrega createdAt y updatedAt automáticamente
});

export default Seller;