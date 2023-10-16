class ApiError {
  constructor(statusCode, message, error) {
    this.statusCode = statusCode || 500;
    this.message = message || 'Internal server error';
    this.error = error || 'Internal server error';
  }
}

module.exports = ApiError;
