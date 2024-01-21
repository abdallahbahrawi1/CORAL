import { createOrder, getProductDiscount, processOrderItem} from '../services/orderService';
import { placeOrderSchema, orderIdSchema } from '../validators/ordersSchema';
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

interface Product {
  name: string;
  sub_title: string;
  price: number;
  discount: number;
  quantity: number;
  sub_total: number;
  product_id: string;
}

export const getOrderInfo = async (req, res) => {
  const { error, value } = orderIdSchema.validate(req.params.orderId);
  if(error){
    return res.status(400).json({ error: error.details[0].message});
  }
  
  try {
    const order = await db.orders.findOne({
      where: {
        id: value
      }
    })
    let status = order.status;
    let order_id = order.id;    
    let order_date = order.order_date;


    const orderItems = await db.ordersItems.findAll({
      where: {
        order_id: order_id
      }
    })
    
    let products: Product[] = []
    let total_amount = 0;
    let total_discount = 0;

    for(const item of orderItems){

      let product = await db.products.findOne({
        where:{
          id: item.product_id
        }
      })

      let discount = await getProductDiscount(product.discount_id);
      let isValid = false;
      if(discount){
        const expiryDate = discount.expiry_date;
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedCurrentDate = `${year}-${month}-${day}`;
        isValid = (formattedCurrentDate <= expiryDate)
      }

      let productPrice = product.price;
      let discountPercentage = isValid ? discount.percentage / 100 : 0;
      let discountAmount = (discountPercentage * productPrice);
      total_discount += discountAmount;
      total_amount += productPrice;
      let sub_total = productPrice * item.quantity;
      let productObj = {
        "name": product.name,
        "sub_title": product.sub_title,
        "price": product.price,
        "discount": discountAmount,
        "quantity": item.quantity,
        "sub_total": sub_total,
        "product_id": product.product_id
      }

      products.push(productObj)
    }
    let addressObj = {}

    // const address = await db.addresses.findOne({
    //   where: {
    //     id: order.address_id
    //   }
    // })
    // const user = await db.users.findOne({
    //   where: {
    //     id: address.user_id
    //   }
    // })
    // let addressObj1 = {
    //   "email": user.email,
    //   "mobile": user.mobile,
    //   "address_line1": address.address_line1,
    //   "city": address.city,
    //   "first_name": address.first_name,
    //   "last_name": address.last_name,
    // }
      
    let orderObj = {
      "status": status,
      "order_id": order_id,
      "products": products,
      "order_date": order_date,
      "total_amount": total_amount,
      "total_discount": total_discount,
      "grand_total": total_amount - total_discount,
      "payment_method": order.payment_method,
      "addresses": addressObj
    }
    res.status(200).json(orderObj);
  } catch (error: any) {
  }
};


