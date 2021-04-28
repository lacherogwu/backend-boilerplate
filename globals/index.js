import { mapDirFiles } from '../utils/core.js';

const files = await mapDirFiles(import.meta.url);

// register on global object
files.forEach(i => Object.entries(i).forEach(item => (global[item[0]] = item[1])));
