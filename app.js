const express = require('express');
const app = express();
const loginRouter = require('./routes/login.routes');
const registerRouter = require('./routes/register.routes');
const cors = require('cors');
const mongoose = require('mongoose');
const { getHome } = require('./controllers/home.controller');
const { getError } = require('./controllers/error.controller');

const dbURL = process.env.DB_URL;

// connecting to the database

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

app.get('/', getHome);

app.use(getError);

module.exports = app;
