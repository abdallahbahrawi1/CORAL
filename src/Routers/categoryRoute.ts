import express from 'express';
import {getAllCategories,getHandpickedCategories,getTopCategories,getMobileCategories,getProductsByCategory} from '../Controllers/categoryController';
const router = express.Router();

router.get('/', getAllCategories);
router.get('/handpicked', getHandpickedCategories);
router.get('/top', getTopCategories);
router.get('/mobile', getMobileCategories);
router.get('/:categoryId/products', getProductsByCategory);

export default router

