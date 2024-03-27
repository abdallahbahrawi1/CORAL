
import * as productService from '../Services/productService';
import { Request, Response } from 'express';
import {generateOptions} from './productController'

//get all products that match the input either by product name or brand name AND CAN ALSO TAKE ALL THE FILTERs AND SORT BY AND PAGINATION OPTIONS FOR PRODUCTS
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

//get all products names and brands names that match the input either by product name or brand name
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
  

