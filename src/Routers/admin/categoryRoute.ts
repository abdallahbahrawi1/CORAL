import express from 'express';
import {createCategory,updateCategory,deleteCategory} from '../../Controllers/admin/categoryController';

const router = express.Router();

router.post('/', createCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);


export default router;
