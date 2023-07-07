const path = require("path")

exports.getRegister = (req, res) => {
	res.statusCode = 200;
	res.sendFile(path.join(__dirname, '../views/register.html'));
}

exports.createUser = async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		console.log('New user saved successfully');
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json(error);
	}
}