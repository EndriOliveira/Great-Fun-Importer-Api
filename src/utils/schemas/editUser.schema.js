const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(6).trim(true).label('Name').messages({
    'string.min': 'Name must be at least 6 characters',
    'string.base': 'Name should be a type of text',
  }),
  phone: Joi.string().min(11).trim(true).label('Phone').messages({
    'string.min': 'Phone must be at least 11 characters',
    'string.empty': 'Phone cannot be an empty field',
  }),
  cpf: Joi.string().min(11).trim(true).label('CPF').messages({
    'string.min': 'CPF must be 11 characters',
    'string.empty': 'CPF cannot be an empty field',
  }),
  password: Joi.string().label('Password').required().trim(true).messages({
    'any.required': 'Password is a required field',
    'string.empty': 'Password cannot be an empty field',
  }),
});
