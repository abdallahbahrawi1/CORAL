import express from 'express';
import {loginUser,createUser,logoutUser,changePassword,changeUsername,getUserDetails,updateUserDetails,deleteUserAccount,uploadProfileImage} from '../Controllers/userController';
import {checkSessionKey} from '../Middlewares/checkSession'
import upload from '../Middlewares/upload';

const router = express.Router();
router.post('/signin', loginUser);
router.post('/signup',createUser);
router.get('/signout',checkSessionKey,logoutUser);
router.put('/change-password',checkSessionKey,changePassword);
router.put('/change-username',checkSessionKey,changeUsername);
router.get('/:user_id',checkSessionKey,getUserDetails);
router.put('/:user_id',checkSessionKey,updateUserDetails);
router.delete('/:user_id',checkSessionKey,deleteUserAccount);
router.post('/profile-img',checkSessionKey,upload.single('profileImage'),uploadProfileImage)


export default router;
