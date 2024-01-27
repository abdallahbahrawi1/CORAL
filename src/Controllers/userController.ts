import { Request, Response } from 'express';
import * as userService from '../Services/userService';
import { createUserSchema, loginSchema, changePasswordSchema, changeUsernameSchema, updateUserSchema } from '../Validators/userSchema';
import { Session } from '../Interfaces/userInterface';

declare module 'express' {
  interface Request {
    session: Session;
  }
}
export const createUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await userService.createUser(value);
    res.status(201).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await userService.loginUser(value);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.logoutUser(req.session);
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

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserDetails(req.session);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await userService.updateUserDetails(value, req.session);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUserAccount(req.session);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};


export const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const result = await userService.uploadProfileImage(req.session,req.file);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
