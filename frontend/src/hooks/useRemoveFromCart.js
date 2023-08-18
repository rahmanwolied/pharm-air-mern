import { useAuthContext } from './useAuthContext';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useRemoveFromCart = () => {
	const { user } = useAuthContext();
	const { dispatch } = useContext(CartContext);
	const [error, setError] = useState(null);

	const removeFromCart = async (item) => {
		console.log(typeof item.productId);
		console.log(typeof item.productId.toString());

		let urlencoded = new URLSearchParams();
		urlencoded.append('productId', item.productId);

		const response = await fetch('http://localhost:3001/api/cart/remove', {
			headers: {
				Authorization: 'Bearer ' + user.refreshToken,
			},
			method: 'delete',
			body: urlencoded,
		});
		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		} else {
			dispatch({ type: 'UPDATE', payload: json.payload });
		}
	};

	return { removeFromCart, error };
};
