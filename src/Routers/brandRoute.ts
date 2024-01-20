
import express from 'express';
import {getAllBrands} from '../Controllers/brandController';
const router = express.Router();

router.get('/', getAllBrands);


export default router
