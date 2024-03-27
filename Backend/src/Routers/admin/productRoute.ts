import express from 'express';
import {createProduct,updateProduct,getTopProductsByCountry,getTopCountriesForProduct} from '../../Controllers/admin/productController';

const router = express.Router();

router.get('/by-country', getTopProductsByCountry);
router.get('/:productId/top-country', getTopCountriesForProduct);
router.post('/', createProduct);
router.put('/:productId', updateProduct);

export default router;
