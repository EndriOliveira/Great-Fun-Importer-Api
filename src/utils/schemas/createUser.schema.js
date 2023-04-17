const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(6).trim(true).required().label('Name').messages({
    'string.min': 'Name must be at least 6 characters',
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be an empty field',
    'any.required': 'Name is a required field',
  }),
  email: Joi.string().email().trim(true).required().label('Email').messages({
    'string.empty': 'Email cannot be an empty field',
    'any.required': 'Email is a required field',
  }),
  phone: Joi.string().min(11).trim(true).required().label('Phone').messages({
    'string.min': 'Phone must be at least 11 characters',
    'string.empty': 'Phone cannot be an empty field',
    'any.required': 'Phone is a required field',
  }),
  cpf: Joi.string().min(11).trim(true).required().label('CPF').messages({
    'string.min': 'CPF must be 11 characters',
    'string.empty': 'CPF cannot be an empty field',
    'any.required': 'CPF is a required field',
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
    )
    .label('Password')
    .required()
    .trim(true)
    .messages({
      'string.pattern.base':
        'Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      'any.required': 'Password is a required field',
      'string.empty': 'Password cannot be an empty field',
    }),
  confirmPassword: Joi.string()
    .trim(true)
    .required()
    .label('Confirm Password')
    .messages({
      'string.empty': 'Confirm Password cannot be an empty field',
      'any.required': 'Confirm Password is a required field',
    }),
  acceptTerms: Joi.boolean().required().label('Accept Terms').messages({
    'any.required': 'Accept Terms is a required field',
  }),
});
