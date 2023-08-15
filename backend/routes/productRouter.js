const express = require('express');
const productRouter = express.Router();
const { handleCreateProduct } = require('../controllers/product.controller');
const {validateProduct}=require("../validators/product");
const runValidation=require("../validators");

productRouter.post('/',validateProduct,runValidation,

handleCreateProduct);

module.exports =productRouter;
