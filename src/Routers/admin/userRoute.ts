import express from 'express';
import {getUsers} from '../../Controllers/admin/userController';

const router = express.Router();
// router.post('/signin', getUsers);
// router.post('/signup',createAdmin);
router.get('/',getUsers);



export default router;
