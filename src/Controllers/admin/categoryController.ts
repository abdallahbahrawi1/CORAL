import { Request, Response } from 'express';
import * as categoryService from '../../Services/admin/categoryService';
import {categorySchema,updateCategorySchema } from '../../Validators/admin/categorySchema';


export const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;

    // Validate using Joi
    const { error } = categorySchema.validate(categoryData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const category = await categoryService.createCategory(categoryData);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.categoryId, 10);
    const updatedData = req.body;

    // Validate using Joi
    const { error } = updateCategorySchema.validate(updatedData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const category = await categoryService.updateCategory(categoryId, updatedData);
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.categoryId, 10);
    await categoryService.deleteCategory(categoryId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};