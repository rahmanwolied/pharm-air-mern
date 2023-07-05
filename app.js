const express = require('express');
const app = express();
const loginRouter = require('./routes/login.routes');
const registerRouter = require('./routes/register.routes');
const cors = require('cors');
const mongoose = require('mongoose');

const dbURL = process.env.DB_URL;

mongoose
	.connect(dbURL)
	.then(() => {
		console.log('database connected');
	})
	.catch((error) => {
		console.log(`error occured: ${error}`);
		process.exit(1);
	});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.get('/', (req, res) => {
	res.statusCode = 200;
	res.sendFile(__dirname + '/views/index.html');
});

app.use((req, res) => {
	res.statusCode = 404;
	res.send('404, not found');
});

module.exports = app;
