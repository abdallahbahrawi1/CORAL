import db from '../Database/Models/index';
import { ShoppingCartItem,ShoppingCart,ErrorResponse } from '../Interfaces/shoppingCartInterface';


function calculateDiscountedPrice(products) {
  let totalPriceBeforeDiscount = 0;
  let totalDiscount = 0;

  for (const product of products) {
    const originalPrice = product.Product.price;
    const discountPercentage = product.Product.Discount.percentage;
    const quantity = product.quantity;
    totalPriceBeforeDiscount += originalPrice * quantity;
    const discountAmount = (originalPrice * discountPercentage) / 100;
    totalDiscount += discountAmount * quantity;
    const priceAfterDiscount = originalPrice - discountAmount;
    product.Product.discountedPrice = priceAfterDiscount;
    product.discount = discountAmount * quantity;
    product.sub_total = priceAfterDiscount * quantity;
  }
  const totalDiscountedPrice = totalPriceBeforeDiscount - totalDiscount;
  const formattedProducts = products.map((product) => ({
    id: product.id,
    image_url: product.Product.ProductImages[0].image_url,
    name: product.Product.name,
    sub_title: product.Product.sub_title,
    price: product.Product.price,
    quantity: product.quantity,
    discount: product.discount,
    sub_total: product.sub_total,
  }));

  return {
    products: formattedProducts,
    totalPriceBeforeDiscount,
    totalDiscount,
    totalDiscountedPrice
  };
}

export const getUserShoppingCart = async (userId: number) => {
  try {
    const shoppingCartItems = await db.shoppingCarts.findAll({ where: { user_id: userId },
      include: [
        {
          model: db.products,
          attributes: ['name', 'price', 'sub_title'],
          include: [
            {
              model: db.discounts,
              attributes: ['percentage'],
            },
            {
              model: db.productsImages,
              attributes: ['image_url'],
            },
          ],
        },
      ], });
      const result = calculateDiscountedPrice(shoppingCartItems);

    return result;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const removeProductFromShoppingCart = async (
  userId: number,
  productId: number
): Promise<boolean | ErrorResponse> => {
  try {
    const existingCartItem = await db.shoppingCarts.findOne({ where: { user_id: userId, product_id: productId } });
    if (!existingCartItem) {
      throw { code: 404, message: 'User does not have this product in their shopping cart' };
    }

    await db.shoppingCarts.destroy({ where: { user_id: userId, product_id: productId } });
    return true;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const addProductToShoppingCart = async (
  userId: number,
  productDetails: ShoppingCartItem
): Promise<ShoppingCartItem | ErrorResponse> => {
  try {
    const { product_id, quantity } = productDetails;

    const existingProduct = await db.products.findOne({ where: { id: product_id } });
    if (!existingProduct) {
      throw { code: 404, message: 'Product not found' };
    }

    const existingCartItem = await db.shoppingCarts.findOne({ where: { user_id: userId, product_id } });
    if (existingCartItem) {
      const newQuantity=quantity+existingCartItem.quantity
      return await db.shoppingCarts.update({quantity:newQuantity},{ where: { user_id: userId, product_id } });
    }

    const shoppingCartItem = await db.shoppingCarts.create({ user_id: userId, product_id, quantity });
    return shoppingCartItem;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const updateProductQuantityInShoppingCart = async (
  userId: number,
  productDetails: ShoppingCartItem
): Promise<boolean | ErrorResponse> => {
  try {
    const { product_id, quantity } = productDetails;

    const existingProduct = await db.products.findOne({ where: { id: product_id } });
    if (!existingProduct) {
      throw { code: 404, message: 'Product not found' };
    }

    const existingCartItem = await db.shoppingCarts.findOne({ where: { user_id: userId, product_id } });
    if (!existingCartItem) {
      throw { code: 404, message: 'User does not have this product in their shopping cart' };
    }

    await db.shoppingCarts.update({ quantity }, { where: { user_id: userId, product_id } });
    return true;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const clearUserShoppingCart = async (userId: number): Promise<boolean | ErrorResponse> => {
  try {
    const existingShoppingCartItems = await db.shoppingCarts.findOne({ where: { user_id: userId } });
    if (!existingShoppingCartItems) {
      throw { code: 404, message: 'User does not have items in their shopping cart' };
    }

    await db.shoppingCarts.destroy({ where: { user_id: userId } });
    return true;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};
