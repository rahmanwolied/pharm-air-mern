/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useReducer, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE':
			return {
				cart: action.payload,
			};

		default:
			return state;
	}
};

export const CartContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, { cart: null });
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchCart = async () => {
			const response = await fetch('http://localhost:3001/api/cart/', {
				headers: {
					Authorization: 'Bearer ' + user.refreshToken,
				},
			});
			const json = await response.json();
			const cart = json.payload;
			if (json) {
				console.log('cart:', cart);
				console.log('cartItems:', cart.items);
				dispatch({
					type: 'UPDATE',
					payload: cart,
				});
			}
		};
		fetchCart();
	}, [user]);

	console.log('CartContext state', state);

	return <CartContext.Provider value={{ ...state, dispatch }}>{children}</CartContext.Provider>;
};
