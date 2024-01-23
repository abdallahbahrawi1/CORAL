
import express from 'express';
import {getAllBrands,getProductsByBrand} from '../Controllers/brandController';
const router = express.Router();

router.get('/', getAllBrands);
router.get('/:brandId/products', getProductsByBrand);


export default router
