import express from 'express';
import {getAllCategories,getHandpickedCategories,getTopCategories,getMobileCategories} from '../Controllers/categoryController';
const router = express.Router();

router.get('/', getAllCategories);
router.get('/handpicked', getHandpickedCategories);
router.get('/top', getTopCategories);
router.get('/mobile', getMobileCategories);

export default router

