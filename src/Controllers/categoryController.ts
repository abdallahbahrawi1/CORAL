import { Request, Response } from 'express';
const db = require('../Database/Models/index');


export const getAllCategories = async (req: Request, res: Response) => {
    try {
      const categories = await db.categories.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error2' });
    }
  };

  export const   getHandpickedCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await db.categories.findAll({
        where: {
          name: {
            [db.Sequelize.Op.in]: ['Personal Care', 'Handbags', 'Wrist Watches', 'Sunglasses']
          }
        }
      });
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error2' });
    }
  };



  export const   getTopCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await db.categories.findAll({
        where: {
          name: {
            [db.Sequelize.Op.in]: ['Skincare', 'Jewelry', 'Handbags','Watches', 'Eye Wear']
          }
        }
      });
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error2' });
    }
  };
  
  export const   getMobileCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await db.categories.findAll({
        where: {
          name: {
            [db.Sequelize.Op.in]: ['Skincare', 'Fargrance', 'Handbags', 'Eye Wear', 'Apparels']
          }
        }
      });
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error2' });
    }
  };
  
