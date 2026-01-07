import Product from '../models/Product.js';

// 1. Obtener todos
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

// 2. Crear producto
export const createProduct = async (req, res) => {
    try {
        // Recibimos todos los datos, incluido cost
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardar producto' });
    }
};

// 3. Actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualiza con los datos que vengan en el body
        await product.update(req.body);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

// 4. Eliminar producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await product.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};