import express from 'express';
import {getAllCategories} from '../Controllers/categoryController';
const router = express.Router();

router.get('/', getAllCategories);


export default router
