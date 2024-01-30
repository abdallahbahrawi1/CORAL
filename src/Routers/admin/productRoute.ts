import express from 'express';
import {createProduct,updateProduct,deleteProduct} from '../../Controllers/admin/productController';

const router = express.Router();

router.post('/', createProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);


export default router;
