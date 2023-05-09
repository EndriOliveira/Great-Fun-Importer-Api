const swaggerUI = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const swaggerFile = require('../documentation.json');
const routes = require('./routes/index.routes');
const winstonConfig = require('./config/winston.config');
const logger = require('./config/routesLogger.config');
const ErrorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/jwt.strategy')();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth.initialize());
app.auth = auth;
app.use(winstonConfig);
app.use('/', routes);
app.use(ErrorHandler);
app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerFile));
logger(routes);

module.exports = app;
