import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import SuccessAlert from '../components/SuccessAlert';

const ShoppingCart = () => {
	const { cart } = useContext(CartContext);
	const [success, setSuccess] = useState(false);

	if (cart === null) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
			{cart.items.length === 0 ? (
				<div className="text-gray-600">Your cart is empty.</div>
			) : (
				<div>
					{cart.items.map((item) => (
						<CartItem key={item.productId} item={item} setSuccess={setSuccess} />
					))}
				</div>
			)}
			{success && <SuccessAlert message="Item removed from cart." />}
			<div>
				<div className="text-gray-700 font-bold">Total: ${cart.total.toFixed(2)}</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
