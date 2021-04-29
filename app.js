import express from 'express';
import middlewares from './middlewares/index.js';
import routes from './routes/index.js';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './controllers/errorHandler.js';

const app = express();

// app behind proxy (nginx)
app.set('trust proxy', true);

// logger
app.use(morgan('combined'));

// helmet
app.use(helmet()); // set secure headers

// health check
app.get(`/healthcheck`, (req, res, next) => AppResponse(res, 200, 'Application is running successfully'));

// middlewares
app.use(middlewares);

// routes
app.use(routes);

// error handler
app.all('*', (req, res, next) => {
	// 404 Not Found
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler); // Global Error Handling Middleware

export default app;
