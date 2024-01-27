import { calculateGrandTotal, calculateTotalAmount, calculateTotalDiscount, createOrder, getAddressObject, getOrderById, getOrderItems, getProducts, processOrderItem} from '../Services/orderService';
import { placeOrderSchema, orderIdSchema } from '../Validators/ordersSchema';
import db from '../Database/Models/index';

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

export const getOrderInfo = async (req, res) => {
  const { error, value } = orderIdSchema.validate(req.params.orderId);
  if(error){
    return res.status(400).json({ error: error.details[0].message});
  }
  
  try {
    const order = await getOrderById(value);

    let status = order.status;
    let order_id = order.id;    
    let order_date = order.order_date;

    const orderItems = await getOrderItems(order_id);
    const products = await getProducts(orderItems);
    const addressObj = await getAddressObject(order);    

    let orderObj = {
      "status": status,
      "order_id": order_id,
      "products": products,
      "order_date": order_date,
      "total_amount": calculateTotalAmount(products),
      "total_discount": calculateTotalDiscount(products),
      "grand_total": calculateGrandTotal(products),
      "payment_method": order.payment_method,
      "addresses": addressObj
    }
    res.status(200).json(orderObj);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


