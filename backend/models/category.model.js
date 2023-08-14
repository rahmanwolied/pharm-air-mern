const mongoose = require('mongoose');

const { defaultAvatarPath } = require('../src/secret');

const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Category name is required'],
			trim: true,
			unique: true,
		},
		image: {
			type: String,
			default: defaultAvatarPath,
			required: false,
		},
		slug: {
			type: String,
			required: [true, 'Category slug is required'],
			lowercase: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('category', categorySchema);
