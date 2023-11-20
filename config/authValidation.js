const Joi = require('joi');

const singupValidation = (bodyData) => {
    const singupValidationSchema = Joi.object({
        email:
            Joi.string()
            .required()
            .max(255)
            .email(),
        username:
            Joi.string()
            .required()
            .regex(/^[a-zA-Z0-9_.]+$/, '(a-z; A-Z; 0-9; _; .)')
            .min(4)
            .max(30),
        date:
            Joi.date()
            .required()
            .max('01-01-2013'),
    });
    return singupValidationSchema.validate(bodyData);
}

const loginValidation = (bodyData) => {
    const loginValidationSchema = Joi.object({
        email:
            Joi.string()
            .required()
            .max(255)
            .email(),
        password:
            Joi.string()
            .required()
            .min(10)
            .max(255),
    })
    return loginValidationSchema.validate(bodyData);
}

const passwordValidation = (password) => {
    const passwordValidationSchema = Joi.object({
        password:
            Joi.string()
            .required()
            .min(10)
            .max(255)
    })
    return passwordValidationSchema.validate(password);
}

module.exports.passwordValidation = passwordValidation;
module.exports.singupValidation = singupValidation;
module.exports.loginValidation = loginValidation;
