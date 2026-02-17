import express from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

import { protect, adminOnly } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.get('/', protect, getAllProducts);
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;