const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');
const path = require('path');
const { getLogin, handleLogin } = require('../controllers/login.controller');

router.get('/', getLogin);

router.post('/', handleLogin);

module.exports = router;
