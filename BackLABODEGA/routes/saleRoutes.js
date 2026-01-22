import express from 'express';
import { createSale, getSalesHistory, markSaleAsPaid } from '../controllers/saleController.js';

const router = express.Router();

router.post('/', createSale);       
router.get('/', getSalesHistory);
router.put('/:id/pay', markSaleAsPaid);

export default router;