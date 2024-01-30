import { Request, Response } from 'express';
import * as productService from '../../Services/admin/productService';
import {productSchema,updatePoductSchema } from '../../Validators/admin/productSchema';



export const createProduct = async (req: Request, res: Response) => {
  try {
    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const productData = req.body;
    const product = await productService.createProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    const updatedData = req.body;

    // Validate updated data
    const { error } = updatePoductSchema.validate(updatedData);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product = await productService.updateProduct(productId, updatedData);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    await productService.deleteProduct(productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};