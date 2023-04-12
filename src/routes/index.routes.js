const app = require('express')();
const usersRouter = require('./users.routes');
const authRouter = require('./auth.routes');

app.use(authRouter);
app.use(usersRouter);

module.exports = app;
