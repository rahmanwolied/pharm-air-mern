const express = require('express');
const productRouter = express.Router();
const { handleCreateProduct } = require('../controllers/product.controller');
const {validateProduct}=require("../validators/product");
const runValidation=require("../validators");

//create a product
productRouter.post('/',validateProduct,runValidation,

handleCreateProduct);


//get all products
productRouter.get('/',handleGetProducts);
//get single product
productRouter.get('/:slug',handleGetProduct);

module.exports =productRouter;
