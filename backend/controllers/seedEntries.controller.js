const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const { generateUsers, generateProducts } = require('../services/generateDummyData.service');
const { successResponse } = require('./response.controller');

const seedUser = async (req, res, next) => {
	try {
		// delete existing users
		await userModel.deleteMany({});

		const count = Number(req.params.count) || 10;

		// create dummy users
		const generatedData = {
			users: generateUsers(count),
		};

		const users = await userModel.insertMany(generatedData.users);

		return successResponse(res, {
			statusCode: 200,
			message: `${count} users seeded successfully`,
			payload: {
				users,
			},
		});
	} catch (error) {
		next(error);
	}
};

const seedProducts = async (req, res, next) => {
	try {
		// delete existing products
		await productModel.deleteMany({});

		// create dummy products
		const generatedData = { products: generateProducts };

		const products = await productModel.insertMany(generatedData.products);

		return successResponse(res, {
			statusCode: 200,
			message: `products seeded successfully`,
			payload: {
				products,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { seedUser, seedProducts };