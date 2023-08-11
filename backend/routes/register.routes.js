const express = require('express');
const router = express.Router();
const { getRegister, createUser } = require('../controllers/register.controller');

router.get('/', getRegister);

router.post('/', createUser);

module.exports = router;
