import express from 'express';
import { 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController.js';

const router = express.Router();

// GET: Obtener todos
router.get('/', getAllProducts);

// POST: Crear uno nuevo
router.post('/', createProduct);

// PUT: Actualizar por ID (necesitas pasar el ID en la URL)
router.put('/:id', updateProduct);

// DELETE: Borrar por ID
router.delete('/:id', deleteProduct);

export default router;