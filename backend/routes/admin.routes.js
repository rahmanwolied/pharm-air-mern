const express = require('express');
const router = express.Router();
const { getAdminLogin, handleAdminLogin } = require('../controllers/admin.login.controller');

router.get('/login', getAdminLogin);

router.post('/login', handleAdminLogin);

module.exports = router;
