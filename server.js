require('dotenv').config();
require('./globals');
const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;

(async () => {
	// db connection
	await mongoose.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
	app.listen(port, () => console.log(`listening at http://localhost:${port}`));
})();

// handle unhandled rejection
process.on('unhandledRejection', err => {
	console.error(err.name, err.message);
	console.log('UNHANDLED REJECTION 💥 Shutting down...');
	process.exit(1);
});
