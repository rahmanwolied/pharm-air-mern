import { useAuthContext } from './useAuthContext';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useCheckout = () => {
	const { user } = useAuthContext();
	const { cart, dispatch } = useContext(CartContext);
	const [isLoading, setIsLoading] = useState(null);

	const checkout = async (paymentMethod, setError, setSuccess) => {
		setIsLoading(true);
		setSuccess(false);
		setError(null);

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

		if (!response.ok) {
			setIsLoading(false);
			setError(json.error);
		} else {
			cart.items = [];
			setIsLoading(false);
			setSuccess(true);
			dispatch({ type: 'UPDATE', payload: cart });
			console.log('success', json);
		}
	};

	return { checkout, isLoading };
};
