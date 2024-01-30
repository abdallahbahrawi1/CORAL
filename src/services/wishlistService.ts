import db from '../Database/Models/index';

import {Wishlist, WishlistItem, ErrorResponse } from '../Interfaces/wishlistInterface';

export const getUserWishlist = async (userId: number): Promise<Wishlist[] | ErrorResponse> => {
  try {
    const wishlists = await db.wishlists.findAll({ where: { user_id: userId },
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
    return wishlists;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const removeProductFromWishlist = async (userId: number, productId: number): Promise<boolean | ErrorResponse> => {
  try {
    const existingWishlist = await db.wishlists.findOne({ where: { user_id: userId, product_id: productId } });
    if (!existingWishlist) {
      throw { code: 404, message: 'User does not have this product in their wishlist' };
    }

    await db.wishlists.destroy({ where: { user_id: userId, product_id: productId } });
    return true;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const addProductToWishlist = async (userId: number, productDetails: WishlistItem): Promise<WishlistItem | ErrorResponse> => {
  try {
    const { product_id, comment } = productDetails;

    const existingProduct = await db.products.findOne({ where: { id: product_id } });
    if (!existingProduct) {
      throw { code: 404, message: 'Product not found' };
    }

    const existingWishlist = await db.wishlists.findOne({ where: { user_id: userId, product_id } });
    if (existingWishlist) {
      throw { code: 409, message: 'User already has this product in their wishlist' };
    }

    const wishlist = await db.wishlists.create({ user_id: userId, product_id, comment });
    return wishlist;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const toggleProductInWishlist = async (userId: number, productDetails: WishlistItem): Promise<boolean | ErrorResponse> => {
  try {
    const { product_id, comment } = productDetails;

    const existingProduct = await db.products.findOne({ where: { id: product_id } });
    if (!existingProduct) {
      throw { code: 404, message: 'Product not found' };
    }

    const existingWishlist = await db.wishlists.findOne({ where: { user_id: userId, product_id } });
    if (existingWishlist) {
      await db.wishlists.destroy({ where: { user_id: userId, product_id } });
      return false;
    }

    await db.wishlists.create({ user_id: userId, product_id, comment });
    return true;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const DeleteUserWishlist = async (userId: number): Promise<boolean | ErrorResponse> => {
  try {
    const existingWishlist = await db.wishlists.findOne({ where: { user_id: userId } });
    if (!existingWishlist) {
      throw { code: 404, message: 'User does not have a wishlist' };
    }

    await db.wishlists.destroy({ where: { user_id: userId } });
    return true;
  } catch (error:any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};
