/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import BufferToImage from '../helpers/bufferToImage.helper';
import { useRemoveFromCart } from '../hooks/useRemoveFromCart';

const CartItem = ({ item, setSuccess }) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const { removeFromCart } = useRemoveFromCart();

	const handleRemove = async () => {
		console.log('Remove item', item);
		setLoading(true);
		await removeFromCart(item);
		setLoading(false);
		setSuccess(true);
	};

	useEffect(() => {
		console.log('CartItem item', item);
		const fetchItem = async (id) => {
			const response = await fetch(`http://localhost:3001/api/products/${id}`);
			const json = await response.json();
			const item = json.payload;

			if (item) {
				setProduct(item);
				setLoading(false);
			}
		};
		fetchItem(item.productId);
	}, [item]);

	if (loading)
		return (
			<div className="container mx-auto">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	if (product) {
		let base64String = null;
		if (product.image) {
			base64String = BufferToImage(product.image.data.data);
		}
		return (
			<div className="flex items-center p-4 border-b border-gray-200">
				<img
					src={base64String ? base64String : 'public\\assets\\products\\default_image_1.jpg'}
					alt={product.name}
					className="w-16 h-16 object-cover mr-4"
				/>
				<div className="flex-grow">
					<h2 className="text-lg font-semibold">{product.name}</h2>
					<p className="text-gray-600">{product.description}</p>
					<div className="text-gray-700">Price: ${product.price}</div>
					<div className="text-gray-700">Quanity: {item.quantity}</div>
				</div>
				<div>
					<button className="btn btn-error text-white" onClick={handleRemove}>
						{loading ? <span className="loading loading-spinner loading-sm"></span> : 'Remove'}
					</button>
				</div>
			</div>
		);
	}
};

export default CartItem;
