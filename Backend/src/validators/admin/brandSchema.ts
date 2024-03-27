import Joi from "joi";


export const brandSchema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.string(),
  });


  export const updateBrandSchema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.string(),
  });