// Main Entry Point File
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const users = require('./routes/users');

const app = express();

// Configuration
// Access dotenv for PORT
require('dotenv').config();

// Body parser middleware
//app.use(bodyParser.urlencoded({ extended: false }));
//ADD PASSPORT HERE
app.use(bodyParser.json());


// Use route for /users
app.use('/users', users);

// Serve bundled index.html at root
app.use(express.static(path.resolve(__dirname, '../../dist/')));

// When deployed use the first PORT || localhost:3000
const PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, (err) => {
  if (err) console.error('Server Error - ', err);
  return console.log(`Server Listening on Port ${PORT}`);
});
