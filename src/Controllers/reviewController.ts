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


   const reviewSchema = Joi.object({
    comment: Joi.string().min(1).max(400),
    rating: Joi.number().integer().min(1).max(5),
   })
  

  
  export const postReview = async (req, res: Response):Promise<session| err<string>> => {
    try {
      const { error, value } = reviewSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { rating,comment } = value;
      const product_id = req.params.product_id;

      const existingProduct= await db.products.findOne({ where: { id:product_id } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'product not found' });
      }
    
      const newReview = await db.reviews.create({  user_id:req.session.user_id, product_id, rating, comment  });
      return res.status(200).json(newReview);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const updateReview = async (req, res: Response):Promise<session| err<string>> => {
    try {
      const { error, value } = reviewSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const product_id = req.params.product_id;
      const existingProduct= await db.products.findOne({ where: { id:product_id } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'product not found' });
      }
      const existingReview= await db.reviews.findOne({ where: {user_id: req.session.user_id, product_id } });
      if (!existingReview) {
        return res.status(404).json({ error: 'user review for this product not found' });
      }
    
      const newReview = await db.reviews.update(value,{ where: {user_id: req.session.user_id, product_id }});
      return res.status(200).json(true);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const deleteReview = async (req, res: Response):Promise<session| err<string>> => {
    try {
     
      const product_id = req.params.product_id;
      const existingProduct= await db.products.findOne({ where: { id:product_id, } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'product not found' });
      }
      const existingReview= await db.reviews.findOne({ where: {user_id: req.session.user_id, product_id } });
      if (!existingReview) {
        return res.status(404).json({ error: 'user review for this product not found' });
      }
    
      const newReview = await db.reviews.destroy({ where: {user_id: req.session.user_id, product_id }});
      return res.status(200).json(true);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  
  export const getAllUserReviews = async (req, res: Response):Promise<boolean| err<string>> => {
    try {
      const reviews = await db.reviews.findAll({ where: { user_id: req.session.user_id  } });
      return res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  