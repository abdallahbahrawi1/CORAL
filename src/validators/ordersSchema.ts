import Joi from 'joi'

export const placeOrderSchema = Joi.array().items(
  Joi.object({
    product_id: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required()
  })
);

export const orderIdSchema = Joi.number().positive()