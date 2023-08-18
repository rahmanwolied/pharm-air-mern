const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
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
