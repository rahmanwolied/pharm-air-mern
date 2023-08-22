const fs = require('fs');
const path = require('path');
const createError = require('http-errors');

const User = require('../models/user.model');
const { successResponse } = require('./response.controller');
const { deleteImage } = require('../helpers/deleteImages');
const { findWithId } = require('../services/findItem.service');

const getUsers = async (req, res, next) => {
	try {
		const search = req.query.search || '';
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 3;

		const searchRegex = new RegExp('.*' + search + '.*', 'i'); // 'i' makes it case insensitive

		const filter = {
			isAdmin: { $ne: true },
			$or: [{ name: { $regex: searchRegex } }, { email: { $regex: searchRegex } }, { phone: { $regex: searchRegex } }],
		};

		const options = {
			password: 0,
			image: 0, // exclude password and image from result
		};

		const users = await User.find({});

		const count = await User.find(filter).countDocuments();

		if (!count) {
			console.log('Users does not exist');
			throw createError(404, 'Users does not exist');
		}

		return successResponse(res, {
			statusCode: 200,
			message: 'Users fetched successfully',
			payload: {
				users,
				pagination: {
					totalPages: Math.ceil(count / limit),
					currentPage: page,
					previousPage: page > 1 ? page - 1 : null, // if page is greater than 1, then previous page is page - 1, else null
					nextPage: page < Math.ceil(count / limit) ? page + 1 : null, // if page is less than total pages, then next page is page + 1, else null
				},
			},
		});
	} catch (error) {
		next(error);
	}
};

const getUserById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const options = { password: 0 };
		const user = await findWithId(User, id, options);

		return successResponse(res, {
			statusCode: 200,
			message: 'User fetched successfully',
			payload: { user },
		});
	} catch (error) {
		next(error);
	}
};

const deleteUserById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const options = { password: 0 };
		const user = await findWithId(User, id, options);

		// deleting image of the deleted user
		if (user.image !== 'avatar-default-icon.png') {
			const userImagePath = path.join('public', 'images', 'users', user.image);
			console.log(userImagePath);
			deleteImage(userImagePath);
		} else {
			console.log('User image is default image');
		}

		await User.findByIdAndDelete({
			_id: id,
			isAdmin: false,
		});

		return successResponse(res, {
			statusCode: 200,
			message: 'User deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getUsers, getUserById, deleteUserById };
