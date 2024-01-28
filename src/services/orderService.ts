import { sequelize } from './../Database/Models/index';
const db = require('../Database/Models/index.ts');
import { Product, Address, Order } from '../Interfaces/orderInterface'
const generateOrderNumber = async () => {
  let orderNumber: string = generateRandomOrderNumber();
  let checkOrderNumber = await db.orders.findOne({
      where:{
          order_number: orderNumber
      }
  });

  while(checkOrderNumber){
      orderNumber = generateRandomOrderNumber()
      checkOrderNumber = await db.orders.findOne({
          where:{
              order_number: orderNumber
          }
      });
  }

  return orderNumber;
}

function generateRandomOrderNumber() {
  const randomNumber = Math.floor(Math.random() * 1000000000);
  const randomString = `#${String(randomNumber).padStart(9, '0')}`;
  return randomString;
}

export const createOrder = async (userID: number,transaction = null) => {
    try {
        let orderNumber: string =  await generateOrderNumber();
        return await db.orders.create({
            order_number: orderNumber,
            status: 'processing',
            payment_method: 'Credit Card',
            order_date: db.sequelize.literal('CURRENT_TIMESTAMP'),
            order_update: false,
            user_id: userID, 
            address_id: null, 
        }, { transaction });
    } catch (error: any) {
        throw new Error(`Failed to create an order: ${error.message}`);
    }
};

export const processOrderItem = async (item, newOrder, transaction = null) => {
    const product = await checkProductExistence(item.product_id, transaction);
    const quantity = item.quantity;

    validateQuantity(quantity, product.stock_quantity, item.product_id);
  
    const newStockQuantity = product.stock_quantity - quantity;
    await updateProductStock(product, newStockQuantity, transaction);

    await createOrderItem(product, newOrder, quantity, transaction);
};

const checkProductExistence = async (productId: number, transaction = null) => {
    const product = await db.products.findOne({
      where: {
        id: productId,
      }
    }, { 
        transaction,
        lock: true  // a race condition might happen to this code 
    });
  
    if (!product) {
      throw { code: 403, message: `Product with ID ${productId} not found.`};
    }
  
    return product;
}; 

const validateQuantity = (requestedQuantity: number, availableQuantity: number, productId: number) => {
    if (requestedQuantity > availableQuantity) {
      throw { code: 409, message: `Insufficient quantity for product with ID ${productId}.` };
    }
};
  
const updateProductStock = async (product: any, newQuantity: number, transaction = null) => {
    try {
        product.stock_quantity = newQuantity;
        await product.save({ transaction });
    } catch (error: any) {
        throw new Error(`failed to update product stock with ID ${product.id}.:${error.message}`);
    }
};


const getProductDiscount = async (productId: number, transaction = null) => {
    return await db.discounts.findOne({
      where: {
        id: productId,
      }
    }, { transaction });
};

export const calculatePriceAfterDiscount = (product, discount) => {
    const productPrice = product.price || 0;
    const discountPercentage = discount?.is_valid ? discount.percentage / 100 : 0;
    return productPrice - (discountPercentage * productPrice);
};

const createOrderItem = async (product, newOrder, quantity: number, transaction = null) => {
    try {
        await db.ordersItems.create({
          price: product.price,
          quantity,
          order_id: newOrder.id,
          product_id: product.id,
        }, { transaction });
    } catch (error:any) {
        throw new Error(`failed to create and order item for product with ID ${product.id}.: ${error.message}`);
    }
};

export const updateOrderTotalAmount = async (newOrder: any, totalPrice: number, transaction = null) => {
    try {        
        newOrder.total_amount = totalPrice;
        await newOrder.save({ transaction });
    } catch (error) {
        throw new Error(`failed to update order total amount for order with ID ${newOrder.id}.`);
    }
};

export const getOrderById = async (orderId: number) => {

  const order = await db.orders.findOne({
      where: {
      id: orderId,
      },
  });

  if (!order) {
    throw new Error(`order with ID ${orderId} not found.`);
  }
  return order;
};

export const getOrdersByUserId = async (userID: number) => {
  console.log(db)
  const order = await db.orders.findAll({
      where: {
      user_id: userID,
      },
  });

  if (!order) {
    throw new Error(`Cant find orders for user ID ${userID}.`);
  }
  return order;
};

