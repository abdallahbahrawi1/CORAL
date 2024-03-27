import { Request, Response } from 'express';
import * as shoppingCartService from '../Services/shoppingCartService';
import { shoppingCartSchema } from '../Validators/shoppingCartSchema';

//allows user to clear his shopping cart
export const clearUserShoppingCart = async (req: Request, res: Response) => {
  try {
    const result = await shoppingCartService.clearUserShoppingCart(req.session.user_id);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

//allows user to update a quantity of a product in his shopping cart
export const updateProductQuantityInShoppingCart = async (req: Request, res: Response)=> {
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

//allows user to add a product to his shopping cart
export const addProductToShoppingCart = async (req: Request, res: Response) => {
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

//allows user to remove a product from his shopping cart
export const removeProductFromShoppingCart = async (req: Request, res: Response) => {
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

//allows user to get his shopping cart
export const getUserShoppingCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await shoppingCartService.getUserShoppingCart(req.session.user_id);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
