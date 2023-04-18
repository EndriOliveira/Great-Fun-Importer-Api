const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().trim(true).required().label('Email').messages({
    'string.empty': 'Email cannot be an empty field',
    'any.required': 'Email is a required field',
  }),
});
