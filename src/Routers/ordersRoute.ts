import express, { Router } from 'express';
import { placeOrder } from '../Controllers/orderController';
import {checkSessionId} from '../Controllers/userController';

const router: Router = express.Router();

//Endpoint to place an order to a user 
router.post('/', checkSessionId, placeOrder);

export default router;