const Joi = require('joi');

const updatePostValidation = (bodyData) => {
    const updatePostValidationSchema = Joi.object({
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
        id:
            Joi.string()
            .guid()
    })
    return updatePostValidationSchema.validate(bodyData);
}

module.exports.updatePostValidation = updatePostValidation