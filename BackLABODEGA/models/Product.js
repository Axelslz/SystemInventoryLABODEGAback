import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    cost: { 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    priceRetail: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    priceWholesale: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    wholesaleQty: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    timestamps: true 
});

export default Product;