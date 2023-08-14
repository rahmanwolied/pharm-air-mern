const { successResponse } = require('./response.controller');
const { createCategory, getAllCategories, getCategory } = require('../services/category.service');

const handleCreateCategory = async (req, res, next) => {
	try {
		const { name } = req.body;
		const newCategory = await createCategory(name);

		return successResponse(res, {
			statusCode: 200,
			message: 'category was created successfully',
			payload: newCategory,
		});
	} catch (error) {
		next(error);
	}
};

const handleGetAllCategories = async (req, res, next) => {
	try {
		const categories = await getAllCategories();

		return successResponse(res, {
			statusCode: 200,
			message: 'categories were fetched successfully',
			payload: categories,
		});
	} catch (error) {
		next(error);
	}
};

const handleGetCategory = async (req, res, next) => {
	try {
		const slug = req.params.slug;
		const category = await getCategory(slug);

		return successResponse(res, {
			statusCode: 200,
			message: 'categories were fetched successfully',
			payload: category,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { handleCreateCategory, handleGetAllCategories, handleGetCategory };
