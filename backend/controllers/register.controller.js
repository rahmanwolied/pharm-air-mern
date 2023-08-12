const path = require('path');
const User = require('../models/user.model');
const createError = require('http-errors');
const { successResponse } = require('./response.controller');

exports.getRegister = (req, res) => {
	res.statusCode = 200;
	res.sendFile(path.join(__dirname, '../views/register.html'));
};

exports.createUser = async (req, res) => {
	try {
		const { name, email, password, address, phone } = req.body;

		const newUserRequested = {
			name,
			email,
			password,
			address,
			phone,
		};

		const userExists = await User.exists({ email: email });

		if (userExists) {
			throw createError(409, 'User with this email already exists');
		}

		const newUser = new User(req.body);
		await newUser.save();

		return successResponse(res, {
			statusCode: 201,
			message: 'User created successfully',
			payload: {
				user: newUser,
			},
		});
	} catch (error) {
		throw error;
	}
};
