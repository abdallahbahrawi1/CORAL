import Joi from 'joi'

export const placeOrderSchema = Joi.array().items(
  Joi.object({
    quantity: Joi.number().required().min(1),
    product_id: Joi.number().required().min(1)
  })
);