const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../src/secret');

const isLoggedIn = (req, res, next) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) {
			throw createError(401, 'You are not logged in');
		}
		const decoded = jwt.verify(token, jwtAccessKey);
		if (!decoded) {
			throw createError(401, 'You are not logged in');
		}
		req.user = decoded.user;
		next();
	} catch (error) {
		return next(error);
	}
};

const isLoggedOut = (req, res, next) => {
	try {
		const token = req.cookies.accessToken;
		if (token) {
			throw createError(401, 'You are already logged in');
		}

		next();
	} catch (error) {
		return next(error);
	}
};

const isAdmin = (req, res, next) => {
	try {
		if (!req.user.isAdmin) throw createError(403, 'You are not authorized to access this route');
		next();
	} catch (error) {
		return next(error);
	}
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
