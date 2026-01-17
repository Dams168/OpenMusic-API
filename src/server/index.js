// require('dotenv').config(); // uncomment this line if you are not using ES module

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ErrorHandler from '../middlewares/error.js';
import routes from '../routes/index.js';

const app = express();

app.use(express.json());

//routes
app.use('/', routes);

//test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//middlewares
app.use(ErrorHandler);

export default app;
