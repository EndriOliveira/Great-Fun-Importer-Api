const swaggerUI = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const swaggerFile = require('../documentation.json');
const routes = require('./routes/index.routes');
const winstonConfig = require('./config/winston.config');
const logger = require('./config/routesLogger.config');
const ApiError = require('./middlewares/ApiError');
const auth = require('./middlewares/jwt.strategy')();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth.initialize());
app.auth = auth;
app.use(winstonConfig);
app.use('/', routes);
app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use((error, request, response, next) => {
  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
      error: error.error,
    });
  }
  return response.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
    error: 'Internal Server Error',
  });
});
logger(routes);

module.exports = app;
