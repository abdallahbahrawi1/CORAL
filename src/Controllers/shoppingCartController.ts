import { Request, Response } from 'express';
import * as shoppingCartService from '../Services/shoppingCartService';
import { shoppingCartSchema } from '../Validators/shoppingCartSchema';

export const clearUserShoppingCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await shoppingCartService.clearUserShoppingCart(req.session.user_id);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const updateProductQuantityInShoppingCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = shoppingCartSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await shoppingCartService.updateProductQuantityInShoppingCart(req.session.user_id, value);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const addProductToShoppingCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = shoppingCartSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await shoppingCartService.addProductToShoppingCart(req.session.user_id, value);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const removeProductFromShoppingCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await shoppingCartService.removeProductFromShoppingCart(
      req.session.user_id,
      parseInt(req.params.product_id)
    );
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const getUserShoppingCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await shoppingCartService.getUserShoppingCart(req.session.user_id);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
