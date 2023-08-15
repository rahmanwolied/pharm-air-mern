const path = require('path');
const User = require('../models/user.model');
const createError = require('http-errors');
const fs = require('fs');
const { successResponse } = require('./response.controller');
const { createJSONWebToken } = require('../helpers/jsonWebToken');
const { jwtActivationKey, clientURL, userUploadFile } = require('../src/secret');
const { sendEmail } = require('../helpers/email');
const jwt = require('jsonwebtoken');

const createUser = async (req, res, next) => {
	try {
		const { name, email, password, address, phone } = req.body;

		const userExists = await User.exists({ email: email });

		if (userExists) {
			throw createError(409, 'User with this email already exists');
		}

		let dir = '';
		if (!req.file) {
			dir = path.join(__dirname, '..', userUploadFile, 'avatar-default-icon.png');
		} else {
			dir = path.join(__dirname, '..', userUploadFile, req.file.filename);
		}

		const image = {
			data: fs.readFileSync(dir),
			contentType: 'image/png',
		};

		req.body.image = image;

		const token = createJSONWebToken(req.body, jwtActivationKey, '10m');

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

		const user = await User.create(req.body);

		return successResponse(res, {
			statusCode: 201,
			message: 'Check your email for activation link',
			payload: {
				user,
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

		if (!decoded) throw createError(400, 'User not verified');

		return successResponse(res, {
			statusCode: 201,
			message: 'User activated successfully',
			payload: { decoded },
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { createUser, activateUser };
