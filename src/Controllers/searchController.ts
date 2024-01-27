
import * as productService from '../Services/productService';
import { Request, Response } from 'express';
import {generateOptions} from './productController'


export const getSearchResults = async (req: Request, res: Response)=> {
  try {
    const searchInput = req.query.keyword;
    const options = {
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req), 
    };

    const result = await productService.getSearchResults(options as any,searchInput);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  export const getSuggestions = async (req, res: Response) => {
    try {
        const searchInput = req.query.keyword;
        const { products, brands } = await productService.getSuggestions(searchInput)
          const productNames = products.map(product => product.name);
          const brandNames = brands.map(brand => brand.name);
                    const result = [...productNames, ...brandNames];
          return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  

