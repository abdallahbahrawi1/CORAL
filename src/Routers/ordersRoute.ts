import express, { Router } from 'express';
import { placeOrder, getOrderInfo, getUserOrders, AddOrderLocationAndPayment, cancelOrder} from '../Controllers/orderController';
import { checkSessionId } from '../Controllers/userController';

const router: Router = express.Router();

router.post('/', checkSessionId, placeOrder);
router.get('/', checkSessionId, getUserOrders);
router.get('/info/:orderId', getOrderInfo);
router.get('/:orderId', getUserOrders);
router.post('/:orderId', AddOrderLocationAndPayment);
router.put('/:orderId/cancel', cancelOrder);

export default router;