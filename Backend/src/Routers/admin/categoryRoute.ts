import express from 'express';
import {createCategory,updateCategory} from '../../Controllers/admin/categoryController';

const router = express.Router();

router.post('/', createCategory);
router.put('/:categoryId', updateCategory);


export default router;
