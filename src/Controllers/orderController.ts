import { createOrder, processOrderItem} from '../services/orderService';
import { placeOrderSchema } from '../validators/ordersSchema';

const db = require('../Database/Models/index.ts');

export const placeOrder = async (req, res) => {
  const { error, value } = placeOrderSchema.validate(req.body);
  if(error){
    return res.status(400).json({ error: error.details[0].message });
  }
  const transaction1 = await db.sequelize.transaction();
  try {
    const userID = req.session.user_id;
    const products = value;

    const newOrder = await createOrder(userID, transaction1);

    for (const item of products) {
      await processOrderItem(item, newOrder, transaction1);
    }
    await transaction1.commit();

    res.status(200).json(newOrder);
    } catch (error: any) {
      await transaction1.rollback();
      if (error.message.includes("Insufficient quantity")) {
        error.status = 409;
        res.status(error.status).json({ error: error.message });
      }else if(error.message.includes("Session not found")){
        error.status = 403;
        res.status(error.status).json({ error: error.message });
      } else {
        error.status = 500;
        res.status(error.status).json({ error: error.message });
      }
    }
};