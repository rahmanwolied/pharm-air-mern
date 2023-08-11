const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	discount: {
		type: Number,
		required: false,
	},
});

module.exports = mongoose.model('product', productSchema);
