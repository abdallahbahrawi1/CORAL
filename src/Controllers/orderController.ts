import { addOrderAddress, createOrder, getOrderById, getOrderItems, getOrdersByUserId, processOrder, processOrderItem, returnOrderItem} from '../Services/orderService';
import { placeOrderSchema, orderIdSchema, AddOrderLocationAndPaymentSchema } from '../Validators/ordersSchema';
import { Product, Address, Order } from '../Interfaces/orderInterface'

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
      const statusCode = error.code || 500;
      res.status(statusCode).json({ error: error.message });
    }
};

export const getOrderInfo = async (req, res) => {
  const { error, value } = orderIdSchema.validate(req.params.orderId);
  if(error){
    return res.status(400).json({ error: error.details[0].message});
  }
  try {
    const order = await getOrderById(value);
    let orderObj = await processOrder(order);
    res.status(200).json(orderObj);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userID = req.session.user_id;
    const orders = await getOrdersByUserId(userID);
    console.log("asdsadsa")

    const productsDetails: Order[] = [];
    for(const item of orders){
      let orderObj: Order = await processOrder(item);
      productsDetails.push(orderObj)
    }
    res.status(200).json(productsDetails);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const AddOrderLocationAndPayment = async (req, res) => {
  const { error: orderIdError, value: orderId } = orderIdSchema.validate(req.params.orderId);
  if(orderIdError){
    return res.status(400).json({ error: orderIdError.details[0].message});
  }
  const { error: orderBodyError, value: orderValues } = AddOrderLocationAndPaymentSchema.validate(req.body);
  if(orderBodyError){
    return res.status(400).json({ error: orderBodyError.details[0].message});
  }

  try {
    const order = await getOrderById(orderId);
    const orderAddress = await addOrderAddress(orderId, orderValues);
    await order.update({
      address_id: orderAddress.id,
      payment_method: orderValues.payment_method
    })
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  const { error: orderIdError, value: orderId } = orderIdSchema.validate(req.params.orderId);
  if(orderIdError){
    return res.status(400).json({ error: orderIdError.details[0].message});
  }

  try {
    const order = await getOrderById(orderId);
    const orderItems = await getOrderItems(orderId)

    for (const item of orderItems) {
      await returnOrderItem(item);
    }
    
    await order.update({
      status: "cancelled"
    })
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



