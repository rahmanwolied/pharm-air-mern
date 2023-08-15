import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const LoginModal = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, error, isLoading } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(email, password);
	};

	return (
		<>
			<button className="btn btn-secondary mx-5" onClick={() => window.my_modal_1.showModal()}>
				Login
			</button>
			<dialog id="my_modal_1" className="modal">
				<form className="modal-box p-8" onSubmit={handleSubmit}>
					<h2 className="text-xl font-semibold mb-4">Login</h2>
					<div className="form-control mb-4">
						<label htmlFor="email" className="label block text-sm font-medium text-gray-600">
							Email
						</label>
						<input
							type="email"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							className="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div className="form-control mb-4">
						<label htmlFor="password" className="label block text-sm font-medium text-gray-600">
							Password
						</label>
						<input
							type="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							className="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div className="modal-action">
						<button disabled={isLoading} className="btn btn-secondary">
							Sign In
						</button>
						<button className="btn" onClick={() => window.my_modal_1.close()}>
							Close
						</button>
					</div>
					{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				</form>
			</dialog>
		</>
	);
};

export default LoginModal;
