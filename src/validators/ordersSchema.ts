import Joi from 'joi'

export const placeOrderSchema = Joi.array().min(1).items(
  Joi.object({
    product_id: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required()
  })
);


export const AddOrderLocationAndPaymentSchema = Joi.object({
  order_address: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]{7,15}$/).required(),
    street: Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.string().required(),
    address_line1: Joi.string().required(),
    address_line2: Joi.string(),
  }).required(),
  payment_method: Joi.string().required(),
});