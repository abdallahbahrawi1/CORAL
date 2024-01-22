import Joi from 'joi'

export const placeOrderSchema = Joi.array().items(
  Joi.object({
    product_id: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required()
  })
);

export const orderIdSchema = Joi.number().positive()

export const AddOrderLocationAndPaymentSchema = Joi.object({
  order_address: Joi.object({
    email: Joi.string().email().required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    location: Joi.string().required(),
    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
  }).required(),
  payment_method: Joi.string().required(),
});