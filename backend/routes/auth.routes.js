const express = require('express');
const router = express.Router();

const { handleLogin, handleLogout, handleRefreshToken } = require('../controllers/auth.controller');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');

router.post('/login', isLoggedOut, handleLogin);
router.post('/logout', isLoggedIn, handleLogout);
router.get('/refresh-token', handleRefreshToken);

module.exports = router;
