const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');
const path = require('path');

router.get('/', (req, res) => {
	res.statusCode = 200;
	res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/', async (req, res) => {
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
});

module.exports = router;
