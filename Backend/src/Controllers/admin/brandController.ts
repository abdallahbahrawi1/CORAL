import { Request, Response } from 'express';
import * as brandService from '../../Services/admin/brandService';
import {brandSchema,updateBrandSchema } from '../../Validators/admin/brandSchema';



export const createBrand = async (req: Request, res: Response) => {
  try {
    const brandData = req.body;
    const { error } = brandSchema.validate(brandData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const brand = await brandService.createBrand(brandData);
    res.status(201).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const brandId = parseInt(req.params.brandId, 10);
    const updatedData = req.body;
    const { error } = updateBrandSchema.validate(updatedData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const brand = await brandService.updateBrand(brandId, updatedData);
    res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
