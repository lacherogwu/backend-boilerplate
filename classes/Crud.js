class CrudCopy {
	constructor(model) {
		this.model = model;
	}

	async find() {
		return await this.model.find({});
	}

	async create(data) {
		return await this.model.create(data);
	}

	async update(id, data) {
		return await this.model.findByIdAndUpdate(id, data, { runValidators: true, new: true });
	}

	async delete(id) {
		return await this.model.findByIdAndDelete(id);
	}

	controllers() {
		const get_find = catchAsync(async (req, res, next) => {
			const docs = await this.find();

			AppResponse(res, 200, docs);
		});

		const post_create = catchAsync(async (req, res, next) => {
			const doc = await this.create(req.body);

			AppResponse(res, 201, doc);
		});

		const put_update = catchAsync(async (req, res, next) => {
			const { id } = req.body;
			const doc = await this.update(id, req.body);

			AppResponse(res, 200, doc);
		});

		const delete_delete = catchAsync(async (req, res, next) => {
			const { id } = req.body;
			const doc = await this.delete(id);

			AppResponse(res, 200, doc);
		});

		return { get_find, post_create, put_update, delete_delete };
	}
}

module.exports = CrudCopy;
