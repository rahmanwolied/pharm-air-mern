const multer = require('multer');
const path = require('path');

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

const uploadFile = (uploadDir) => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, uploadDir);
		},
		filename: (req, file, cb) => {
			const ext = path.extname(file.originalname);
			const fileName = path.basename(file.originalname, ext);
			cb(null, `${fileName}-${Date.now()}${ext}`);
		},
	});

	const fileFilter = (req, file, cb) => {
		if (!file.mimetype.startsWith('image/')) {
			return cb(new Error('Only image files are allowed!'), false);
		}
		if (file.size > MAX_FILE_SIZE) {
			return cb(new Error('File size exceeds limit!'), false);
		}
		cb(null, true);
	};

	const upload = multer({
		storage: storage,
		fileFilter: fileFilter,
	});
	return upload;
};
module.exports = uploadFile;
