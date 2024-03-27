
import express from 'express';
import {createBrand,updateBrand} from '../../Controllers/admin/brandController';

const router = express.Router();

router.post('/', createBrand);
router.put('/:brandId', updateBrand);


export default router;
