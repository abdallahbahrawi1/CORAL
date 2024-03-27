import Joi from 'joi';

export const shoppingCartSchema = Joi.object({
  product_id: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});
