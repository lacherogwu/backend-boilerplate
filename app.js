const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./controllers/errorHandler');

const app = express();
const defaultPath = 'api';

// app behind proxy (nginx)
app.set('trust proxy', true);

// logger
app.use(morgan('combined'));

// helmet
app.use(helmet()); // set secure headers

// health check
app.get(`/${defaultPath}/healthcheck`, (req, res, next) => AppResponse(res, 200, 'application is running successfully'));

// middlewares
app.use(middlewares);

// routes
app.use(`/${defaultPath}`, routes);

// error handler
app.all('*', (req, res, next) => {
	// 404 Not Found
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler); // Global Error Handling Middleware

module.exports = app;
