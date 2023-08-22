/* eslint-disable react/prop-types */
import BufferToImage from '../helpers/bufferToImage.helper';
import { useState } from 'react';
import { useAddToCart } from '../hooks/useAddToCart';
import { useAuthContext } from '../hooks/useAuthContext';

const ProductCard = ({ product }) => {
	const { user } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [total, setTotal] = useState(product.price);
	const [success, setSuccess] = useState(false);

	const { addToCart } = useAddToCart();

	let base64String = null;
	if (product.image) {
		base64String = BufferToImage(product.image.data.data);
	}

	const handleQuantityChange = (event) => {
		setQuantity(parseInt(event.target.value));
		setTotal(Number(product.price) * Number(event.target.value));
	};

	const handleAddToCart = async () => {
		setLoading(true);
		if (!user) {
			setError('Please log in to add items to your cart.');
			setLoading(false);
			return;
		}
		await addToCart(product._id, quantity, setError);

		console.log(`Added ${quantity} ${product.name}(s) to the cart.`);
		setTotal(Number(product.price) * Number(quantity));
		setLoading(false);
		setSuccess(true);
	};

	return (
		<div>
			<div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
				<img
					src={base64String ? base64String : 'assets\\products\\default_image_1.jpg'}
					alt={product.name}
					className="object-cover h-48 w-full"
				/>
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
							disabled={loading}
							className="text-white bg-blue-500 px-3 py-1 rounded-full hover:bg-blue-600 transition duration-300"
							onClick={handleAddToCart}>
							Add to Cart
						</button>
					</div>
					<div className="mt-3 text-gray-700 font-bold">Total: ${total}</div>
				</div>
			</div>
			{error && (
				<div className="my-3 alert alert-error">
					<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{error}</span>
				</div>
			)}
			{loading && <span className="loading loading-dots loading-md mx-auto"></span>}
			{success && (
				<div className="alert alert-success">
					<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>Added to cart</span>
				</div>
			)}
		</div>
	);
};

export default ProductCard;
