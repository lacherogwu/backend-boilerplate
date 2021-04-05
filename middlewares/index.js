const express = require('express');
const { mapDirFiles } = require('../utils');
const cookieParser = require('cookie-parser');

const router = express.Router();
const files = mapDirFiles(__dirname, 'values', 'global');

// prettier-ignore
[
    express.json(),
    cookieParser(),
    ...files,
].forEach(md => router.use(md));

module.exports = router;
