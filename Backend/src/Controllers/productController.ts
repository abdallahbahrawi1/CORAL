
import { Request, Response } from 'express';
import * as productService from '../Services/productService';
import {ProductQueryOptions} from '../Interfaces/productInterface'

//options that can be passed in the query to filter or sort by or for pagination settings. can chose all,none, or mulitple
export const generateOptions = (req: Request) => {
  return {
    sortBy: req.query.sortBy || 'ratings',
    page: parseInt(req.query.page as string, 10) || 1,
    pageSize: parseInt(req.query.pageSize as string, 10) || 9,
    brandId : req.query.brandId as string | undefined,
    categoryId : req.query.categoryId as string | undefined,
  };
};

//return all products with given filters and sorting options 
export const getProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//return all products with given filters and sorting options and created in the last 3 months 
export const getNewArrivals = async (req: Request, res: Response) => {
  try {
    const options = {
      where: {
        createdAt: {
          [productService.Sequelize.Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 3)),
        },
      },
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getNewArrivals(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//return all products with given filters and sorting options and stock_qunatity is 20 or less
export const getLimitProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      where: {
        stock_quantity: {
          [productService.Sequelize.Op.lte]: 20,
        },
      },
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getLimitProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//return all products with given filters and sorting options and discounted 15% or more
export const getDiscountPlusProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req)
    };

    const result = await productService.getDiscountPlusProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//return all products with given filters and sorting options and avg review rating above 4.5
export const getPopularProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      group: ['id'],
      having: productService.Sequelize.where(productService.Sequelize.fn('AVG', productService.Sequelize.col('Reviews.rating')), '>', 4.5),
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getPopularProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//return all products with given filters and sorting options and avg review rating above 4.5 and price 100 or less
export const handPickedProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      where: {
        price: {
          [productService.Sequelize.Op.lte]: 100,
        },
      },
      group: ['id'],
      having: productService.Sequelize.where(productService.Sequelize.fn('AVG', productService.Sequelize.col('Reviews.rating')), '>', 4.5),
      ...generateOptions(req), // Merge common 
    };

    const result = await productService.handPickedProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTrendyProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      where: {
        createdAt: {
          [productService.Sequelize.Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 3)),
        },
      },
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getTrendyProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//return all comprehensive details about a specfic product with all its images , reviews and related products 
export const getProductDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.getProductDetails(req.params.product_id);
    res.status(200).json(product);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};


