import { Request, Response } from 'express';
import * as discountService from '../../Services/admin/discountService';
import {discountSchema,updateDiscountSchema } from '../../Validators/admin/discountSchema';

  
  export const createDiscount = async (req: Request, res: Response) => {
    try {
      const { error, value } = discountSchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const discount = await discountService.createDiscount(value);
      res.status(201).json(discount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const updateDiscount = async (req: Request, res: Response) => {
    try {
      const discountId = parseInt(req.params.discountId, 10);
  
      const { error, value } = updateDiscountSchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const discount = await discountService.updateDiscount(discountId, value);
      res.status(200).json(discount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


// This can apply a discount to a specfic product or brand or category
export const applyDiscount = async (req: Request, res: Response) => {
  try {
    const discountId = parseInt(req.params.discountId, 10);
    const productId = req.query.productId ? parseInt(req.query.productId as string, 10) : undefined;
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string, 10) : undefined;
    const brandId = req.query.brandId ? parseInt(req.query.brandId as string, 10) : undefined;

    await discountService.applyDiscount(discountId, productId, categoryId, brandId);
    res.status(200).json({ message: 'Discount applied successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};