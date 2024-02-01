import express from 'express';
import {getOrderItemAnalytics,getTotalByBrand,getTotalByCategory,getTotalOrdersInPeriod} from '../../Controllers/admin/orderController';

const router = express.Router();

router.get('/brand', getTotalByBrand);
router.get('/category', getTotalByCategory);
router.get('/total', getTotalOrdersInPeriod);
router.get('/', getOrderItemAnalytics);


export default router;
