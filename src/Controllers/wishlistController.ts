// getUserWishlist,removeProductFromWishlist,addProductToWishlist,toggleProductInWishlist,DeleteUserWishlist

import {  Request,Response ,NextFunction} from 'express';
const db = require('../Database/Models/index');
const Joi = require('joi');

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


   const wishlistSchema = Joi.object({
    comment: Joi.string().min(1).max(400),
    product_id: Joi.number().integer().min(1).required(),
   })
  

  
  export const DeleteUserWishlist = async (req, res: Response):Promise<session| err<string>> => {
    try {
      
        const existingWishlist= await db.wishlists.findOne({ where: { user_id: req.session.user_id, } });
        if (!existingWishlist) {
          return res.status(404).json({ error: 'user does not have a wishlist' });
        }
        await db.wishlists.destroy({ where: {user_id: req.session.user_id}});
        return res.status(200).json(true);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const toggleProductInWishlist = async (req, res: Response):Promise<session| err<string>> => {
    try {
        const { error, value } = wishlistSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
      const {product_id,comment} = value;
      const existingProduct= await db.products.findOne({ where: { id:product_id, } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'product not found' });
      }
      const existingWishlist= await db.wishlists.findOne({ where: {user_id: req.session.user_id, product_id } });
      if (existingWishlist) {
        await db.wishlists.destroy({ where: {user_id: req.session.user_id, product_id }});
        return res.status(200).json(true);
      }

        await db.wishlists.create({ user_id: req.session.user_id, product_id,comment });
      return res.status(200).json(true);

    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const addProductToWishlist = async (req, res: Response):Promise<session| err<string>> => {
    try {
        const { error, value } = wishlistSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
      const {product_id,comment} = value;
      const existingProduct= await db.products.findOne({ where: { id:product_id, } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'product not found' });
      }
      const existingWishlist= await db.wishlists.findOne({ where: {user_id: req.session.user_id, product_id } });
      if (existingWishlist) {
        return res.status(404).json({ error: 'user already have  this product in their wishlist' });
      }
    
        const wishlist=await db.wishlists.create({ user_id: req.session.user_id, product_id,comment });
      return res.status(200).json(wishlist);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const removeProductFromWishlist = async (req, res: Response):Promise<session| err<string>> => {
    try {
     
      const product_id = req.params.product_id;
      const existingProduct= await db.products.findOne({ where: { id:product_id, } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'product not found' });
      }
      const existingWishlist= await db.wishlists.findOne({ where: {user_id: req.session.user_id, product_id } });
      if (!existingWishlist) {
        return res.status(404).json({ error: 'user does not have  this product in their wishlist' });
      }
    
        await db.wishlists.destroy({ where: {user_id: req.session.user_id, product_id }});
      return res.status(200).json(true);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  
  export const getUserWishlist = async (req, res: Response):Promise<boolean| err<string>> => {
    try {
      const wishlists = await db.wishlists.findAll({ where: { user_id: req.session.user_id  } });
      return res.status(200).json(wishlists);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  