import { useContext } from 'react';
import { useAuthContext } from './useAuthContext';
import { CartContext } from '../context/CartContext';

export const useAddToCart = () => {
	const { user } = useAuthContext();
	const { dispatch } = useContext(CartContext);

	const addToCart = async (productId, quantity, setError) => {
		console.log(user);

		if (user === null) {
			setError('You must be logged in to add to cart');
			return;
		}

		const response = await fetch('http://localhost:3001/api/cart/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.refreshToken,
			},
			body: JSON.stringify({ productId, quantity }),
		});

		const json = await response.json();
		const cart = json.payload;

		if (!response.ok) {
			setError(json.error);
		}

		if (response.ok) {
			setError(null);
			console.log(json);
			dispatch({
				type: 'UPDATE',
				payload: cart,
			});
		}
	};

	return { addToCart };
};
