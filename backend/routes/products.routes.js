const express = require('express');
const categoryRouter = express.Router();
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { handleGetAllProducts, handleGetProduct } = require('../controllers/products.controller');

categoryRouter.get('/', handleGetAllProducts);
categoryRouter.get('/:id', handleGetProduct);

module.exports = categoryRouter;
