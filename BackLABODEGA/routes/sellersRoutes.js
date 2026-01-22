import { Router } from 'express';
import { getSellers, createSeller, deleteSeller } from '../controllers/sellersController.js'; 

const router = Router();

router.get('/sellers', getSellers);
router.post('/sellers', createSeller);
router.delete('/sellers/:id', deleteSeller);

export default router;