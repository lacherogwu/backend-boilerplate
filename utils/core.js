import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const dImport = async path => {
	const { default: d } = await import(path);
	return d;
};

const mapDirFiles = async (path, type, filter) => {
	path = dirname(fileURLToPath(path));
	const files = fs.readdirSync(path).filter(i => (filter ? i.includes(`${filter}_`) : i !== 'index.js'));

	const promises = files.map(i => dImport(`${path}/${i}`));
	const result = await Promise.all(promises);

	if (type === 'values') return result;

	return files.map((name, i) => ({
		[name.replace('.js', '')]: result[i],
	}));
};

const getController = async path => {
	const fileName = /[^/]*$/.exec(path)[0];
	return await dImport(`../controllers/${fileName}`);
};

export { mapDirFiles, getController };
