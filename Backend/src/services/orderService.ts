import { Order, Product } from '../Interfaces/orderInterface';
import db from '../Database/Models/index';

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

export const createOrder = async (userID: number, addressID: number, payment_method: string,  transaction = null) => {
    try {
        let orderNumber: string =  await generateOrderNumber();
        return await db.orders.create({
            order_number: orderNumber,
            status: 'processing',
            payment_method,
            order_date: db.sequelize.literal('CURRENT_TIMESTAMP'),
            order_update: false,
            user_id: userID, 
            address_id: addressID, 
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

export const getOrderById = async (orderId: number, userID: number) => {
  try{
    const order = await db.orders.findOne({
      where: {
      id: orderId,
      user_id: userID,
      },
  });

  if (!order) {
    throw new Error(`order with ID ${orderId} not found.`);
  }
  return order;
  }
  catch (error: any) {
    throw new Error(`failed to get order with ID ${orderId}.: ${error.message}`)
};}

export const getOrdersByUserId = async (userID: number) => {
  try{
    const order = await db.orders.findAll({
      where: {
      user_id: userID,
      },
  });

  if (!order) {
    throw new Error(`Cant find orders for user ID ${userID}.`);
  }
  return order;
}catch (error: any) {
  throw new Error(`failed to get order`)
};}
  


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
      const discountAmount = calculateDiscountAmount(product, discount) * item.quantity;  
      const productImageUrl = await getProductImageById(item.product_id);
      products.push({
        id: product.id,
        image_url: productImageUrl || "",
        name: product.name,
        sub_title: product.sub_title,
        price: product.price,
        quantity: item.quantity,
        discount: discountAmount,
        sub_total: (product.price * item.quantity) - discountAmount,
        product_id: product.product_id,
      });
    }
  
    return products;
  } catch (error: any) {
    throw new Error(`failed to get the products.: ${error.message}`);
  }
};

const getProductImageById = async (productId: number) => {
  try {
    const productImage = await db.productsImages.findOne({
      where: {
        product_id: productId,
      },
    });
    if (productImage) {
      return productImage.image_url
    }else{
      return ""
    }
  } catch (error) {
    throw new Error(`Error fetching the product image:, ${error.message}`);
  }
}



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
  return new Date() <= expiryDate;
};
//todo
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
      id: address.id,
      address: address.country,
      city: address.city,
      street:address.street,
      mobile: address.phone,
      address_line1: address.address_line1,
      address_line2: address.address_line2,
      postal_code: address.postal_code,
      is_default: address.is_default,
      user_id: address.user_id,
      email: user.email,
      full_name: address.full_name,
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
    let orderID = order.id;
    let orderDate = order.order_date;
    let orderNumber = order.order_number
    const orderItems = await getOrderItems(orderID);
    const products = await getProducts(orderItems);
    const addressObj = await getAddressObject(order);
    let orderObj: Order = {
      "status": status,
      "order_number": orderNumber,
      "order_id": orderID,
      "products": products,
      "order_date": orderDate,
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

export const returnOrderItem = async (item, transaction) => {
  try {
    const product = await db.products.findOne({
      where: {
        id: item.product_id,
      }
    }, {transaction});

    const quantity = product.stock_quantity;
    const itemQuantity = item.quantity;

    const newStockQuantity = quantity + itemQuantity;

    await updateProductStock(product, newStockQuantity, transaction);
  } catch (error: any) {
    throw new Error(`Failed to return order with ID ${item.order_id}: ${error.message}`);
  }
};

export const getUserShoppingCart = async (userId: number)  => {
  try {
    const shoppingCartItems = await db.shoppingCarts.findAll({
      attributes: ['quantity', 'product_id'], 
      where: { user_id: userId },
    });
    const formattedResult = shoppingCartItems.map(item => ({
      quantity: item.quantity,
      product_id: item.product_id,
    }));

    return formattedResult;
  } catch (error: any) {
    throw { code: 500, message: `cant get user shopping cart with ID ${userId}` };
  }
};

export const removeAllItemsFromShoppingCart = async (userId: number, transaction = null) => {
  try {
    await db.shoppingCarts.destroy({
      where: {
        user_id: userId,
      },
    }, { transaction }  );
  } catch (error: any) {
    throw { code: 500, message: `can't clear user ID ${userId} shopping cart`};
  }
};