import StoreConfig from '../models/StoreConfig.js';

// 1. OBTENER LA CONFIGURACIÓN ACTUAL
export const getStoreConfig = async (req, res) => {
    try {
        // Buscamos el primer registro que encontremos (solo debería haber uno)
        const config = await StoreConfig.findOne();
        
        if (!config) {
            // Si no hay configuración guardada aún, devolvemos un objeto vacío o nulo
            return res.json(null);
        }
        
        res.json(config);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener datos de la tienda', error: error.message });
    }
};

// 2. GUARDAR O ACTUALIZAR CONFIGURACIÓN
export const saveStoreConfig = async (req, res) => {
    const { storeName, slogan, address, phone, email, footerMessage } = req.body;

    try {
        // Buscamos si ya existe una configuración
        const existingConfig = await StoreConfig.findOne();

        if (existingConfig) {
            // --- CASO ACTUALIZAR ---
            // Si ya existe, actualizamos sus campos
            await existingConfig.update({
                storeName,
                slogan,
                address,
                phone,
                email,
                footerMessage
            });
            return res.json(existingConfig);
        } else {
            // --- CASO CREAR (Primera vez) ---
            const newConfig = await StoreConfig.create({
                storeName,
                slogan,
                address,
                phone,
                email,
                footerMessage
            });
            return res.json(newConfig);
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error al guardar configuración', error: error.message });
    }
};