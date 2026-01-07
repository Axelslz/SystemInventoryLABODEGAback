import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';
import Product from '../models/Product.js';
import sequelize from '../config/db.js';

// Crear una nueva venta
export const createSale = async (req, res) => {
    // Iniciamos una transacción (seguridad para la BD)
    const t = await sequelize.transaction();

    try {
        const { cart, total, paymentMethod, seller, customer } = req.body;

        // 1. Crear el registro de la Venta (Cabecera)
        const newSale = await Sale.create({
            total,
            paymentMethod,
            seller,
            customerName: customer.name,
            customerAddress: customer.address,
            customerPhone: customer.phone
        }, { transaction: t });

        // 2. Recorrer el carrito para crear los items y descontar stock
        for (const item of cart) {
            // A) Guardar el item en la tabla SaleItems
            await SaleItem.create({
                SaleId: newSale.id, // Relación con la venta
                ProductId: item.id, // Relación con el producto (opcional, pero útil)
                productName: item.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            }, { transaction: t });

            // B) DESCONTAR STOCK DEL INVENTARIO
            const product = await Product.findByPk(item.id, { transaction: t });
            if (product) {
                // Verificamos si hay stock suficiente (opcional)
                /* if (product.stock < item.quantity) {
                    throw new Error(`No hay suficiente stock de ${product.name}`);
                } */
                
                // Restamos
                await product.decrement('stock', { 
                    by: item.quantity, 
                    transaction: t 
                });
            }
        }

        // Si todo salió bien, guardamos cambios permanentemente
        await t.commit();

        res.status(201).json({ message: 'Venta registrada con éxito', saleId: newSale.id });

    } catch (error) {
        // Si algo falló, deshacemos todo
        await t.rollback();
        console.error("Error al registrar venta:", error);
        res.status(500).json({ message: 'Error al procesar la venta', error: error.message });
    }
};

// Obtener historial de ventas (Para tu componente SalesHistory)
export const getSalesHistory = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [SaleItem], // Traer también los productos de cada venta
            order: [['createdAt', 'DESC']] // Las más recientes primero
        });
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener historial' });
    }
};