const winston = require('winston');
const expressWinston = require('express-winston');

expressWinston.requestWhitelist.push('body');
const wistonConfig = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
      alias: 'timestamp',
    }),
    winston.format.colorize(),
    winston.format.json(),
    winston.format.simple()
  ),
  meta: false, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}} {{req.body}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
});

module.exports = wistonConfig;
