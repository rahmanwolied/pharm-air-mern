const ShoppingCart = require('../models/cart.model');
const Product = require('../models/product.model');
const createError = require('http-errors');

async function addToCart(userId, productId, quantity) {
	try {
		quantity = parseInt(quantity);
		const product = await Product.findById(productId);
		if (!product) {
			throw createError(404, 'Product not found');
		}

		// Check if the user has a shopping cart, if not, create one
		let cart = await ShoppingCart.findOne({ user: userId, isActive: true });
		if (!cart) {
			cart = await ShoppingCart.create({ user: userId, items: [] });
		}

		// Check if the product is already in the cart, if so, update the quantity
		const existingItem = cart.items.find((item) => item.productId.equals(product._id));
		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			cart.items.push({ productId: product._id, quantity });
		}

		// Update the total cost of the cart
		cart.total += Number(product.price) * quantity;

		await cart.save();
		return cart;
	} catch (error) {
		throw error;
	}
}

async function removeFromCart(userId, productId) {
	try {
		const product = await Product.findById(productId);
		if (!product) {
			throw createError(404, 'Product not found');
		}

		const cart = await ShoppingCart.findOne({ user: userId, isActive: true });
		console.log(cart);
		if (!cart) {
			throw createError(404, 'Cart not found');
		}

		const itemIndex = cart.items.findIndex((item) => item.productId.equals(product._id));
		if (itemIndex === -1) {
			throw createError(404, 'Product not found in cart');
		}

		const removedItem = cart.items.splice(itemIndex, 1)[0];

		// Update the total cost of the cart
		cart.total -= product.price * removedItem.quantity;

		await cart.save();

		return cart;
	} catch (error) {
		throw error;
	}
}

async function getCart(userId) {
	try {
		const cart = await ShoppingCart.findOne({ user: userId, isActive: true });
		if (!cart) {
			throw createError(404, 'Cart not found');
		}

		return cart;
	} catch (error) {
		throw error;
	}
}

async function getCarts(userId) {
	try {
		const carts = await ShoppingCart.find({ user: userId });
		return carts;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	addToCart,
	removeFromCart,
	getCart,
	getCarts,
};
