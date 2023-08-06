const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const loginRouter = require('./routes/login.routes');
const registerRouter = require('./routes/register.routes');
const adminRouter = require('./routes/admin.routes');
const { getHome } = require('./controllers/home.controller');
const { getError } = require('./controllers/error.controller');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/admin', adminRouter);

app.get('/', getHome);

app.use(getError);

module.exports = app;
