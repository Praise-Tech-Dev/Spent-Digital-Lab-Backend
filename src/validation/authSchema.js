const Joi = require("joi");

const RegisterUsersSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("user", "researcher", "editor").optional(),
    phoneNo: Joi.string().optional(),
}); 

const LoginUsersSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

module.exports = {RegisterUsersSchema, LoginUsersSchema};