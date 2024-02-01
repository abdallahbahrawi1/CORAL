import Joi from "joi";

export const discountSchema = Joi.object({
    percentage: Joi.number().integer().min(0).max(100).required(),
    start_date: Joi.date().iso(),
    expiry_date: Joi.date().iso().greater(Joi.ref('start_date')),
  });

  export const updateDiscountSchema = Joi.object({
    percentage: Joi.number().integer().min(0).max(100).required(),
    start_date: Joi.date().iso(),
    expiry_date: Joi.date().iso().greater(Joi.ref('start_date')),
  });