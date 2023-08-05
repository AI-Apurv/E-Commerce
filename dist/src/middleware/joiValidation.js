"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupMiddleware = void 0;
const joi_1 = __importDefault(require("joi"));
const responseMessages_1 = require("../utils/responseMessages");
const signupMiddleware = (req, res, next) => {
    const signupValidation = joi_1.default.object({
        user_name: joi_1.default.string()
            .min(5)
            .pattern(/^[a-zA-Z0-9_]+$/)
            .required()
            .messages({
            'string.min': responseMessages_1.responseMessages.userNameMinLength,
            'string.pattern.base': responseMessages_1.responseMessages.userNamePattern,
            'any.required': responseMessages_1.responseMessages.userNameRequired,
        }),
        first_name: joi_1.default.string().required().messages({
            'any.required': responseMessages_1.responseMessages.firstNameRequired,
        }),
        last_name: joi_1.default.string().required().messages({
            'any.required': responseMessages_1.responseMessages.lastNameRequired,
        }),
        email: joi_1.default.string().email().required().messages({
            'string.email': responseMessages_1.responseMessages.emailInvalid,
            'any.required': responseMessages_1.responseMessages.emailRequired,
        }),
        password: joi_1.default.string()
            .min(7)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
            .required()
            .messages({
            'string.min': responseMessages_1.responseMessages.passwordMinLength,
            'string.pattern.base': responseMessages_1.responseMessages.passwordPattern,
            'any.required': responseMessages_1.responseMessages.passwordRequired,
        }),
    });
    const { error } = signupValidation.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(', ');
        res.status(422).send(responseMessages_1.responseMessages.validationError + ': ' + errorMessage);
    }
    else {
        next();
    }
};
exports.signupMiddleware = signupMiddleware;
