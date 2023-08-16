/* eslint-disable react/prop-types */
const CartItem = ({ item }) => {
	return (
		<div className="flex items-center p-4 border-b border-gray-200">
			<img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
			<div className="flex-grow">
				<h2 className="text-lg font-semibold">{item.name}</h2>
				<p className="text-gray-600">{item.description}</p>
			</div>
			<div className="text-gray-700">${item.price.toFixed(2)}</div>
		</div>
	);
};

export default CartItem;
