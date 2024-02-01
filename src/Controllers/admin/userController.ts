import { Request, Response } from 'express';
import * as userService from '../../Services/admin/userService';
import { updateUserSchema} from '../../Validators/admin/updateUserSchema';
import bcrypt from 'bcrypt'

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
  
    return Object.fromEntries(Object.entries(options).filter(([_, value]) => value !== null));
  };


  export const getUsers = async (req: Request, res: Response) => {
    try {
      const options = generateOptions(req);
        console.log(options)
      const result = Object.keys(options).length > 0 ? await userService.getUsers(options) : await userService.getUsers(null);
  
      res.status(200).json({NumberOfUsers:result.length,result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //This allows admin to update and set user details , also restting password without knowing the old one
  export const updateUserDetails = async (req: Request, res: Response) => {
    try {
      const { error, value } = updateUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      if(value.password){   
         value.password = await bcrypt.hash(value.password, 10);
      }
      const result = await userService.updateUserDetails(value);
      res.status(200).json(result);
    } catch (error: any) {
      const statusCode = error.code || 500;
      res.status(statusCode).json({ error: error.message });
    }
  };