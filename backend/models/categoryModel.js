const mongoose = require('mongoose');

const { defaultAvatarPath } = require('../src/secret');

const categorySchema = mongoose.Schema(
	{
		
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: defaultAvatarPath,
			required: false,
		},
        slug: {
            type:String,
            required:[true,"category slug is required"],
            lowercase:true,
            unique:true,
        },
		
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('category', categorySchema);
