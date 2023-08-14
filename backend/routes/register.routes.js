const express = require('express');
const router = express.Router();
const { createUser, activateUser } = require('../controllers/register.controller');

router.post('/', createUser);
router.post('/verify', activateUser);

module.exports = router;
