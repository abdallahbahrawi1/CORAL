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
  
  export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
      const sortBy = req.query.sortBy || 'ratings'; // Default to 'popular' if sortBy is not provided

      // Define a mapping of valid sorting options
      const validSortOptions: Record<string, any> = {
        'price-high': [['price', 'DESC']],
        'price-low': [['price', 'ASC']],
        'ratings': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
        'latest': [['createdAt', 'DESC']],
        'popular': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']], // Adjust as needed
      };
  
      // Check if the user's input is a valid sorting option
      const sortOrder = validSortOptions[sortBy] || validSortOptions['ratings'];
  
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 9;
      const result = await db.products.findAll({
        // subQuery: false,
        attributes: [
          'id',
          'name',
          'sub_title',
          'price',
          'createdAt',
          [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
          [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
        ],
        include: [
          {
            model: db.reviews,
            attributes: [],
          },
          {
            model: db.discounts,
            attributes: ['percentage'],
          },
          {
            model: db.productsImages,
            attributes: ['image_url'],
            limit: 1, 
          },
          {
            model: db.categories,
            attributes: ['id'],
            where: {
              id:req.params.categoryId, // Filter where quantity is 20 or less
            },
          },
        ],
        group: ['id'],
        order: sortOrder,
        // limit: pageSize,
        // offset: (page - 1) * pageSize,
      });
        // return res.status(200).json(result)
      return res.status(200).json({
        totalItems: result.length,
        totalPages: Math.ceil(result.length / pageSize),
        currentPage: page,
        pageSize: pageSize,
        data: result.slice((page - 1) * pageSize,((page - 1) * pageSize)+pageSize),
      });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    };
