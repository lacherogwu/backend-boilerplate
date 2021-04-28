import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const modelSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const Model = mongoose.model('crud', modelSchema);

export default Model;
