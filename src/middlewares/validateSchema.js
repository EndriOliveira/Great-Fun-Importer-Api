const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;
  if (valid) {
    return next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    return res.status(400).json({
      statusCode: 400,
      message: message,
      error: 'Bad Request',
    });
  }
};

module.exports = validateSchema;
