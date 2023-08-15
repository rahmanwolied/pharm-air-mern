const multer = require('multer');
const { userUploadFile } = require('../src/secret');
const path = require('path');

const uploadDir = userUploadFile;

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		const extension = path.extname(file.originalname);
		cb(null, Date.now() + '-' + file.originalname.replace(extension, '') + extension);
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
