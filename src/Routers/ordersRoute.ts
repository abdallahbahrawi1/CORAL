import express, { Router } from 'express';
import { placeOrder, getOrderInfo, getUserOrders, cancelOrder, reorder} from '../Controllers/orderController';


const router: Router = express.Router();

router.post('/', placeOrder);
router.get('/', getUserOrders);
router.get('/info/:orderId', getOrderInfo);
// router.get('/:orderId', getUserOrders);
router.put('/:orderId/cancel', cancelOrder);
router.post('/reorder/:orderId', reorder);

export default router;