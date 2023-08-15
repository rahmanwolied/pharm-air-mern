// importing modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

// importing routes and controllers
const userRouter = require('../routes/users.routes');
const registerRouter = require('../routes/register.routes');
const seedRouter = require('../routes/seed.routes');
const authRouter = require('../routes/auth.routes');
const productRouter = require('../routes/products.routes');

const { getHome } = require('../controllers/home.controller');
const { errorResponse } = require('../controllers/response.controller');
const categoryRouter = require('../routes/category.routes');

// creating app
const app = express();

// Rate limiting
const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 10, // 10 requests
	message: 'Too many requests from this IP, please try again in 1 minute',
});

// middlewares
app.use(cookieParser());
app.use(rateLimiter);
app.use(xssClean());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
// routes

app.use('/api/users', userRouter); //fetch user data
app.use('/api/seed', seedRouter); // generate dummy data
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/category', categoryRouter);
app.use('/register', registerRouter);

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
