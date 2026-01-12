import { Router } from 'express';
import { getStoreConfig, saveStoreConfig } from '../controllers/storeController.js';

const router = Router();

// Obtener datos (GET)
router.get('/store-config', getStoreConfig);

// Guardar/Actualizar datos (Usamos PUT o POST, ambos sirven, aquí uso POST para generalizar)
router.post('/store-config', saveStoreConfig);

export default router;