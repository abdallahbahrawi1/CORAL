import express from 'express';
 import {getNewArrivals,getProducts,getLimitProducts,getDiscountPlusProducts,getPopularProducts} from '../Controllers/productController';
const router = express.Router();

router.get('/',getProducts);

router.get('/new-arrivals',getNewArrivals);
router.get('/limited-edition',getLimitProducts);
router.get('/discount-15plus',getDiscountPlusProducts);
router.get('/popular',getPopularProducts);

export default router