export const getOrderItems = async (orderId: number) => {
  try {
    return await db.ordersItems.findAll({
      where: {
        order_id: orderId,
      },
    });
  } catch (error: any) {
    throw new Error(`failed to get the orderItems for order with ID ${orderId}.: ${error.message}`);
  }
};

const getProducts = async (orderItems) => {
  try {    
    const products: Product[] = [];
  
    for (const item of orderItems) {
      const product = await getProductById(item.product_id);
      const discount = await getProductDiscount(product.discount_id);
      const discountAmount = calculateDiscountAmount(product, discount);  
      products.push({
        name: product.name,
        sub_title: product.sub_title,
        price: product.price,
        discount: discountAmount,
        quantity: item.quantity,
        sub_total: product.price * item.quantity,
        product_id: product.product_id,
      });
    }
  
    return products;
  } catch (error: any) {
    throw new Error(`failed to get the products.: ${error.message}`);
  }
};

const getProductById = async (productId: number) => {
  try {
    return await db.products.findOne({
      where: {
        id: productId,
      },
    });
  } catch (error: any) {
    throw new Error(`failed to get product with ID ${productId}.: ${error.message}`);
  }
};

const calculateDiscountAmount = (product, discount) => {
  if (!discount) {
    return 0;
  }

  const isValid = checkDiscountValidity(discount.expiry_date);
  const discountPercentage = isValid ? discount.percentage / 100 : 0;

  return discountPercentage * product.price;
};

const checkDiscountValidity = (expiryDate) => {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  return formattedCurrentDate <= expiryDate;
};

const getAddressObject = async (order) => {
  const address = await db.addresses.findOne({
    where: {
      id: order.address_id,
    },
  });

  if (address) {
    const user = await db.users.findOne({
      where: {
        id: address.user_id,
      },
    });

    return {
      email: user.email,
      mobile: user.mobile,
      address_line1: address.address_line1,
      city: address.city,
      first_name: address.first_name,
      last_name: address.last_name,
    };
  }

  return {};
};

const calculateTotalAmount = (products) => {
  return products.reduce((total, product) => total + product.price * product.quantity, 0);
};

const calculateTotalDiscount = (products) => {
  return products.reduce((total, product) => total + product.discount, 0);
};

const calculateGrandTotal = (products) => {
  const totalAmount = calculateTotalAmount(products);
  const totalDiscount = calculateTotalDiscount(products);
  return totalAmount - totalDiscount;
};

export const processOrder =async (order) => {
  try {
    let status = order.status;
    let order_id = order.id;
    let order_date = order.order_date;
    const orderItems = await getOrderItems(order_id);
    const products = await getProducts(orderItems);
    const addressObj = await getAddressObject(order);

    let orderObj: Order = {
      "status": status,
      "order_id": order_id,
      "products": products,
      "order_date": order_date,
      "total_amount": calculateTotalAmount(products),
      "total_discount": calculateTotalDiscount(products),
      "grand_total": calculateGrandTotal(products),
      "payment_method": order.payment_method,
      "addresses": addressObj
    };

    return orderObj;
  } catch (error) {
    throw error; 
  }
}

export const addOrderAddress = async (orderId: number, orderValues) => {
  try {
    const { email, mobile, location, last_name, first_name } = orderValues.order_address;
      return await db.addresses.create({
        first_name: first_name,
        last_name: last_name,
        phone: mobile,
        country: "",
        city: "",
        street: "",
        address_line1: "",
        address_line2: "",
        postal_code: "",
        is_default: false,
        user_id: orderId
      });
  } catch (error: any) {
      throw new Error(`Failed to add a location for the order: ${error.message}`);
  }
};

export const returnOrderItem = async (item) => {
  try {
    const product = await db.products.findOne({
      where: {
        id: item.product_id,
      }
    });
    const quantity = product.stock_quantity;
    const itemQuantity = item.quantity   

    const newStockQuantity = quantity + itemQuantity;
    await updateProductStock(product, newStockQuantity);
  } catch (error: any) {
      throw new Error(`Failed to return order with ID ${item.order_id}: ${error.message}`);
  }
};
