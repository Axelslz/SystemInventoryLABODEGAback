import express from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct, addStock } from '../controllers/productController.js';

import { protect, adminOnly } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.get('/', protect, getAllProducts);
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.post('/:id/stock', protect, adminOnly, addStock);

export default router;