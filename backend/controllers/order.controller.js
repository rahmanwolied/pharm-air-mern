const path = require('path');
const createError = require('http-errors');
const Order = require('../models/order.model');
const { successResponse } = require('./response.controller');
const { findWithId } = require('../services/findItem.service');
//handleGetAllOrders, handleGetOrders, handleUpdateOrder

const handleGetAllOrders = async (req, res, next) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 });
		const count = await Order.find().countDocuments();

		if (!count) {
			console.log('Order does not exist');
			throw createError(404, 'Order does not exist');
		}

		return successResponse(res, {
			statusCode: 200,
			message: 'Orders fetched successfully',
			payload: {
				orders,
			},
		});
	} catch (error) {
		next(error);
	}
};

const handleGetOrders = async (req, res, next) => {
	try {
		const id = req.params.id;
		const options = { password: 0 };
		const user = await findWithId(Order, id, options);

		return successResponse(res, {
			statusCode: 200,
			message: 'Order fetched successfully',
			payload: { user },
		});
	} catch (error) {
		next(error);
	}
};

const handleUpdateOrder = async (req, res, next) => {
	try {
		const id = req.params.id;
		const options = { password: 0 };
		const user = await findWithId(Order, id, options);

		// deleting image of the deleted user
		if (user.image !== 'avatar-default-icon.png') {
			const userImagePath = path.join('public', 'images', 'orders', user.image);
			console.log(userImagePath);
			deleteImage(userImagePath);
		} else {
			console.log('Order image is default image');
		}

		await Order.findByIdAndDelete({
			_id: id,
			isAdmin: false,
		});

		return successResponse(res, {
			statusCode: 200,
			message: 'Order deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { handleGetAllOrders, handleGetOrders, handleUpdateOrder };
