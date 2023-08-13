const fs = require('fs');

const deleteImage = (imagePath) => {
	fs.access(imagePath, (err) => {
		if (err) {
			console.error('File does not exist');
			return;
		} else {
			fs.unlink(imagePath, (err) => {
				if (err) throw err;
				console.log('File deleted');
			});
		}
	});
};

module.exports = { deleteImage };
