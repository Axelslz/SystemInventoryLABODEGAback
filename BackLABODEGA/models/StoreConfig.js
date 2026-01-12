import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const StoreConfig = sequelize.define('StoreConfig', {
    storeName: {
        type: DataTypes.STRING,
        defaultValue: 'LA BODEGA' // Valor por defecto si no ponen nada
    },
    slogan: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.TEXT // TEXT permite más caracteres que STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    footerMessage: {
        type: DataTypes.TEXT // Para el mensaje de despedida largo
    }
}, {
    timestamps: true
});

export default StoreConfig;