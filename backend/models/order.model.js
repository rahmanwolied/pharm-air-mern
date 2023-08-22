const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required'],
	},
});

const orderSchema = mongoose.Schema(
	{
		user: {
			type: userSchema,
			required: true,
		},
		items: [],
		total: {
			type: Number,
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
			enum: ['cod', 'bkash', 'creditCard'],
			default: 'cod',
		},
		status: {
			type: String,
			required: true,
			enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
			default: 'Pending',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('order', orderSchema);
