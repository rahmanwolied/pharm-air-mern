import { useAuthContext } from './useAuthContext';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useCheckout = () => {
	const { user } = useAuthContext();
	const { cart, dispatch } = useContext(CartContext);
	const [error, setError] = useState(null);

	const checkout = async (paymentMethod) => {
		const urlencoded = new URLSearchParams();
		urlencoded.append('cartId', cart._id);
		urlencoded.append('paymentMethod', paymentMethod);

		const response = await fetch('http://localhost:3001/api/checkout/', {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Bearer ' + user.refreshToken,
			},
			method: 'post',
			body: urlencoded,
		});
		const json = await response.json();
		cart.items = [];

		if (!response.ok) {
			setError(json.error);
		} else {
			dispatch({ type: 'UPDATE', payload: cart });
			console.log(json);
		}
	};

	return { checkout, error };
};
