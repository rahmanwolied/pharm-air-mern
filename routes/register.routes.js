const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user.model');
const { getRegister, createUser } = require('../controllers/register.controller');

router.get('/', getRegister);

router.post('/', createUser);

module.exports = router;
