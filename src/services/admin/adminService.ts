
import {
    User,
    Session,
    ErrorResponse,
    CreateUserInput,
    LoginUserInput,
    ChangePasswordInput,
    UpdateUserDetailsInput,
  } from "../../Interfaces/userInterface";
import db from '../../Database/Models/index'
import bcrypt from "bcrypt";
  import { generateRandomString ,minutesToMilliseconds} from "../../Utils/utils";
  
export const checkAdmin = async (
    sessionKey: string
  ) => {
    try {
      const session = await db.adminSessions.findOne({
        where: { session_key: sessionKey },
      });
  
      if (!session || session.expiry_date < new Date()) {
        throw { code: 403, message: "Invalid session Key." };
      }
  
      return session;
    } catch (error: any) {
      if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: "Internal Server Error" };
      }
    }
  };

export const extendSessionExpiry = async (sessionKey: string): Promise<void> => {
    try {
      const newExpiryDate = new Date(Date.now() + minutesToMilliseconds(60));
      // Find the session in the database and update its expiry date
      await db.adminSessions.update(
        { expiry_date: newExpiryDate },
        { where: { session_key: sessionKey } }
      );
    } catch (error: any) {
      // Handle any errors during the update
      throw { code: 500, message: "Internal Server Error" };
    }
  };
  
  
export const createAdmin = async (
    input
  ): Promise<Session | ErrorResponse> => {
    const {
      username,
      email,
      password,
      fullName,
      role,} = input;
  
    try {
      const existingEmail = await db.admins.findOne({ where: { email } });
      if (existingEmail) {
        throw { code: 409, message: "Email already in Use" };
      }
  
      const existingUsername = await db.admins.findOne({ where: { username } });
      if (existingUsername) {
        throw { code: 409, message: "Username already in Use" };
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = (await db.admins.create({
        username,
        email,
        password: hashedPassword,
        fullName,
        role,
      })) ;
  
      const session_key = generateRandomString(30);
      const newSession = (await db.adminSessions.create({
        admin_id: newAdmin.id,
        session_key,
      })) ;
  
      return newSession;
    } catch (error: any) {
      if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: "Internal Server Error" };
      }
    }
  };
  
  export const loginAdmin = async (
    input
  ) => {
    const { email, password } = input;
  
    try {
      const admin = await db.admins.findOne({ where: { email } });
  
      if (!admin) {
        throw {
          code: 404,
          message: "User with this Email/Username doesn't exist",
        };
      }
  
      const matchPassword = await bcrypt.compare(password, admin.password);
      if (!matchPassword) {
        throw { code: 401, message: "Password is incorrect" };
      }
  
      const session_key = generateRandomString(20);
      const newSession = await db.adminSessions.create({
        admin_id: admin.id,
        session_key,
      });
  
      return newSession;
    } catch (error: any) {
      if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: "Internal Server Error" };
      }
    }
  };
  
  export const logoutAdmin = async (
    session
  ) => {
    try {
      await db.adminSessions.destroy({ where: { session_key: session.session_key } });
      return true;
    } catch (error: any) {
      if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: "Internal Server Error" };
      }
    }
  };
  


  
  export const changePassword = async (
    input: ChangePasswordInput,
    session
  ) => {
    try {
      const { currentPassword, newPassword } = input;
      const admin = await db.admins.findOne({
        where: { id: session.admin_id },
      });
  
      const matchPassword = await bcrypt.compare(currentPassword, admin.password);
      if (!matchPassword) {
        throw { code: 401, message: "Password is incorrect" };
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.admins.update(
        { password: hashedPassword },
        { where: { id: admin.id } }
      );
  
      await db.adminSessions.destroy({ where: { admin_id: admin.id } });
  
      return true;
    } catch (error: any) {
      if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: "Internal Server Error" };
      }
    }
  };
  
  interface ChangeUsernameInput {
    newUsername: string;
  }
  
  export const changeUsername = async (
    input: ChangeUsernameInput,
    session
  ): Promise<boolean | ErrorResponse> => {
    try {
      const { newUsername } = input;
      const existingUsername = await db.admins.findOne({ where: { username:newUsername } });
      if (existingUsername) {
        throw { code: 409, message: "Username already in Use" };
      }
      await db.admins.update(
        { username: newUsername },
        { where: { id: session.admin_id } }
      );
  
      return true;
    } catch (error: any) {
      if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: "Internal Server Error" };
      }
    }
  };
  


  
  export const updateAdminDetails = async (
    input,
    session
  ): Promise<boolean | ErrorResponse> => {
    try {
      const { fullName,role} = input;
      const admin = await db.admins.update(
        { fullName,role },
        { where: { id: session.admin_id } }
      );
      return true;
    } catch (error: any) {
      if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: "Internal Server Error" };
      }
    }
  };
  
  export const deleteAdminAccount = async (
    session
  ): Promise<boolean | ErrorResponse> => {
    try {
      const admin = await db.admins.destroy({ where: { id: session.admin_id } });
      return true;
    } catch (error: any) {
      if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: "Internal Server Error" };
      }
    }
  };