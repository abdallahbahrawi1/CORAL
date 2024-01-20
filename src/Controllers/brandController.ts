
import { Request, Response } from 'express';
const db = require('../Database/Models/index');


export const getAllBrands = async (_req: Request, res: Response) => {
    try {
      const brands = await db.brands.findAll();
      return res.status(200).json(brands);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
