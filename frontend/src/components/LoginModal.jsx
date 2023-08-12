function LoginModal() {
	return (
		<>
			<button className="btn btn-secondary mx-5" onClick={() => window.my_modal_1.showModal()}>
				Login
			</button>
			<dialog id="my_modal_1" className="modal">
				<form method="dialog" className="modal-box p-8">
					<h2 className="text-xl font-semibold mb-4">Login</h2>
					<form action="/login" method="POST">
						<div className="form-control mb-4">
							<label htmlFor="email" className="label block text-sm font-medium text-gray-600">
								Email
							</label>
							<input type="email" id="email" name="email" className="input input-secondary w-full max-w-xs focus:border-none" />
						</div>
						<div className="form-control mb-4">
							<label htmlFor="password" className="label block text-sm font-medium text-gray-600">
								Password
							</label>
							<input type="text" id="password" name="password" className="input input-secondary w-full max-w-xs focus:border-none" />
						</div>
						<div className="modal-action">
							<button className="btn btn-secondary" type="submit">
								Sign In
							</button>
							<button className="btn" onClick={() => window.my_modal_1.close()}>
								Close
							</button>
						</div>
					</form>
				</form>
			</dialog>
		</>
	);
}

export default LoginModal;
