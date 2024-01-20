import express from 'express';
import {loginUser,createUser,logoutUser,changePassword,checkSessionId,changeUsername,getUserDetails,updateUserDetails,deleteUserAccount} from '../Controllers/userController';

const router = express.Router();
router.post('/signin', loginUser);
router.post('/signup',createUser);
router.get('/signout',checkSessionId,logoutUser);
router.put('/change-password',checkSessionId,changePassword);
router.put('/change-username',checkSessionId,changeUsername);
router.get('/:user_id',checkSessionId,getUserDetails);
router.put('/:user_id',checkSessionId,updateUserDetails);
router.delete('/:user_id',checkSessionId,deleteUserAccount);




export default router;
