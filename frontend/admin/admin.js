async function convertDate(originalDateString) {
	const date = new Date(originalDateString);

	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return date.toLocaleDateString('en-US', options);
}

async function getCustomer(customerId, user) {
	try {
		const response = await fetch(`http://localhost:3001/api/users/get/${customerId}`, {
			headers: {
				Authorization: 'Bearer ' + user.refreshToken,
			},
		});
		const json = await response.json();
		console.log(json);
		return json.payload.user;
	} catch (error) {
		console.error('Error fetching customer name:', error);
	}
}

async function fetchAllOrders(admin) {
	try {
		const response = await fetch('http://localhost:3001/api/orders/');
		const json = await response.json();
		const orders = json.payload.orders;
		const orderCount = orders.length;
		const recentOrdersElement = document.getElementById('recent-orders');

		orders.forEach(async (order) => {
			console.log(order);
			const date = await convertDate(order.createdAt);
			const row = document.createElement('tr');
			row.innerHTML = `
			<td>${order._id}</td>
			<td>${date}</td>
			<td>${order.user.name}</td>
			<td>$${order.total}</td>
			<td>${order.status}</td>
		  `;
			recentOrdersElement.appendChild(row);
		});

		const totalOrdersElement = document.getElementById('total-orders');
		totalOrdersElement.textContent = orderCount;
	} catch (error) {
		console.error('Error fetching total orders:', error);
	}
}

async function fetchAllProducts(user) {
	try {
		const response = await fetch('http://localhost:3001/api/products/', {
			headers: {
				Authorization: 'Bearer ' + user.refreshToken,
			},
		});
		const json = await response.json();
		const products = json.payload;
		const productsRemainingElement = document.getElementById('products-remaining');

		products.forEach((product) => {
			const row = document.createElement('tr');
			row.innerHTML = `
			<td>${product._id}</td>
			<td>${product.name}</td>
			<td>$${product.price}</td>
			<td>${product.quantity}</td>
		  `;
			productsRemainingElement.appendChild(row);
		});
	} catch (error) {
		console.error('Error fetching total products:', error);
	}
}

window.onload = function () {
	const user = JSON.parse(localStorage.getItem('user'));
	fetchAllOrders(user);
	fetchAllProducts(user);
	fetchRecentOrders(user);
	fetchTopSellingProducts(user);
};
