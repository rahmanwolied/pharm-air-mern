const express = require('express');
const runValidation = require('../validators');
const {validateCategory} = require('../validators/category');
const categoryRouter = express.Router();
const { handleCreateCategory } = require('../controllers/categoryController');


categoryRouter.post('/',validateCategory,
//runValidation,
handleCreateCategory);







module.exports = categoryRouter;