const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const {
	handleGetAllProducts,
	handleGetProduct,
	handleCreateProduct,
	handleDeleteProduct,
	handleUpdateProduct,
} = require('../controllers/products.controller');

router.get('/', handleGetAllProducts);
router.get('/:id', handleGetProduct);
router.post('/', isLoggedIn, isAdmin, handleCreateProduct);
router.put('/:slug', isLoggedIn, isAdmin, handleUpdateProduct);
router.delete('/:slug', isLoggedIn, isAdmin, handleDeleteProduct);

module.exports = router;
