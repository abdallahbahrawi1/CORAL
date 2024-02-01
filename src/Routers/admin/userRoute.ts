import express from 'express';
import {getUsers} from '../../Controllers/admin/userController';

const router = express.Router();

router.get('/',getUsers);



export default router;
