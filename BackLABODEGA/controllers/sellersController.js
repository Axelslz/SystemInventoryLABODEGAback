import Seller from '../models/Seller.js';

export const getSellers = async (req, res) => {
    try {
        const sellers = await Seller.findAll({
            order: [['name', 'ASC']] 
        });
        res.json(sellers);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener vendedores', error: error.message });
    }
};

export const createSeller = async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'El nombre es requerido' });

    try {
        const newSeller = await Seller.create({ name });
        res.json(newSeller);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear vendedor', error: error.message });
    }
};

export const deleteSeller = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Seller.destroy({
            where: { id }
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Vendedor no encontrado' });
        }

        return res.sendStatus(204); 
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar vendedor', error: error.message });
    }
};