const slugify = require('slugify');

const Category = require('../models/category.model');

const createCategory = async (name) => {
	const newCategory = await Category.create({
		name: name,
		slug: slugify(name),
	});

	return newCategory;
};

const getAllCategories = async () => {
	return await Category.find({}).select('name slug').lean();
};

const getCategory = async (slug) => {
	return await Category.find({ slug: slug }).select('name slug').lean();
};

module.exports = { createCategory, getAllCategories, getCategory };
