
import express from 'express';
import {getAllBrands,getTopBrands} from '../Controllers/brandController';
const router = express.Router();

router.get('/', getAllBrands);
router.get('/top', getTopBrands);


export default router
