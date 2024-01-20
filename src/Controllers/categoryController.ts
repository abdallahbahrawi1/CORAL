import { Request, Response } from 'express';
const db = require('../Database/Models/index');


export const getAllCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await db.categories.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error2' });
    }
  };
  