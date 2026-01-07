import express from 'express';
import { createSale, getSalesHistory } from '../controllers/saleController.js';

const router = express.Router();

// POST: http://localhost:5000/api/sales (Registrar venta)
router.post('/', createSale);

// GET: http://localhost:5000/api/sales (Ver historial)
router.get('/', getSalesHistory);

export default router;