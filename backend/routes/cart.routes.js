const express = require('express');
const { handleAddToCart, handleRemoveFromCart, handleGetCart, handleGetAllCarts } = require('../controllers/cart.controller');
const { isLoggedIn } = require('../middlewares/auth');
const router = express.Router();

router.get('/', isLoggedIn, handleGetCart);
router.get('/all', isLoggedIn, handleGetAllCarts);
router.post('/add', isLoggedIn, handleAddToCart);
router.post('/remove', isLoggedIn, handleRemoveFromCart);

module.exports = router;
