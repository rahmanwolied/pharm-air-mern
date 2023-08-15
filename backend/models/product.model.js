const mongoose = require('mongoose');

const { defaultAvatarPath } = require('../src/secret');

//name,slug,description,price,quantity,sold,shipping,image
const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			data: Buffer,
			contentType: String,
		},
		slug: {
			type: String,
			required: [true, 'product slug is required'],
			lowercase: true,
			unique: true,
		},
		description: {
			type: String,
			required: [true, 'product description is required'],
			trim: true,
		},

		price: {
			type: Number,
			required: [true, 'product price is required'],
			trim: true,
			validate: {
				validator: (v) => v >= 0,
				message: (props) => `${props.value} is not a valid price! Price must be greater than 0`,
			},
		},

		quantity: {
			type: Number,
			required: [true, 'product quantity is required'],
			trim: true,
			validate: {
				validator: (v) => {
					return v >= 0;
				},
				message: (props) => {
					`${props.value} is not a valid quantity! quantity must be greater than 0`;
				},
			},
		},

		sold: {
			type: Number,
			required: [true, 'sold quantity is required'],
			trim: true,
			default: 0,
			validate: {
				validator: (v) => {
					return v >= 0;
				},
				message: (props) => {
					`${props.value} is not a valid quantity! sold must be greater than 0`;
				},
			},
		},

		shipping: {
			type: Number,
			default: 0,
		},

		category: {
			type: mongoose.Schema.Types.ObjectID,
			ref: 'Category',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('product', productSchema);
