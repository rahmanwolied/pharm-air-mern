import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const [success, setSuccess] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = async (name, email, address, password) => {
		setIsLoading(true);
		setError(null);
		setSuccess(null);

		const response = await fetch('http://localhost:3001/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, address, password }),
		});

		const json = await response.json();
		if (!response.ok) {
			setIsLoading(false);
			setError(json.error);
		}

		if (response.ok) {
			// save the user to local storage
			localStorage.setItem('user', JSON.stringify(json.payload));
			// dispatch the user to the reducer
			dispatch({ type: 'LOGIN', payload: json.payload });
			setIsLoading(false);
			setSuccess(true);
		}
	};

	return { signup, error, setError, isLoading, success };
};
