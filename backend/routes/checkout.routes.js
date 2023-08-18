const express = require('express');
const { handleCheckout } = require('../controllers/checkout.controller');
const { isLoggedIn } = require('../middlewares/auth');
const router = express.Router();

router.use(isLoggedIn);
router.get('/', handleCheckout);

module.exports = router;
