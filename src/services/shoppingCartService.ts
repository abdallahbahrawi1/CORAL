import db from '../Database/Models/index';
import { ShoppingCartItem, ErrorResponse } from '../Interfaces/shoppingCartInterface';

export const getUserShoppingCart = async (userId: number): Promise<ShoppingCartItem[] | ErrorResponse> => {
  try {
    const shoppingCartItems = await db.shoppingCarts.findAll({ where: { user_id: userId } });
    return shoppingCartItems;
  } catch (error) {
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
  } catch (error) {
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
      throw { code: 409, message: 'User already has this product in their shopping cart' };
    }

    const shoppingCartItem = await db.shoppingCarts.create({ user_id: userId, product_id, quantity });
    return shoppingCartItem;
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};
