import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Sale = sequelize.define('Sale', {
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING, // 'EFECTIVO' o 'TRANSFERENCIA'
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
    // Guardamos estos datos por si el cliente cambia de dirección en el futuro, el ticket histórico no cambie
    customerAddress: {
        type: DataTypes.STRING
    },
    customerPhone: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true // Guarda fecha y hora de venta automáticamente
});

export default Sale;