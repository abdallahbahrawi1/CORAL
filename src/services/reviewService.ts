import db from '../Database/Models/index';
import { ReviewItem, ErrorResponse } from '../Interfaces/reviewInterface';

export const addProductReview = async (userId: number, productId: number, reviewDetails: ReviewItem): Promise<ReviewItem | ErrorResponse> => {
  try {
    const { comment, rating } = reviewDetails;

    const existingReview = await db.reviews.findOne({ where: { user_id: userId, product_id: productId } });
    if (existingReview) {
      throw { code: 409, message: 'User already reviewed this product' };
    }

    const newReview = await db.reviews.create({ user_id: userId, product_id: productId, rating, comment });
    return newReview;
  } catch (error:any) {
    if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }
  }
};

export const updateProductReview = async (userId: number, productId: number, reviewDetails: ReviewItem): Promise<boolean | ErrorResponse> => {
  try {
    const { comment, rating } = reviewDetails;

    const existingReview = await db.reviews.findOne({ where: { user_id: userId, product_id: productId } });
    if (!existingReview) {
      throw { code: 404, message: 'User review for this product not found' };
    }

    await db.reviews.update({ rating, comment }, { where: { user_id: userId, product_id: productId } });
    return true;
  } catch (error:any) {
    if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }
  }
};

export const deleteProductReview = async (user_id: number, product_id: number): Promise<boolean | ErrorResponse> => {
  try {
    const existingReview = await db.reviews.findOne({ where: { user_id, product_id } });
    if (!existingReview) {
      throw { code: 404, message: 'User review for this product not found' };
    }

    await db.reviews.destroy({ where: { user_id, product_id } });
    return true;
  } catch (error:any) {
    if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }
  }
};

export const getAllUserReviews = async (userId: number): Promise<ReviewItem[] | ErrorResponse> => {
  try {
    const reviews = await db.reviews.findAll({ where: { user_id: userId } });
    return reviews;
  } catch (error:any) {
    if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }
  }
};
