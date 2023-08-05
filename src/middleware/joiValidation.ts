import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { responseMessages } from '../utils/responseMessages';

export const signupMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const signupValidation = Joi.object({
    user_name: Joi.string()
      .min(5)
      .pattern(/^[a-zA-Z0-9_]+$/)
      .required()
      .messages({
        'string.min': responseMessages.userNameMinLength,
        'string.pattern.base': responseMessages.userNamePattern,
        'any.required': responseMessages.userNameRequired,
      }),
    first_name: Joi.string().required().messages({
      'any.required': responseMessages.firstNameRequired,
    }),
    last_name: Joi.string().required().messages({
      'any.required': responseMessages.lastNameRequired,
    }),
    email: Joi.string().email().required().messages({
      'string.email': responseMessages.emailInvalid,
      'any.required': responseMessages.emailRequired,
    }),
    password: Joi.string()
      .min(7)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      .required()
      .messages({
        'string.min': responseMessages.passwordMinLength,
        'string.pattern.base': responseMessages.passwordPattern,
        'any.required': responseMessages.passwordRequired,
      }),
  });

  const { error } = signupValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(', ');
    res.status(422).send(responseMessages.validationError + ': ' + errorMessage);
  } else {
    next();
  }
};
