const Joi = require("joi");


const phoneRegex = /^\+?([0-9]{1,3})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

const UpdateUserSchema = Joi.object({
    firstName: Joi.string().max(24).optional(),
    lastName: Joi.string().max(24).optional(),
    phoneNo: Joi.string().pattern(phoneRegex).optional(),
}).or('firstName', 'lastName', 'phoneNo'); // At least one field must be provided

module.exports = {UpdateUserSchema};