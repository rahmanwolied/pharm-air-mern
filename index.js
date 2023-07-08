require('dotenv').config();
const app = require('./app');
const { dbConnect } = require('./config/dbConnect');
const port = process.env.PORT || 3000;

app.listen(port, async () => {
	console.log(`Server running on http://localhost:${port}`);
	await dbConnect();
});
