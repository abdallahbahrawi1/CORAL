
import { Request, Response, NextFunction } from "express";

import * as adminService from "../Services/admin/adminService";
import { Session } from "../Interfaces/userInterface";

export const checkAdmin = async (
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
    const result = (await adminService.checkAdmin(
      authorizationHeader
    )) as Session;
    if (result && result.expiry_date > new Date()) {
      // If the session is valid, update the expiration date in the database
      await adminService.extendSessionExpiry(authorizationHeader);}
    req.session = result;

    next();
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
