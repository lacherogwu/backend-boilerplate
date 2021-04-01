const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(i => i !== 'index.js');

const arr = files.map(i => ({ [i.replace('.js', '')]: require(`./${i}`) }));
arr.forEach(i =>
	Object.entries(i).forEach(item => (global[item[0]] = item[1]))
);
