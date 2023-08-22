const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { jwtRefreshKey, jwtActivationKey } = require('../src/secret');
const { findWithId } = require('../services/findItem.service');

const isLoggedIn = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			throw createError(401, 'No authorization header');
		}
		const token = authorization.split(' ')[1];
		if (!token) {
			throw createError(401, 'No token found');
		}

		const decoded = jwt.verify(token, jwtRefreshKey);

		if (!decoded) {
			throw createError(401, 'Invalid or expired token');
		}

		const user = await findWithId(User, decoded._id);
		if (!user) {
			throw createError(401, 'Invalid token. Please login again');
		}
		req.body.user = user;
		next();
	} catch (error) {
		return next(error);
	}
};

const isLoggedOut = (req, res, next) => {
	try {
		const token = req.cookies.refreshToken;
		if (token) {
			throw createError(401, 'You are already logged in');
		}

		next();
	} catch (error) {
		return next(error);
	}
};

const isAdmin = async (req, res, next) => {
	try {
		const user = await findWithId(User, req.body.user._id);
		if (!user.isAdmin) throw createError(403, 'You are not authorized to access this route');
		next();
	} catch (error) {
		return next(error);
	}
};

const isVerified = async (req, res, next) => {
	try {
		const user = await findWithId(User, req.body.user._id);
		console.log(user.isVerified);
		if (!user.isVerified) throw createError(403, 'You are not a verified user. Please verify your account');
		next();
	} catch (error) {
		return next(error);
	}
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin, isVerified };
