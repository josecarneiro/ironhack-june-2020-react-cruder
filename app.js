const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const serveFavicon = require('serve-favicon');
const cors = require('cors');

const postRouter = require('./routes/post');

const app = express();

app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));

// Mount necessary middleware

app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  })
);
app.use(express.json());

// Route Handlers

app.use('/post', postRouter);

// If no route handler is matched above,
// this will run
app.use('*', (request, response, next) => {
  const error = new Error('Page not found.');
  next(error);
});

// If next(error) was called previously,
// this will run
app.use((error, request, response, next) => {
  console.log(error);
  response.json({ error });
});

module.exports = app;
