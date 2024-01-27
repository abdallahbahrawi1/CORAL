import Joi from 'joi';
export const wishlistSchema = Joi.object({
  comment: Joi.string().min(1).max(400),
  product_id: Joi.number().integer().min(1).required()
});
