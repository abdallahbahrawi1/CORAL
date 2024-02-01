
import express from 'express';
import {createBrand,updateBrand,deleteBrand} from '../../Controllers/admin/brandController';

const router = express.Router();

router.post('/', createBrand);
router.put('/:brandId', updateBrand);
router.delete('/:brandId', deleteBrand);


export default router;
