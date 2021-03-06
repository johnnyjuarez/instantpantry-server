require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

// Import routes
const authRouter = require('./auth/auth-router.js');
const userRouter = require('./user/user-router');
const categoryRouter = require('./category/category-router');
const itemsRouter = require('./items/items-router');

// describe app to use express
const app = express();

// set morgan option based on node environment
const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

// set app options and basic security
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/items', itemsRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { mesage: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;