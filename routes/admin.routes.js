const express = require('express');
const router = express.Router();
const { getAdminLogin, handleAdminLogin } = require('../controllers/admin.login.controller');

router.get('/', getAdminLogin);

router.post('/', handleAdminLogin);

module.exports = router;
