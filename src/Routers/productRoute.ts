import express from 'express';
 import {getNewArrivals} from '../Controllers/productController';
const router = express.Router();

router.get('/', );

router.get('/new-arrivals',getNewArrivals);

export default router