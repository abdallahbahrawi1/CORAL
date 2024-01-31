import Joi from 'joi'

export const placeOrderSchema = Joi.array().min(1).items(
  Joi.object({
    product_id: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required()
  })
);

export const AddOrderLocationAndPaymentSchema = Joi.object({
  order_address: Joi.object({
    full_name: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string()
    .pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    .message("Please provide a valid mobile number")
    .required(),    street: Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.string().required(),
    address_line1: Joi.string().required(),
    address_line2: Joi.string(),
  }).required(),
  payment_method: Joi.string().required(),
});
