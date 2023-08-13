const express = require('express');
const { handleLogin, handleLogout } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/login', handleLogin);
router.post('/logout', handleLogout);

module.exports = router;
