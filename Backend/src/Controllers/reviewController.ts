import { Request, Response } from 'express';
import db from '../Database/Models/index';
import { ReviewItem } from '../Interfaces/reviewInterface';
import * as reviewService from '../Services/reviewService';
import { reviewSchema } from '../Validators/reviewSchema';

//allows user to post a review for a specfic product
export const postReview = async (req: Request, res: Response) => {
  try {
    const { error, value } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product_id = parseInt(req.params.product_id);

    const existingProduct = await db.products.findOne({ where: { id: product_id } });
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newReview = await reviewService.addProductReview(req.session.user_id, product_id, value as ReviewItem);
    res.status(201).json(newReview);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

//allows user to update a review for a specfic product
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { error, value } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product_id = parseInt(req.params.product_id)

    const existingProduct = await db.products.findOne({ where: { id: product_id } });
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const success = await reviewService.updateProductReview(req.session.user_id, product_id, value as ReviewItem);
    res.status(200).json(success);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

//allows user to delete a review for a specfic product
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const product_id = parseInt(req.params.product_id);

    const existingProduct = await db.products.findOne({ where: { id: product_id } });
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const success = await reviewService.deleteProductReview(req.session.user_id, product_id );
    res.status(200).json(success);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

//allows user to get all his reviews on all products 
export const getAllUserReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getAllUserReviews(req.session.user_id);
    res.status(200).json(reviews);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
