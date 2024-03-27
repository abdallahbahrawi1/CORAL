import Joi from "joi";


export const productSchema = Joi.object({
    name: Joi.string().required(),
    sub_title: Joi.string().required(),
    price: Joi.number().required(),
    stock_quantity: Joi.number().required(),
    description: Joi.string().required(),
    brand_id: Joi.number().required(),
    category_id: Joi.number().required(),
    model: Joi.string().required(),
    discount_id: Joi.number(),
  });


  export const updatePoductSchema = Joi.object({
    name: Joi.string(),
    sub_title: Joi.string(),
    price: Joi.number(),
    stock_quantity: Joi.number(),
    description: Joi.string(),
    brand_id: Joi.number(),
    category_id: Joi.number(),
    model: Joi.string(),
    discount_id: Joi.number(),
  });