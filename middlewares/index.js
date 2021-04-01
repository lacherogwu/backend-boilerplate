const express = require('express');
const logger = require('./logger');

const router = express.Router();

[express.json(), logger].forEach(md => router.use(md));

module.exports = router;
