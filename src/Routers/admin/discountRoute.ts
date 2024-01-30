import express from 'express';
import {createDiscount,updateDiscount,deleteDiscount,applyDiscount} from '../../Controllers/admin/discountController';

const router = express.Router();

router.put('/apply/:discountId', applyDiscount);
router.post('/', createDiscount);
router.put('/:discountId', updateDiscount);
router.delete('/:discountId', deleteDiscount);



export default router;
