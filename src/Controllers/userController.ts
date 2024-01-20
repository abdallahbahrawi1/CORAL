import {  Request,Response ,NextFunction} from 'express';
const db = require('../Database/Models/index');
const Joi = require('joi');
const bcrypt = require('bcrypt');

 interface User {
    id:number;
    username: string;
    email: string;
    password: string;
    first_name:string,
    last_name:string,
    mobile:string,
    birth_date:string
  }
  
  interface session {
    id?:number;
    session_key: string;
    user_id:number
  }
   interface err<T> extends Response {}

  const passwordSchema=Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().min(8).max(254)


  
  const createUserSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(254).required(),
    password:passwordSchema,
    first_name:Joi.string().required(),
    last_name: Joi.string().required(),
    mobile:Joi.string()
    .pattern(/^(\+\d{1,3}[- ]?)?(\d{3}[- ]?)?\d{4}[- ]?\d{3}$/) 
    .message('Please provide a valid mobile number')
    .required(),
    birth_date:Joi.string()
    .isoDate() // Validate as an ISO date (YYYY-MM-DD)
    .message('Please provide a valid birth date in the format YYYY-MM-DD')
    .required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().email().min(5).max(254).required(),
   password:passwordSchema,
  })
  
  const changePasswordSchema = Joi.object({
    currentPassword:passwordSchema,
    newPassword: passwordSchema
  })

  const   changeUsernameSchema = Joi.object({
    newUsername: Joi.string().min(3).max(50).required(),
  })
  
  const updateUserSchema = Joi.object({
    first_name:Joi.string(),
    last_name: Joi.string(),
    mobile:Joi.string()
    .pattern(/^(\+\d{1,3}[- ]?)?(\d{3}[- ]?)?\d{4}[- ]?\d{3}$/) 
    .message('Please provide a valid mobile number'),
    birth_date:Joi.string()
    .isoDate() // Validate as an ISO date (YYYY-MM-DD)
    .message('Please provide a valid birth date in the format YYYY-MM-DD')
  });
  

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }
  
  
  
  export const createUser = async (req, res: Response):Promise<session| err<string>> => {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { username, email, password,first_name,last_name,mobile,birth_date } = value;
      
      const existingEmail = await db.users.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already in Use' });
      }
      const existingUsername = await db.users.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already in Use' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db.users.create({ username, email, password:hashedPassword,first_name,last_name,mobile,birth_date })as User;
      const session_key = generateRandomString(30);
      const newSession = await db.sessions.create({  user_id: newUser.id,session_key})as session;
      return res.status(200).json(newSession);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const loginUser = async (req, res: Response):Promise<session| err<string>> => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const {email, password } = value as User;
      let user:User = await db.users.findOne({ where: { email } });
    
    if (!user) {
      return res.status(400).json({ error: 'User with this Email/Username doesn\'t exist' });
    }
      let matchPassword=await bcrypt.compare(password, user.password)
      if (!matchPassword) {
        return res.status(400).json({ error: 'Password is incorrect' });
      }
      const session_key = generateRandomString(20);
      const newSession = await db.sessions.create({  user_id: user.id,session_key  });
      return res.status(200).json(newSession);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const logoutUser = async (req, res: Response):Promise<boolean| err<string>> => {
    try {
      const deletedSession = await db.sessions.destroy({ where: { session_key:req.session.session_key } });
      return res.status(200).json(true);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
export const checkSessionId = async (req, res: Response, next: NextFunction):Promise<void| err<string>> => {
  try {
    const session_key = req.headers['authorization'] as string;

    if (!session_key) {
      return res.status(401).json({ error: 'Session ID is missing in the headers.' });
    }

    // Check if the session exists
    const session = await db.sessions.findOne({ where: { session_key } });

    if (!session) {
      return res.status(403).json({ error: 'Invalid session ID.' });
    }
    //  req.body.session=session
    req.session=session
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const changePassword = async (req, res: Response):Promise<boolean| err<string>> => {
    try {
      // Validate the new password (you can use your own validation logic)
      const { error, value } = changePasswordSchema.validate(req.body)
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { currentPassword,newPassword } = value;
      let user:User = await db.users.findOne({ where: { id:req.session.user_id } });

      let matchPassword=await bcrypt.compare(currentPassword, user.password)
      if (!matchPassword) {
        return res.status(400).json({ error: 'Password is incorrect' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password in the database
      await db.users.update({ password: hashedPassword }, { where: { id: user.id } });
  
      // Delete all sessions associated with the user
      await db.sessions.destroy({ where: { user_id: user.id } });
  
      return res.status(200).json(true);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const changeUsername = async (req, res: Response):Promise<boolean| err<string>> => {
    try {
      // Validate the new password (you can use your own validation logic)
      const { error, value } = changeUsernameSchema.validate(req.body)
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { newUsername } = value;
    
      await db.users.update({ username: newUsername }, { where: { id: req.session.user_id } });
    
      return res.status(200).json(true);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const getUserDetails = async (req, res: Response):Promise<boolean| err<string>> => {
    try {
      const user = await db.users.findOne({ where: { id: req.session.user_id  } });
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const updateUserDetails = async (req, res: Response):Promise<boolean| err<string>> => {
    try {
      const { error, value } = updateUserSchema.validate(req.body)
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      console.log(value)
      const user = await db.users.update(value,{ where: { id: req.session.user_id  } });
      return res.status(200).json(true);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const deleteUserAccount = async (req, res: Response):Promise<boolean| err<string>> => {
    try {
      const user = await db.users.destroy({ where: { id: req.session.user_id  } });
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };