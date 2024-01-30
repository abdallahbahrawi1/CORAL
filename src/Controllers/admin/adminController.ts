import { Request, Response } from 'express';
import * as userService from '../../Services/admin/adminService';
import { createAdminSchema, loginSchema, changePasswordSchema, changeUsernameSchema, updateAdminSchema } from '../../Validators/admin/adminSchema';
import { Session } from '../../Interfaces/userInterface';

declare module 'express' {
  interface Request {
    session: Session;
  }
}
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { error, value } = createAdminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await userService.createAdmin(value);
    res.status(201).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await userService.loginAdmin(value);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const logoutAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userService.logoutAdmin(req.session);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { error, value } = changePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await userService.changePassword(value, req.session);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const changeUsername = async (req: Request, res: Response)=> {
  try {
    const { error, value } = changeUsernameSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await userService.changeUsername(value, req.session);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};



export const updateAdminDetails = async (req: Request, res: Response) => {
  try {
    const { error, value } = updateAdminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await userService.updateAdminDetails(value, req.session);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const deleteAdminAccount = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteAdminAccount(req.session);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
