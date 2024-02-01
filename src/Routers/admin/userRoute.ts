import express from 'express';
import {getUsers,updateUserDetails} from '../../Controllers/admin/userController';

const router = express.Router();

router.get('/',getUsers); //This filters users by many options inculding age ,created date , vistors, country,city and a lot more 
router.put('/',updateUserDetails);



export default router;
