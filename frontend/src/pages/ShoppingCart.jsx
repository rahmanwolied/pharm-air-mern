import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import CartItem from '../components/CartItem';

const ShoppingCart = () => {
	const { user } = useAuthContext();
	const [cart, setCart] = useState(null);

	useEffect(() => {
		const fetchCart = async () => {
			const response = await fetch('http://localhost:3001/api/cart/', {
				headers: {
					Authorization: 'Bearer ' + user.refreshToken,
				},
			});
			const cart = await response.json();
			setCart(cart.payload);
		};
		fetchCart();
	}, [user]);

	if (cart === null) {
		return <div>Loading...</div>;
	}

	console.log('cart:', cart);
	console.log('cartItems:', cart.items);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
			{cart.items.length === 0 ? (
				<div className="text-gray-600">Your cart is empty.</div>
			) : (
				cart.items.map((item) => <CartItem key={item.id} item={item} />)
			)}
		</div>
	);
};

export default ShoppingCart;
