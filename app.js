const express = require('express');
const middlewares = require('./middlewares');

const app = express();

// middlewares
app.use(middlewares);

// routes
app.get('/', (req, res) => {
	res.json({ nuu: 123 });
});

// error handler

module.exports = app;
