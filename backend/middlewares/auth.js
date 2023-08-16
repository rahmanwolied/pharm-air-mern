const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { jwtAccessKey, jwtRefreshKey } = require('../src/secret');
const { findWithId } = require('../services/findItem.service');

const isLoggedIn = async (req, res, next) => {
	try {
		const token = req.cookies.refreshToken;
		if (!token) {
			throw createError(401, 'You are not logged in');
		}
		const decoded = jwt.verify(token, jwtRefreshKey);
		if (!decoded) {
			throw createError(401, 'You are not logged in');
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
		const user = await findWithId(User, req.body.userId);
		if (!user.isAdmin) throw createError(403, 'You are not authorized to access this route');
		next();
	} catch (error) {
		return next(error);
	}
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
