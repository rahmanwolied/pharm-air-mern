const path = require('path')

exports.getLogin = (res, req) =>{
    res.status = 200
    res.sendFile(path.join(__dirname, '../views/login.html'))
}

exports.handleLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (user && user.password === password) {
			res.status(200).json({ status: 'valid user' });
		} else {
			res.status(300).json({ status: ' user not found' });
		}
	} catch (error) {
		console.log(`Error occured: ${error}`);
	}
}