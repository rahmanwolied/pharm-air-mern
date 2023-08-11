const path = require('path');
const Admin = require('../models/admin.model');

console.log(Admin);

exports.getAdminLogin = (req, res) => {
	res.statusCode = 200;
	res.sendFile(path.join(__dirname, '../views/adminLogin.html'));
};

exports.handleAdminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await Admin.findOne({ email: email });
		console.log(user);
		console.log(req.body);
		if (user && user.password === password) {
			res.status(200).json({ status: 'valid user' });
		} else {
			res.status(300).json({ status: ' user not found' });
		}
	} catch (error) {
		console.log(`Error occured: ${error}`);
	}
};
