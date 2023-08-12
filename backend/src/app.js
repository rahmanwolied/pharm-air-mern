// importing modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const createError = require('http-errors');

// importing routes and controllers
const userRouter = require('../routes/users.routes');
const loginRouter = require('../routes/login.routes');
const registerRouter = require('../routes/register.routes');
const adminRouter = require('../routes/admin.routes');
const seedRouter = require('../routes/seed.routes');
const { getHome } = require('../controllers/home.controller');
const Admin = require('../models/admin.model');
const { errorResponse } = require('../controllers/response.controller');

// creating app
const app = express();

// Rate limiting
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 10, // 10 requests
	message: 'Too many requests from this IP, please try again in 1 minute',
});

// middlewares
app.use(limiter);
app.use(xssClean());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
// routes

app.use('/api/users', userRouter); //fetch user data
app.use('/api/seed', seedRouter); // generate dummy data
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/admin', adminRouter);

app.get('/', getHome);

// 404 error handler
app.use((req, res, next) => {
	next(createError(404, 'This route does not exist'));
});

// final error handler which catches all errors
app.use((err, req, res, next) => {
	return errorResponse(res, {
		statusCode: err.statusCode,
		message: err.message,
	});
});

module.exports = app;
