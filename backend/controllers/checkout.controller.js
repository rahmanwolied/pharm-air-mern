const { successResponse } = require('../controllers/response.controller');
const createError = require('http-errors');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const { findWithId } = require('../services/findItem.service');

const handleCheckout = async (req, res, next) => {
	try {
		const { user, cartId, paymentMethod } = req.body;

		console.log(cartId, paymentMethod);

		const cart = await Cart.findById(cartId);
		if (!cart) {
			throw createError(404, 'Cart not found');
		}

		if (JSON.stringify(cart.user) !== JSON.stringify(user._id)) {
			throw createError(401, 'Unauthorized');
		}
		if (cart.items.length === 0) {
			throw createError(400, 'Cart is empty');
		}

		const order = await Order.create({
			user: user._id,
			items: cart.items,
			total: cart.total,
			paymentMethod,
		});

		if (order) {
			cart.isActive = false;
			await cart.save();
			await Cart.create({ user: user._id, items: [] });

			successResponse(res, {
				statusCode: 200,
				message: 'Order placed successfully',
				payload: order,
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = { handleCheckout };
