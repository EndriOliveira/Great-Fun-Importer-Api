const Joi = require('joi');

module.exports = Joi.object({
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
  code: Joi.string().required().label('Code').messages({
    'any.required': 'Code is a required field',
  }),
});
