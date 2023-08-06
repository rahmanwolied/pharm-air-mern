const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('admin', adminSchema);
