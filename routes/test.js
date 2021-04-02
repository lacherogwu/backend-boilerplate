const router = require('express').Router();
const { getController } = require('../utils');
const controller = getController(__filename);

router.get('/get', controller.get);

module.exports = router;
