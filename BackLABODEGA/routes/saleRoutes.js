import express from 'express';
import { createSale, getSalesHistory } from '../controllers/saleController.js';

const router = express.Router();

router.post('/', createSale);       
router.get('/', getSalesHistory);

export default router;