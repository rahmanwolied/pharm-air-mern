const Product = require('../models/product.model');
const { findWithId } = require('./findItem.service');

const getAllProducts = async () => {
	return await Product.find({});
};

const getProduct = async (id) => {
	return findWithId(Product, id);
};

module.exports = { getAllProducts, getProduct };
