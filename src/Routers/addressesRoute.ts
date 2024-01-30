import express, { Router } from 'express';
import { addNewAddress, deleteAddress, getAddressDetails, getDefaultAddress, getUserAddresses, setAddressDefault, updateAddress } from '../Controllers/addressController';

const router: Router = express.Router();

router.post('/', addNewAddress);
router.get('/default', getDefaultAddress);
router.get('/', getUserAddresses);
router.get('/:addressId', getAddressDetails);
router.delete('/:addressId', deleteAddress);
router.put('/:addressId', updateAddress);
router.put('/:addressId/set-default', setAddressDefault);

export default router;