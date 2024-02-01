import express from 'express';

import adminRoute from './admin/adminRoute';
import userRoute from './admin/userRoute';
import productRoute from './admin/productRoute';
import brandRoute from './admin/brandRoute';
import categoryRoute from './admin/categoryRoute';
import discountRoute from './admin/discountRoute';
import orderRoute from './admin/orderRoute';


const router = express.Router();


router.use('/users', userRoute);
router.use('/brands', brandRoute);
router.use('/category', categoryRoute);
router.use('/products', productRoute);
router.use('/discounts', discountRoute);
router.use('/orders', orderRoute);

router.use('/', adminRoute);

export default router;