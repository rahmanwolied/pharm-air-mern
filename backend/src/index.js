const app = require('./app');
const { dbConnect } = require('../config/dbConnect');
const { serverPort } = require('./secret');

app.listen(serverPort, async () => {
	await dbConnect();
	console.log(`Server running on http://localhost:${serverPort}`);
});
