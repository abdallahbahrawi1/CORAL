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

//This return Top 3 best selling product per country
export const getTopProductsByCountry = async (req: Request, res: Response) => {
  try {
    const country=req.query.country
    const result = await productService.getTopProductsByCountry(country);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//this returns top countries where that product is being ordered more
export const getTopCountriesForProduct = async (req: Request, res: Response) => {
  try {
    const id=req.params.productId
    const status=req.query.status || 'completed'
    const result = await productService.getTopCountriesForProduct(id,status);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};