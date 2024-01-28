import Joi from 'joi'

export const addAddressSchema = Joi.object({
    city: Joi.string().required(),
    phone: Joi.string().required(),
    street: Joi.string().required(),
    country: Joi.string().required(),
    user_id: Joi.number(),
    postal_code: Joi.string().required(),
    address_line1: Joi.string().required(),
    address_line2: Joi.string().required(),
});
