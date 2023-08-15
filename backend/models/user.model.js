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
			required: true,
		},
		image: {
			type: Buffer,
			contentType: String,
		},
		address: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
