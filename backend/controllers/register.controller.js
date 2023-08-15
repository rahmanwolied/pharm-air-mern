const path = require('path');
const User = require('../models/user.model');
const createError = require('http-errors');
const { successResponse } = require('./response.controller');
const { createJSONWebToken } = require('../helpers/jsonWebToken');
const { jwtActivationKey, clientURL } = require('../src/secret');
const { sendEmail } = require('../helpers/email');
const jwt = require('jsonwebtoken');

const createUser = async (req, res, next) => {
	try {
		const { name, email, password, address, phone } = req.body;

		const userExists = await User.exists({ email: email });

		if (userExists) {
			throw createError(409, 'User with this email already exists');
		}

		const token = createJSONWebToken({ name, email, password, address, phone }, jwtActivationKey, '10m');

		const emailTemplate = {
			email,
			subject: 'Account Activation Link',
			html: `
				<h2>Hello ${name}!</h2>
				<p>Please click on given <a href="${clientURL}/api/register/verify/${token}" target="_blank" >link</a> to activate your account</p>`,
		};

		// send email
		// try {
		// 	await sendEmail(emailTemplate);
		// } catch (error) {
		// 	next(createError(500, 'Error sending email'));
		// 	return;
		// }

		return successResponse(res, {
			statusCode: 201,
			message: 'Check your email for activation link',
			payload: {
				token,
			},
		});
	} catch (error) {
		next(error);
	}
};

const activateUser = async (req, res, next) => {
	try {
		const token = req.body.token;
		if (!token) throw createError(400, 'No token provided');

		const decoded = jwt.verify(token, jwtActivationKey);

		await User.create(decoded);

		if (!decoded) throw createError(400, 'User not verified');

		return successResponse(res, {
			statusCode: 201,
			message: 'User activated successfully',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { createUser, activateUser };
