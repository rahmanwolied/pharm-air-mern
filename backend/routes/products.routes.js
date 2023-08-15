const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { handleGetAllProducts, handleGetProduct } = require('../controllers/products.controller');

router.get('/', handleGetAllProducts);
router.get('/:id', handleGetProduct);

module.exports = router;
