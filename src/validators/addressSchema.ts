import Joi from 'joi'

export const addAddressSchema = Joi.object({
    full_name: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string()
    .pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    .message("Please provide a valid mobile number")
    .required(),
    street: Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.string().required(),
    address_line1: Joi.string().required(),
    address_line2: Joi.string().required(),
});

export const updateAddressSchema = Joi.object({
    full_name: Joi.string().allow(''),
    country: Joi.string(),
    city: Joi.string(),
    street: Joi.string(),
    phone: Joi.string().pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),
    address_line1: Joi.string(),
    address_line2: Joi.string(),
    postal_code: Joi.string(),
});
