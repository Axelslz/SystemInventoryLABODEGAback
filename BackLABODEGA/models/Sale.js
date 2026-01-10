import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Sale = sequelize.define('Sale', {
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    seller: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        defaultValue: 'PÚBLICO EN GENERAL'
    },
    customerAddress: {
        type: DataTypes.STRING
    },
    customerPhone: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true 
});

export default Sale;