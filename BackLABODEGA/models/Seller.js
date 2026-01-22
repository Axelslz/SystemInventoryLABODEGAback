import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Seller = sequelize.define('Seller', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    }
}, {
    timestamps: true 
});

export default Seller;