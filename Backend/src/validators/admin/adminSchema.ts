import Joi from "joi";

const passwordSchema = Joi.string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  .required()
  .min(8)
  .max(254);

export const createAdminSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().min(5).max(254).required(),
  password: passwordSchema,
  fullName: Joi.string().min(1).required(), 
  role: Joi.string().min(1).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().min(5).max(254).required(),
  password: passwordSchema,
});

export const changePasswordSchema = Joi.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
});

export const changeUsernameSchema = Joi.object({
  newUsername: Joi.string().min(3).max(50).required(),
});

export const updateAdminSchema = Joi.object({
    fullName: Joi.string().min(1).required(), 
    role: Joi.string().min(1).required(),
});
