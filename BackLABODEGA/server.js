import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize, { connectDB } from './config/db.js';

// Importar Modelos
import Product from './models/Product.js';
import Sale from './models/Sale.js';
import SaleItem from './models/SaleItem.js';

// Importar Rutas
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js'; // <--- NUEVA RUTA

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- DEFINIR RELACIONES (Asociaciones) ---
// Una Venta tiene muchos Items
Sale.hasMany(SaleItem, { onDelete: 'CASCADE' });
SaleItem.belongsTo(Sale);

// (Opcional) Un Producto puede estar en muchos Items de venta
Product.hasMany(SaleItem);
SaleItem.belongsTo(Product);

// 1. Conectar a BD
connectDB();

// 2. Sincronizar (alter: true agregará las tablas nuevas sin borrar productos)
sequelize.sync({ alter: true })
    .then(() => console.log('✅ Tablas y relaciones sincronizadas.'))
    .catch((error) => console.error('❌ Error al sincronizar:', error));

// 3. Rutas
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes); // <--- ACTIVAR RUTA DE VENTAS

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});