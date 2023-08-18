const { successResponse } = require('../controllers/response.controller');
const createError = require('http-errors');

const handleCheckout = async (req, res, next) => {
	try {
		const { user, cartId } = req.body;
		const userId = user._id;
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

module.exports = { handleCheckout };
