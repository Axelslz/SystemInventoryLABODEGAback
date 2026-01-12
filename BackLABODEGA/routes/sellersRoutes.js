// src/routes/sellersRoutes.js
import { Router } from 'express';
// Fíjate que aquí coincida mayúsculas y minúsculas con el archivo real
import { getSellers, createSeller, deleteSeller } from '../controllers/sellersController.js'; 

const router = Router();

router.get('/sellers', getSellers);
router.post('/sellers', createSeller);
router.delete('/sellers/:id', deleteSeller);

export default router;