import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SaleItem = sequelize.define('SaleItem', {
    productName: { // Guardamos el nombre por si borras el producto del catálogo, el historial no se rompa
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: false
});

export default SaleItem;