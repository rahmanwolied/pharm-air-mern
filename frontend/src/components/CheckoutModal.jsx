import { useState } from 'react';
import { useCheckout } from '../hooks/useCheckout';

const CheckoutModal = ({ setSuccess }) => {
	const { checkout } = useCheckout();
	const [selectedMethod, setSelectedMethod] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleRadioChange = (event) => {
		setSelectedMethod(event.target.value);
	};

	const handleConfirm = async () => {
		setLoading(true);
		await checkout(selectedMethod, setError);
		setSuccess(true);
		setLoading(false);
	};

	return (
		<dialog id="payment_modal" className="modal">
			<form method="dialog" className="modal-box">
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
					<button className="btn btn-primary" onClick={handleConfirm}>
						Confirm
					</button>
				</div>
				{loading && <span className="loading loading-lg"></span>}
			</form>
		</dialog>
	);
};

export default CheckoutModal;
