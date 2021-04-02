const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

// middlewares
app.use(middlewares);

// routes
app.use('/api', routes);

// error handler

module.exports = app;
