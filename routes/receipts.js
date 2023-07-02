import express from 'express';
import * as receiptsCtrl from '../controllers/receipts.js';

const router = express.Router();

router.post('/', receiptsCtrl.purchase)
router.get('/:id', receiptsCtrl.getReceiptWithEvent)

export default router