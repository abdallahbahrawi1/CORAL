import { Request, Response } from 'express';
import * as userService from '../../Services/admin/userService';

// export const generateOptions = (req: Request) => {
//     const options = {
//         id:req.query.id || null,
//       email: req.query.email || null,
//       username: req.query.username || null,
//       first_name: req.query.first_name || null,
//       last_name: req.query.last_name || null,
//       mobile: req.query.mobile || null,
//       birth_date: req.query.birth_date || null,
//       country: req.query.country || null,
//       city: req.query.city || null,
//       postal_code: req.query.postal_code || null,
//     };
  
//     // Remove properties with null values
//     return Object.fromEntries(Object.entries(options).filter(([_, value]) => value !== null));
//   };

//   export const getUsers = async (req: Request, res: Response) => {
//     try {
//       const options = {
//         // group: ['id'],
//         // attributes: [],  // Add the attributes you want to retrieve from the User model
//         // include: [],  // Add any associations you want to include
//         ...generateOptions(req), // Merge common options
//       };
  
//       const result = await userService.getUsers(options);
//       res.status(200).json(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

export const generateOptions = (req: Request) => {
    const options: any = {
      id: isNaN(Number(req.query.id)) ? null : Number(req.query.id),
      email: req.query.email || null,
      username: req.query.username || null,
      first_name: req.query.first_name || null,
      last_name: req.query.last_name || null,
      mobile: req.query.mobile || null,
      birth_date: req.query.birth_date || null,
      country: req.query.country || null,
      city: req.query.city || null,
      postal_code: req.query.postal_code || null,
      minAge:req.query.minAge || null,
      maxAge:req.query.maxAge || null,
      createdStartDate:req.query.createdStartDate || null,
      createdEndDate:req.query.createdEndDate || null,
      loginStartDate:req.query.loginStartDate || null,
      loginEndDate:req.query.loginEndDate || null,
    };
  
    // Remove properties with null values
    return Object.fromEntries(Object.entries(options).filter(([_, value]) => value !== null));
  };


  export const getUsers = async (req: Request, res: Response) => {
    try {
      const options = generateOptions(req);
        console.log(options)
      // Ensure that the options object is not empty
      const result = Object.keys(options).length > 0 ? await userService.getUsers(options) : await userService.getUsers(null);
  
      res.status(200).json({NumberOfUsers:result.length,result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };