const express = require('express');
const categoryRouter = express.Router();
const { handleCreateCategory, handleGetAllCategories, handleGetCategory } = require('../controllers/categoryController');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');

categoryRouter.post('/', isLoggedIn, isAdmin, handleCreateCategory);
categoryRouter.get('/', handleGetAllCategories);
categoryRouter.get('/:slug', handleGetCategory);

module.exports = categoryRouter;
