const path = require('path');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { successResponse } = require('./response.controller');
const { createJSONWebToken } = require('../helpers/jsonWebToken');
const { jwtAccessKey, nodeEnv } = require('../src/secret');

const handleLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });
		if (!user) throw createError(404, 'User not found');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw createError(401, 'Invalid credentials');

		const accessToken = createJSONWebToken({ email }, jwtAccessKey, '10m');

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			maxAge: 10 * 60 * 1000, // 10 minutes
			secure: nodeEnv === 'production' ? true : false,
			sameSite: nodeEnv === 'production' ? 'none' : 'lax',
		});

		return successResponse(res, {
			statusCode: 200,
			message: 'User logged in successfully',
			payload: { user },
		});
	} catch (error) {
		next(error);
	}
};
const handleLogout = async (req, res, next) => {
	try {
		res.clearCookie('accessToken');
		return successResponse(res, {
			statusCode: 200,
			message: 'User logged out successfully',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { handleLogin, handleLogout };
