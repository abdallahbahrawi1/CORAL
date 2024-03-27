import { Request, Response, NextFunction } from "express";

import * as userService from "../Services/userService";
import { Session } from "../Interfaces/userInterface";

export const checkSessionKey = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      throw {
        code: 401,
        message: "Authorization header is missing",
      };
    }
    const result = (await userService.checkSessionKey(
      authorizationHeader
    )) as Session;
    
      //left this if it was needed in the future 

    // if (result && result.expiry_date > new Date()) {
    //   // If the session is valid, update the expiration date in the database
    //   await userService.extendSessionExpiry(authorizationHeader);}

    req.session = result;

    next();
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
      
