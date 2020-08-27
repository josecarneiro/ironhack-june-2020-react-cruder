const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const serveFavicon = require('serve-favicon');
const cors = require('cors');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');

const deserializeUser = require('./middleware/deserialize-user');

const postRouter = require('./routes/post');
const authenticationRouter = require('./routes/authentication');

const mongoStore = connectMongo(expressSession);

const app = express();

app.set('trust proxy', 1);

app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));

// Mount necessary middleware

app.use(
  cors({
    origin: [process.env.CLIENT_APP_URL],
    credentials: true
  })
);
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: 'none'
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60
    })
  })
);
app.use(deserializeUser);

// Route Handlers

app.use('/post', postRouter);
app.use('/authentication', authenticationRouter);

// If no route handler is matched above,
// this will run
app.use('*', (request, response, next) => {
  const error = new Error('Page not found.');
  next(error);
});

// If next(error) was called previously,
// this will run
app.use((error, request, response, next) => {
  response.status(400);
  response.json({ error: { message: error.message } });
});

module.exports = app;
