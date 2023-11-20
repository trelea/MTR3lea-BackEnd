const Joi = require('joi');

const postValidation = (bodyData) => {
    const postValidationSchema = Joi.object({
        title:
            Joi.string()
            .required()
            .min(1)
            .max(100),
        description:
            Joi.string()
            .required()
            .min(1)
            .max(100000),
    })
    return postValidationSchema.validate(bodyData);
}

module.exports.postValidation = postValidation