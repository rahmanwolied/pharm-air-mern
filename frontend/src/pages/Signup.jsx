import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const { signup, error, setError, isLoading, success } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setError('Passwords do not match.');
			return;
		}

		await signup(name, email, address, password);
	};

	if (success) {
		setTimeout(() => {
			navigate('/');
		}, 1000);
	}

	return (
		<div
			className="flex justify-center items-center h-screen text-justify uppercase
		">
			<form className="signup" onSubmit={handleSubmit}>
				<h1 className="flex justify-center text-green-600 text-4xl font-bold">Sign up</h1>

				<div className="form-control w-full max-w-xs my-10">
					<input
						type="text"
						placeholder="Name"
						onChange={(e) => setName(e.target.value)}
						value={name}
						className="input input-bordered w-full max-w-xs"
					/>
				</div>

				<div className="form-control w-full max-w-xs my-10">
					<input
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						className="input input-bordered w-full max-w-xs"
					/>
				</div>

				<div className="form-control w-full max-w-xs my-10">
					<input
						type="text"
						placeholder="Address"
						onChange={(e) => setAddress(e.target.value)}
						value={address}
						className="input input-bordered w-full max-w-xs"
					/>
				</div>

				<div className="form-control w-full max-w-xs my-10">
					<input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						className="input input-bordered w-full max-w-xs"
					/>
				</div>

				<div className="form-control w-full max-w-xs my-10">
					<input
						type="password"
						placeholder="Confirm Password"
						onChange={(e) => setPassword2(e.target.value)}
						value={password2}
						className="input input-bordered w-full max-w-xs"
					/>
				</div>

				<div className="flex justify-center items-center">
					<button disabled={isLoading} className="btn btn-primary hover:bg-green-600 flex justify-center items-center">
						Sign up
					</button>
				</div>
				{error && (
					<div className="alert alert-error my-4">
						<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{error}</span>
					</div>
				)}
				{success && (
					<div className="alert alert-success my-4">
						<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>Signup Successful</span>
					</div>
				)}
			</form>
		</div>
	);
};

export default Signup;
