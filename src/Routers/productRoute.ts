import express from 'express';
import {getNewArrivals,getProducts,getLimitProducts,getDiscountPlusProducts,getPopularProducts,getProductDetails,handPickedProducts,getTrendyProducts} from '../Controllers/productController';
const router = express.Router();

router.get('/',getProducts);
router.get('/new-arrivals',getNewArrivals);
router.get('/limited-edition',getLimitProducts);
router.get('/discount-15plus',getDiscountPlusProducts);
router.get('/popular',getPopularProducts);
router.get('/handpicked',handPickedProducts)
router.get('/info/:product_id',getProductDetails)
router.get('/trendy',getTrendyProducts)


export default router