import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	
	const { signup, error, isLoading } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(name,email,address, password);
	};

	return (
		<div className="flex justify-center items-center h-screen text-justify uppercase
		">
			<form className="signup" onSubmit={handleSubmit}>

           
			<h1 className="flex justify-center text-green-600 text-4xl font-bold">Sign up</h1>

            
			<div className="form-control w-full max-w-xs m-10">
				<input
					type="text"
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
					value={name}
					className="input input-bordered w-full max-w-xs"
				/>
			</div>


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
					type="text"
					placeholder="Address"
					onChange={(e) => setAddress(e.target.value)}
					value={address}
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

			<div className='flex justify-center items-center'>
			<button disabled={isLoading} className="btn btn-primary hover:bg-green-600 flex justify-center items-center">
				Sign up
			</button>
			{error && <p className="text-red-500">{error}</p>}
			</div>
			
		</form>

		</div>
		
	);
};

export default Signup;
