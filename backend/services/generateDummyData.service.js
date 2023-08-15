// create dummy users
const { faker } = require('@faker-js/faker');

const generateUsers = (numUsers, image) => {
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
			image: image,
		};

		dummyUsers.push(dummyUser);
	}
	return dummyUsers;
};

const generateProducts = (image) => {
	const products = [
		{
			name: 'Montair',
			image: image,
			slug: 'montair',
			description: 'Relieve your allergies with Montair tablets.',
			price: 16,
			quantity: 798,
			sold: 0,
			shipping: 0,
			category: '64da55bb43d422a475297a6c', // Tablets
		},
		{
			name: 'Encilor',
			image: image,
			slug: 'encilor',
			description: 'Keep your stomach healthy with Encilor capsules.',
			price: 3,
			quantity: 397,
			sold: 0,
			shipping: 0,
			category: '64da55bb43d422a475297a6c', // Tablets
		},
		// ... (other products)
		{
			name: 'NeoStrip Bandage',
			image: image,
			slug: 'neostrip-bandage',
			description: 'Protect your wounds with NeoStrip Bandage.',
			price: 1,
			quantity: 780,
			sold: 0,
			shipping: 0,
			category: '64da5fa6ef07db4e94152026', // First Aid/Medical Supplies
		},
		{
			name: 'Camlodin',
			image: image,
			slug: 'camlodin',
			description: 'Camlodin capsules for maintaining cardiovascular health.',
			price: 5,
			quantity: 7,
			sold: 0,
			shipping: 0,
			category: '64da55bb43d422a475297a6c', // Tablets
		},
		{
			name: 'Moxaclav Forte',
			image: image,
			slug: 'moxaclav-forte',
			description: 'Moxaclav Forte for powerful antibiotic action.',
			price: 207,
			quantity: 0,
			sold: 0,
			shipping: 0,
			category: '64da5fd6ef07db4e9415202a', // Antibiotics
		},
	];
	return products;
};

module.exports = { generateUsers, generateProducts };
