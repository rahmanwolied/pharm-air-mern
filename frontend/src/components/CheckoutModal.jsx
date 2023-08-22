import { useState } from 'react';
import { useCheckout } from '../hooks/useCheckout';

const CheckoutModal = ({ setSuccess, setError }) => {
	const { checkout, error, success, isLoading } = useCheckout();
	const [selectedMethod, setSelectedMethod] = useState('');

	const handleRadioChange = (event) => {
		setSelectedMethod(event.target.value);
	};

	const handleConfirm = async () => {
		await checkout(selectedMethod, setError, setSuccess);
	};

	return (
		<dialog id="payment_modal" className="modal">
			<form method="dialog" className="modal-box" onSubmit={handleConfirm}>
				<h3 className="font-bold text-lg">Select Payment Method</h3>
				<div className="py-4">
					<label className="flex items-center space-x-2">
						<input type="radio" value="cod" checked={selectedMethod === 'cod'} onChange={handleRadioChange} />
						<span>Cash on Delivery</span>
					</label>
					<label className="flex items-center space-x-2">
						<input type="radio" value="bkash" checked={selectedMethod === 'bkash'} onChange={handleRadioChange} />
						<span>Bkash</span>
					</label>
				</div>
				<div className="modal-action">
					<button className="btn">Close</button>
					<button className="btn btn-primary" type="submit">
						Confirm
					</button>
				</div>
				{isLoading && <span className="loading loading-lg"></span>}
			</form>
		</dialog>
	);
};

export default CheckoutModal;
