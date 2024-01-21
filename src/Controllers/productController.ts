import { Request, Response } from 'express';
const db = require('../Database/Models/index');


export const getNewArrivals = async (req: Request, res: Response) => {
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
        const newArrivals = await db.products.findAll({
          where: {
            createdAt: {
              [db.Sequelize.Op.gte]: threeMonthsAgo.toISOString(),
            },
          },
          include: [
            {
              model: db.productsImages,
              attributes: ['image_url'],
              limit: 1, 
            },
          ],
          
        //   raw: true, // Flatten the result to get a clean JSON response
        });
    
        return res.status(200).json(newArrivals);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    };







 