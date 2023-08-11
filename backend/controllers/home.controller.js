const path = require('path');

exports.getHome = (req, res) => {
	res.statusCode = 200;
	res.sendFile(path.join(__dirname, '../views/index.html'));
};
