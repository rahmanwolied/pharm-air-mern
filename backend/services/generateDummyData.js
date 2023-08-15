// create dummy users
const { faker } = require('@faker-js/faker');

const generateUsers = (numUsers) => {
	const dummyUsers = [];

	for (let i = 0; i < numUsers; i++) {
		const sex = faker.person.sexType();
		const firstName = faker.person.firstName(sex);
		const lastName = faker.person.lastName();
		const phoneNumberFormats = ['+880-17##-######', '+880-18##-######', '+880-19##-######', '+880-16##-######'];

		const dummyUser = {
			isAdmin: i === 0,
			name: firstName + ' ' + lastName,
			phone: faker.phone.number(phoneNumberFormats[Math.floor(Math.random() * phoneNumberFormats.length)]),
			address: faker.location.streetAddress({ useFullAddress: true }),
			email: faker.internet.email({ firstName, lastName }),
			password: 'dummyPassword',
		};

		dummyUsers.push(dummyUser);
	}
	return dummyUsers;
};

const generateProducts = (numProducts) => {
	const dummyProducts = [];

	for (let i = 0; i < numProducts; i++) {
		
		const Name = faker.person.Name();
		
		

		const dummyProduct = {
			isAdmin: i === 0,
			name: Name,
			
		};

		dummyProducts.push(dummyProduct);
	}
	return dummyProducts;
};

module.exports = { generateUsers,generateProducts };
