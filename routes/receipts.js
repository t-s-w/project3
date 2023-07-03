import express from 'express';
import * as receiptsCtrl from '../controllers/receipts.js';

const router = express.Router();

router.post('/', receiptsCtrl.purchase)
router.get('/byUser',receiptsCtrl.getReceiptsByUser)
router.get('/:id', receiptsCtrl.getReceiptWithEvent)
router.delete('/:id',receiptsCtrl.cancel)


export default router