const Joi = require('joi')

const updateUserProfileValidation = (bodyData) => {
    const updateUserProfileValidationSchema = Joi.object({
        user_additional_name:
            Joi.string()
            .required()
            .min(1)
            .max(100),
        user_description:
            Joi.string()
            .required()
            .min(1)
            .max(1000)
    })
    return updateUserProfileValidationSchema.validate(bodyData);
}

module.exports.updateUserProfileValidation = updateUserProfileValidation;