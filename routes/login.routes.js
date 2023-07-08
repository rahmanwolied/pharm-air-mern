const express = require('express');
const router = express.Router();
const { getLogin, handleLogin } = require('../controllers/login.controller');

router.get('/', getLogin);

router.post('/', handleLogin);

module.exports = router;
