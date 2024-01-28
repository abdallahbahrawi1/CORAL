import { createOrder, getOrderById, getOrderItems, getOrdersByUserId, getUserShoppingCart, processOrder, processOrderItem, removeAllItemsFromShoppingCart, returnOrderItem} from '../Services/orderService';
import { placeOrderSchema, orderIdSchema, AddOrderLocationAndPaymentSchema } from '../Validators/ordersSchema';
import { addAddress } from "../Services/addressServices";

import { Order } from '../Interfaces/orderInterface'
import db from '../Database/Models/index';


export const placeOrder = async (req, res) => {
  const userID = req.session.user_id;
  const shoppingCart = await getUserShoppingCart(userID);

  const { error, value } = placeOrderSchema.validate(shoppingCart);
  if(error){
    return res.status(400).json({ error: error.details[0].message });
  }

  const { error: orderBodyError, value: orderValues } = AddOrderLocationAndPaymentSchema.validate(req.body);
  if(orderBodyError){
    return res.status(400).json({ error: orderBodyError.details[0].message});
  }
  const transaction1 = await db.sequelize.transaction();
  try {
    const products = value;

    const newAddress = await addAddress(orderValues.order_address, userID, transaction1);

    const newOrder = await createOrder(userID, newAddress.id, orderValues.payment_method, transaction1);

    for (const item of products) {
      await processOrderItem(item, newOrder, transaction1);
    }
    await removeAllItemsFromShoppingCart(userID, transaction1);
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


export const reorder = async (req, res) => {
  const { error: orderIdError, value: orderId } = orderIdSchema.validate(req.params.orderId);
  
  if (orderIdError) {
    return res.status(400).json({ error: orderIdError.details[0].message });
  }

  const transaction = await db.sequelize.transaction();


  try {
    const originalOrder = await getOrderById(orderId);

    const newOrder = await createOrder(originalOrder.user_id, originalOrder.address_id, originalOrder.payment_method, transaction);
    const orderItems = await getOrderItems(orderId);
    // await processOrderItem(item, newOrder, transaction1);

    for (const item of orderItems) {
      await processOrderItem(item, newOrder, transaction);
    }
    await transaction.commit();
    res.status(200).json(newOrder);
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};



