function ErrorHandler(Error, req, res, next) {
  res.status(Error.status || 500);
  res.json({
    statusCode: Error.status || 500,
    message: Error.message,
    error: Error.error || 'Internal server error',
  });
}

module.exports = ErrorHandler;
