const userModel = require('../models/user.model');
const { generateUsers,generateProducts } = require('../services/generateDummyData');
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
		// delete existing users
		await Product.deleteMany({});

		const count = Number(req.params.count) || 10;

		// create dummy users
		const generatedData = {
			products: generateProducts(count),
		};

		const products = await Product.insertMany(generatedData.products);

		return successResponse(res, {
			statusCode: 200,
			message: `${count} users seeded successfully`,
			payload: {
				products,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { seedUser,seedProducts };
