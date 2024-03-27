import express from 'express';
import {createDiscount,updateDiscount,applyDiscount} from '../../Controllers/admin/discountController';

const router = express.Router();

router.put('/apply/:discountId', applyDiscount);
router.post('/', createDiscount);
router.put('/:discountId', updateDiscount);



export default router;
