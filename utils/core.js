import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const mapDirFiles = async (path, type, filter) => {
	path = dirname(fileURLToPath(path));
	const files = fs.readdirSync(path).filter(i => (filter ? i.includes(`${filter}_`) : i !== 'index.js'));

	const promises = files.map(i => import(`${path}/${i}`));
	const result = await Promise.all(promises);
	const mapped = result.map(i => i.default);

	if (type === 'values') return mapped;

	return files.map((name, i) => ({
		[name.replace('.js', '')]: mapped[i],
	}));
};

const getController = async path => {
	const fileName = /[^/]*$/.exec(path)[0];
	return (await import(`../controllers/${fileName}`)).default;
};

export { mapDirFiles, getController };
