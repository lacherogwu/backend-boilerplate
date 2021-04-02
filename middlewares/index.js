const express = require('express');
const { mapDirFiles } = require('../utils');

const files = mapDirFiles(__dirname, 'values');
const router = express.Router();

// prettier-ignore
[
    express.json(),
    ...files,
].forEach(md => router.use(md));

module.exports = router;
