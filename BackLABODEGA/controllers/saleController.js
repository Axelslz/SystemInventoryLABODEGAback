import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';
import Product from '../models/Product.js';
import sequelize from '../config/db.js';
import Expense from '../models/Expense.js';

export const createSale = async (req, res) => {

    const t = await sequelize.transaction();

    try {
        const { cart, total, paymentMethod, seller, customer } = req.body;

        const newSale = await Sale.create({
            total,
            paymentMethod,
            seller,
            customerName: customer.name,
            customerAddress: customer.address,
            customerPhone: customer.phone
        }, { transaction: t });

        for (const item of cart) {
            await SaleItem.create({
                SaleId: newSale.id, 
                ProductId: item.id, 
                productName: item.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            }, { transaction: t });

            const product = await Product.findByPk(item.id, { transaction: t });
            if (product) {
                await product.decrement('stock', { 
                    by: item.quantity, 
                    transaction: t 
                });
            }
        }

        await t.commit();

        res.status(201).json({ message: 'Venta registrada con éxito', saleId: newSale.id });

    } catch (error) {
        await t.rollback();
        console.error("Error al registrar venta:", error);
        res.status(500).json({ message: 'Error al procesar la venta', error: error.message });
    }
};

export const getSalesHistory = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [SaleItem], 
            order: [['createdAt', 'DESC']] 
        });
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener historial' });
    }
};

export const markSaleAsPaid = async (req, res) => {
    const { id } = req.params; 

    try {
        const sale = await Sale.findByPk(id);

        if (!sale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        sale.paymentMethod = 'EFECTIVO';
        await sale.save(); 

        res.json({ message: 'Deuda liquidada correctamente', sale });

    } catch (error) {
        console.error("Error al cobrar deuda:", error);
        res.status(500).json({ message: 'Error al actualizar la venta' });
    }
};

export const resetSystemHistory = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        // 1. Borrar todas las partidas de venta (detalle)
        await SaleItem.destroy({ where: {}, truncate: true, transaction: t });
        
        // 2. Borrar todas las ventas (cabecera)
        await Sale.destroy({ where: {}, truncate: true, cascade: true, transaction: t });

        // 3. Borrar todos los gastos (opcional, si quieres limpiar gastos también)
        await Expense.destroy({ where: {}, truncate: true, transaction: t });

        // NOTA: No borramos Productos ni Usuarios para no perder el catálogo.

        await t.commit();
        res.json({ message: 'Historial de ventas y gastos eliminado correctamente. Sistema en $0.00' });

    } catch (error) {
        await t.rollback();
        console.error("Error al reiniciar sistema:", error);
        res.status(500).json({ message: 'Error al reiniciar el sistema' });
    }
};