const express = require('express');
const { handleLogin, handleLogout } = require('../controllers/auth.controller');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');
const router = express.Router();

router.post('/login', isLoggedOut, handleLogin);
router.post('/logout', isLoggedIn, handleLogout);

module.exports = router;
