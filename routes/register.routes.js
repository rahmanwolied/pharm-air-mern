const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user.model');

router.get('/', (req, res) => {
	res.statusCode = 200;
	res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.post('/', async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		console.log('New user saved successfully');
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
