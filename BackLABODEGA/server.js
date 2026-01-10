import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize, { connectDB } from './config/db.js';
import Product from './models/Product.js';
import Sale from './models/Sale.js';
import SaleItem from './models/SaleItem.js';

import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

Sale.hasMany(SaleItem, { onDelete: 'CASCADE' });
SaleItem.belongsTo(Sale);

Product.hasMany(SaleItem);
SaleItem.belongsTo(Product);

connectDB();

sequelize.sync({ alter: true })
    .then(() => console.log('✅ Tablas y relaciones sincronizadas.'))
    .catch((error) => console.error('❌ Error al sincronizar:', error));

app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes); 
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});