const express = require('express');
const { handleAddToCart, handleRemoveFromCart, handleGetCart, handleGetAllCarts } = require('../controllers/cart.controller');
const { isLoggedIn } = require('../middlewares/auth');
const router = express.Router();

router.use(isLoggedIn);
router.get('/', handleGetCart);
router.get('/all', handleGetAllCarts);
router.post('/add', handleAddToCart);
router.post('/remove', handleRemoveFromCart);

module.exports = router;
