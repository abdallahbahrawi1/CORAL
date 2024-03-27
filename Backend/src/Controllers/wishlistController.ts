import { Request, Response } from 'express';
import * as wishlistService from '../Services/wishlistService';
import { wishlistSchema } from '../Validators/wishlistSchema';



export const DeleteUserWishlist = async (req: Request, res: Response) => {
  try {
    const result = await wishlistService.DeleteUserWishlist(req.session.user_id);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const toggleProductInWishlist = async (req: Request, res: Response)=> {
  try {
    const { error, value } = wishlistSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await wishlistService.toggleProductInWishlist(req.session.user_id, value);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const addProductToWishlist = async (req: Request, res: Response) => {
  try {
    const { error, value } = wishlistSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await wishlistService.addProductToWishlist(req.session.user_id, value);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const removeProductFromWishlist = async (req: Request, res: Response) => {
  try {
    const result = await wishlistService.removeProductFromWishlist(req.session.user_id, parseInt(req.params.product_id));
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const getUserWishlist = async (req: Request, res: Response) => {
  try {
    const result = await wishlistService.getUserWishlist(req.session.user_id);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
