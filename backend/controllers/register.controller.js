const path = require('path');
const User = require('../models/user.model');
const createError = require('http-errors');
const fs = require('fs');
const { successResponse } = require('./response.controller');
const { createJSONWebToken } = require('../helpers/jsonWebToken');
const { jwtActivationKey, clientURL, userUploadFile, jwtRefreshKey } = require('../src/secret');
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

		const activationToken = createJSONWebToken({ email }, jwtActivationKey, '10m');

		const emailTemplate = {
			email,
			subject: 'Account Activation Link',
			html: `
			<h2>Hello ${name}!</h2>
			<p>Please click on given <a href="${clientURL}/register/verify/${activationToken}" target="_blank" >link</a> to activate your account</p>`,
		};

		try {
			await sendEmail(emailTemplate);
		} catch (error) {
			next(createError(500, 'Error sending email'));
			return;
		}

		const user = await User.create(req.body);
		if (!user) throw createError(500, 'Error creating user');
		const refreshToken = createJSONWebToken({ _id: user._id }, jwtRefreshKey, '10d');

		return successResponse(res, {
			statusCode: 201,
			message: 'Check your email for activation link',
			payload: {
				user,
				refreshToken,
			},
		});
	} catch (error) {
		next(error);
	}
};

const activateUser = async (req, res, next) => {
	try {
		const token = req.params.token;
		if (!token) throw createError(400, 'No token provided');

		const decoded = jwt.verify(token, jwtActivationKey);
		if (!decoded) throw createError(400, 'User not verified');

		const user = await User.findOne({ email: decoded.email });
		if (!user) throw createError(404, 'User not found');

		console.log(user);
		user.isVerified = true;
		await user.save();

		return res.status(200).send(`<!DOCTYPE html>
		<html lang="en">
		<head>
		  <meta charset="UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <style>
			body {
			  font-family: Arial, sans-serif;
			  text-align: center;
			  margin: 0;
			  padding: 50px;
			  background-color: #f0f0f0;
			}
			.tick-mark {
			  color: green;
			  font-size: 48px;
			}
			.message {
			  font-size: 24px;
			  margin-top: 20px;
			}
		  </style>
		</head>
		<body>
		  <div class="tick-mark">&#10004;</div>
		  <div class="message">
			You are verified successfully. You can now order.
		  </div>
		</body>
		</html>
		`);
	} catch (error) {
		next(error);
	}
};

module.exports = { createUser, activateUser };
