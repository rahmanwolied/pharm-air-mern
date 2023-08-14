const { getAllProducts, getProduct } = require('../services/products.service');
const { successResponse } = require('./response.controller');

const handleGetAllProducts = async (req, res, next) => {
	try {
		const products = await getAllProducts();
		return successResponse(res, {
			statusCode: 200,
			message: 'products were fetched successfully',
			payload: products,
		});
	} catch (error) {
		next(error);
	}
};

const handleGetProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		const product = await getProduct(req.params.id);
		return successResponse(res, {
			statusCode: 200,
			message: 'product was fetched successfully',
			payload: product,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { handleGetAllProducts, handleGetProduct };
