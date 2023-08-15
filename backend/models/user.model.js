const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { defaultAvatarPath } = require('../src/secret');

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: [6, 'Password must be atleast 6 characters long'],
			set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)),
		},
		name: {
			type: String,
			required: false,
		},
		image: {
			data: Buffer,
			contentType: String,
		},
		address: {
			type: String,
			required: false,
		},
		phone: {
			type: String,
			required: false,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
