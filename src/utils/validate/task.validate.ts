import Joi from 'joi';

export const taskValidator = Joi.object().keys({
    title: Joi.string().required(),
});

