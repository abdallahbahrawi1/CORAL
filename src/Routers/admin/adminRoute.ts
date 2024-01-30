import express from 'express';
import {loginAdmin,createAdmin,logoutAdmin,changePassword,changeUsername,updateAdminDetails,deleteAdminAccount,} from '../../Controllers/admin/adminController';

const router = express.Router();
router.post('/signin', loginAdmin);
router.post('/signup',createAdmin);
router.get('/signout',logoutAdmin);
router.put('/change-password',changePassword);
router.put('/change-username',changeUsername);
router.put('/:user_id',updateAdminDetails);
router.delete('/:user_id',deleteAdminAccount);


export default router;
