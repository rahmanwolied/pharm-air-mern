const { addToCart, removeFromCart, getCart, getCarts } = require('../services/cart.service');
const { successResponse } = require('../controllers/response.controller');
const createError = require('http-errors');

const handleAddToCart = async (req, res, next) => {
	try {
		const { user, productId, quantity } = req.body;
		const userId = user._id;
		console.log(userId);
		if (!productId || !quantity) {
			throw createError(401, 'Product id and quantity are required');
		}

		const cart = await addToCart(userId, productId, quantity);
		console.log(cart);

		if (cart) {
			successResponse(res, {
				statusCode: 200,
				message: 'Product added to cart successfully',
				payload: cart,
			});
		}
	} catch (error) {
		next(error);
	}
};

const handleRemoveFromCart = async (req, res, next) => {
	try {
		const { user, productId } = req.body;
		const userId = user;
		console.log(productId);
		if (!productId) {
			throw createError(401, 'Product id is required');
		}

		const cart = await removeFromCart(userId, productId);
		if (cart) {
			successResponse(res, {
				statusCode: 200,
				message: 'Product removed from cart successfully',
				payload: cart,
			});
		}
	} catch (error) {
		next(error);
	}
};

const handleGetCart = async (req, res, next) => {
	try {
		const { user } = req.body;
		const userId = user._id;
		const cart = await getCart(userId);
		if (cart) {
			successResponse(res, {
				statusCode: 200,
				message: 'Cart fetched successfully',
				payload: cart,
			});
		}
	} catch (error) {
		next(error);
	}
};

const handleGetAllCarts = async (req, res, next) => {
	try {
		const { user } = req.body;
		const userId = user;
		const carts = await getCarts(userId);
		if (carts) {
			successResponse(res, {
				statusCode: 200,
				message: 'Carts fetched successfully',
				payload: carts,
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = { handleAddToCart, handleRemoveFromCart, handleGetCart, handleGetAllCarts };
