/* eslint-disable no-unused-vars */
// importing library
const express = require('express');

const app = express();
const cors = require('cors');
const dbMongo = require('./db/mongoose');
const db = require('./db');
const { router } = require('./routes');

const corsOptions = {
  exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));

// Register:-first name last name email password and role
// Role:- admin and user
// Login for admin and user - email and password
// admin can add new user/admin , delete user/admin and update user/admin
// any user can change his own password

const port = 3000 || process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'),
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'),
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// home route
app.get('/', (req, res) => {
  res.send('Server running successfully');
});

app.use('/', router);

// defining port
app.listen(port, () => {
  console.log(`The application started successfuly on port ${port}`);
});
