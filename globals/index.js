const { mapDirFiles } = require('../utils/core');

const files = mapDirFiles(__dirname);

// register on global object
files.forEach(i => Object.entries(i).forEach(item => (global[item[0]] = item[1])));
