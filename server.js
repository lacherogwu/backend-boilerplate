import './globals/index.js';
import app from './app.js';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;

// db connection
await mongoose.connect(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
app.listen(port, () => console.log(`listening at http://localhost:${port}`));

// handle unhandled rejection
process.on('unhandledRejection', err => {
	console.error(err.name, err.message);
	console.log('UNHANDLED REJECTION 💥 Shutting down...');
	process.exit(1);
});
