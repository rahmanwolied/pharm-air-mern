const { getAllProducts, getProduct, updateProductBySlug, createProduct, deleteProductBySlug } = require('../services/products.service');
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

const handleCreateProduct = async (req, res, next) => {
	try {
		const { name, description, price, quantity, shipping } = req.body;
		const image = req.file;

		if (!image) {
			throw createError(400, 'Image file is required');
		}

		if (image.size > 1024 * 1024 * 2) {
			throw createError(400, 'File too large.It must be less than 2 MB');
		}

		const imageBufferString = image.buffer.toString('base64');

		const productData = {
			name,
			description,
			price,
			quantity,
			shipping,
			imageBufferString,
		};

		const product = await createProduct(productData);

		return successResponse(res, {
			statusCode: 200,
			message: 'product was created successfully',
			payload: product,
		});
	} catch (error) {
		next(error);
	}
};

const handleDeleteProduct = async (req, res, next) => {
	try {
		const { slug } = req.params;

		const product = await deleteProductBySlug(slug);

		return successResponse(res, {
			statusCode: 200,
			message: 'deleted single product',
		});
	} catch (error) {
		next(error);
	}
};

const handleUpdateProduct = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const updateOptions = { new: true, runValidators: true, context: 'query' };

		let updates = {};
		const allowedFields = ['name', 'description', 'price', 'quantity', 'shipping'];

		for (const key in req.body) {
			if (allowedFields.includes(key)) {
				updates[key] = req.body[key];
			}
		}

		const image = req.file;

		const updatedProduct = await updateProductBySlug(slug, updates, image, updateOptions);

		return successResponse(res, {
			statusCode: 200,
			message: 'deleted single product',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { handleGetAllProducts, handleGetProduct, handleCreateProduct, handleDeleteProduct, handleUpdateProduct };
