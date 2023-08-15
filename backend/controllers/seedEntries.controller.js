const fs = require('fs');
const path = require('path');
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const { generateUsers, generateProducts } = require('../services/generateDummyData.service');
const { successResponse } = require('./response.controller');
const { userUploadFile, productUploadFile } = require('../src/secret');

const seedUser = async (req, res, next) => {
	try {
		// delete existing users
		await userModel.deleteMany({});

		const count = Number(req.params.count) || 10;

		const imageBufferString = req.file.buffer.toString('base64');

		// create dummy users
		const generatedData = {
			users: generateUsers(count, imageBufferString),
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
		const dir = path.join(__dirname, '..', productUploadFile, req.file.filename);
		const image = {
			data: fs.readFileSync(dir),
			contentType: 'image/png',
		};

		// create dummy products
		const generatedData = { products: generateProducts(image) };

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
