/* eslint-disable react/prop-types */
import BufferToImage from '../helpers/bufferToImage.helper';
import { useState } from 'react';

const ProductCard = ({ product }) => {
	const buffer = product.image.data.data;
	const base64String = BufferToImage(buffer);
	const [quantity, setQuantity] = useState(1);
	const [total, setTotal] = useState(0);

	const handleQuantityChange = (event) => {
		setQuantity(parseInt(event.target.value));
	};

	const handleAddToCart = () => {
		// Implement your add to cart logic here
		// This is just a placeholder example
		console.log(`Added ${quantity} ${product.name}(s) to the cart.`);
		setTotal(Number(product.price) * Number(quantity));
	};

	return (
		<div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
			<img src={base64String} alt={product.name} className="object-cover h-48 w-full" />
			<div className="p-4">
				<h2 className="text-gray-800 text-lg font-semibold">{product.name}</h2>
				<p className="text-gray-600 mt-2">{product.description}</p>
				<div className="mt-3 flex justify-between items-center">
					<span className="text-gray-800 font-bold">${product.price.toFixed(2)}</span>
					<div className="flex">
						<button className="text-gray-600 ml-2">View Details</button>
					</div>
				</div>
				<div className="mt-4 flex justify-between">
					<div>
						<label className="text-gray-700">Quantity:</label>
						<input
							type="number"
							min="1"
							value={quantity}
							onChange={handleQuantityChange}
							className="w-12 px-2 py-1 border rounded-lg text-center ml-2"
						/>
					</div>
					<button
						className="text-white bg-blue-500 px-3 py-1 rounded-full hover:bg-blue-600 transition duration-300"
						onClick={handleAddToCart}>
						Add to Cart
					</button>
				</div>
				<div className="mt-3 text-gray-700 font-bold">Total: ${total}</div>
			</div>
		</div>
	);
};

export default ProductCard;
