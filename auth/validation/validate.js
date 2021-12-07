// importing Joi for the validation
const Joi = require("joi");

// validating user/admin added by admin
const validateUserRegister = (user) => {
    const schema = Joi.object({
        firstname: Joi.string().min(1).max(50).required(),
        lastname: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(1).max(100).required().email(),
        password: Joi.string().min(6).max(1000).required(),
        role: Joi.string().min(1).max(100).required()
    });
    return schema.validate(user);
};

// validating user/admin login
const validateUserLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(1).max(100).required().email(),
        password: Joi.string().min(6).max(1000).required()
    });
    return schema.validate(user);
};

// validating the change in password of user or admin
const validateUserChangePassword = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(1).max(100).required().email(),
        oldPassword: Joi.string().min(6).max(1000).required(),
        newPassword: Joi.string().min(6).max(1000).required(),
        confirmNewPassword: Joi.string().min(6).max(1000).required()
    });
    return schema.validate(user);
};

// validating user/admin details to be updated
const validateUserUpdate = (user) => {
    const schema = Joi.object({
        firstname: Joi.string().min(1).max(50).required(),
        lastname: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(1).max(100).required().email(),
        // password: Joi.string().min(6).max(1000).required(),
        role: Joi.string().min(1).max(100).required()
    });
    return schema.validate(user);
};

// exporting the validation functions
module.exports = { validateUserRegister, validateUserLogin, validateUserChangePassword, validateUserUpdate }