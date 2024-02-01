import Joi from "joi";


export const categorySchema = Joi.object({
    name: Joi.string().required(),
    icon: Joi.string(),
    image: Joi.string(),
    image_mobile: Joi.string(),
  });
  
  export const updateCategorySchema = Joi.object({
    name: Joi.string(),
    icon: Joi.string(),
    image: Joi.string(),
    image_mobile: Joi.string(),
  });
  