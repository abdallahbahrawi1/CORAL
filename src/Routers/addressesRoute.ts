import express, { Router } from 'express';
import { addNewAddress, deleteAddress, getAddressDetails, getUserAddresses, updateAddress } from '../Controllers/addressController';

import {checkSessionId} from '../Controllers/userController';

const router: Router = express.Router();

router.post('/', checkSessionId, addNewAddress);
router.get('/:addressId', getAddressDetails);
router.get('/', checkSessionId, getUserAddresses);
router.delete('/:addressId', checkSessionId, deleteAddress);
router.put('/:addressId', checkSessionId, updateAddress);


export default router;