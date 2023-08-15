import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signup, error, isLoading } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(email, password);
	};

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Sign up</h3>
			<div className="form-control w-full max-w-xs m-10">
				<input
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
			<div className="form-control w-full max-w-xs m-10">
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
			<button disabled={isLoading} className="btn btn-primary">
				Sign up
			</button>
			{error && <p className="text-red-500">{error}</p>}
		</form>
	);
};

export default Signup;
