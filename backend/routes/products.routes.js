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
productRouter.post('/', isLoggedIn, isAdmin, handleCreateProduct);
productRouter.put('/:slug', isLoggedIn, isAdmin, handleUpdateProduct);
productRouter.delete('/:slug', isLoggedIn, isAdmin, handleDeleteProduct);

module.exports = router;
