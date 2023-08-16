import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

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
			console.log(cart.payload);
		};
		if (user) fetchCart();
	}, [user]);

	const cartItems = cart.items;
    if (!cartItems) return <div>Cart is Empty</div>;
    return (
        
    )
};

export default ShoppingCart;
