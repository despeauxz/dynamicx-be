import Joi from 'joi';

export const userLoginValidator = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export const registerValidator = Joi.object().keys({
    email: Joi.string()
    .required()
    .email()
    .messages({
        'string.pattern.base': 'Please enter a valid email.',
        'string.empty': 'Email is not allowed to be empty',
    }),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
});
