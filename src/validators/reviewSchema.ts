import Joi from "joi";

export const reviewSchema = Joi.object({
    comment: Joi.string().min(1).max(400),
    rating: Joi.number().integer().min(1).max(5),
  });