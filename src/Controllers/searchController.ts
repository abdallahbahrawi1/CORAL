// getSearchResults,getSuggestions

import {  Request,Response ,NextFunction} from 'express';
const db = require('../Database/Models/index');
import Joi from 'joi'

 interface User {
    id:number;
    username: string;
    email: string;
    password: string;
  }
  
  interface session {
    id?:number;
    session: string;
    user_id:number
  }
   interface err<T> extends Response {}



 

//   export const getSuggestions = async (req, res: Response) => {
//     try {
     
//       const userInput = req.query.keyword; // Replace this with the actual user input

//       const products = await db.products.findAll({
//         attributes: ['name'],
//         where: {
//           name: {
//             [db.Sequelize.Op.like]: `\\b${userInput}%`
//           }
//         }
//       });
      
//       const brands = await db.brands.findAll({
//         attributes: ['name'],
//         where: {
//           name: {
//             [db.Sequelize.Op.like]: `\\b${userInput}%`
//           }
//         }
//       });
//       const productNames = products.map(product => product.name);
//         const brandNames = brands.map(brand => brand.name);
//         const result = [...productNames, ...brandNames];
//         return res.status(200).json(result);
//     }
//     catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//   };
  

  
  export const getSuggestions = async (req, res: Response) => {
    try {
        const userInput = req.query.keyword;
        const products = await db.products.findAll({
            attributes: ['name'],
            where: {
              [db.Sequelize.Op.or]: [
                { name: { [db.Sequelize.Op.like]: `${userInput}%` } },  // Match at the start
                { name: { [db.Sequelize.Op.like]: `% ${userInput}%` } } // Match after a space
              ]
            }
          });
          
          const brands = await db.brands.findAll({
            attributes: ['name'],
            where: {
              [db.Sequelize.Op.or]: [
                { name: { [db.Sequelize.Op.like]: `${userInput}%` } },  // Match at the start
                { name: { [db.Sequelize.Op.like]: `% ${userInput}%` } } // Match after a space
              ]
            }
          });
          
          // Extract names from the results
          const productNames = products.map(product => product.name);
          const brandNames = brands.map(brand => brand.name);
          
          // Combine the arrays into a single array
          const result = [...productNames, ...brandNames];
          return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  



  export const getSearchResults = async (req: Request, res: Response) => {
    try {
        const userInput = req.query.keyword;
      
    
        const newArrivals = await db.products.findAll({
          where: {
          
          },
          include: [
            {
              model: db.productsImages,
              attributes: ['image_url'],
              limit: 1, 
            },
          ],
          
        });
    
        return res.status(200).json(newArrivals);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    };




