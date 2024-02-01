import Joi from "joi";

const passwordSchema = Joi.string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  .required()
  .min(8)
  .max(254);

export const updateUserSchema = Joi.object({
    id:Joi.number().positive().required(),
  username: Joi.string().min(3).max(50),
  email: Joi.string().email().min(5).max(254),
  password: passwordSchema,
  first_name: Joi.string(),
  last_name: Joi.string(),
  mobile: Joi.string()
    .pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    .message("Please provide a valid mobile number")
    .required(),
  birth_date: Joi.string()
    .isoDate() // Validate as an ISO date (YYYY-MM-DD)
    .message("Please provide a valid birth date in the format YYYY-MM-DD")
    .required(),
});