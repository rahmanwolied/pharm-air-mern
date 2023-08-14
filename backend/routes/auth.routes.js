const express = require('express');
const { handleLogin, handleLogout, handleRefreshToken } = require('../controllers/auth.controller');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');
const router = express.Router();

router.post('/login', isLoggedOut, handleLogin);
router.post('/logout', isLoggedIn, handleLogout);
router.get('/refresh-token', handleRefreshToken);

module.exports = router;
