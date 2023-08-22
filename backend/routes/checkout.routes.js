const express = require('express');
const { handleCheckout } = require('../controllers/checkout.controller');
const { isLoggedIn, isVerified } = require('../middlewares/auth');
const router = express.Router();

router.post('/', isLoggedIn, isVerified, handleCheckout);

module.exports = router;
