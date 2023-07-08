const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;

exports.dbConnect = async () => {
	try {
		await mongoose.connect(dbURL);
		console.log('Connected to the database');

		mongoose.connection.on('error', (error) => console.error('Error occured. Database disconnected', error));
	} catch (error) {
		console.log(`Error occured: Couldn't connect to the database. ${error}`);
	}
};
