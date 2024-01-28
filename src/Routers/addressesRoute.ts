import express, { Router } from 'express';
import { addNewAddress, deleteAddress, getAddressDetails, getUserAddresses, updateAddress } from '../Controllers/addressController';
// import {checkSessionKey} from '../Middlewares/checkSession'

const router: Router = express.Router();

router.post('/', addNewAddress);
router.get('/:addressId', getAddressDetails);
router.get('/', getUserAddresses);
router.delete('/:addressId', deleteAddress);
router.put('/:addressId', updateAddress);


export default router;