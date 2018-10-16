// need to connect database to create a new session
const client = require('../db');

const sessionController = {};

// // need to check if session is logged in and verify if session is valid
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  const cookieId = req.cookies.ssid;
  client.query('SELECT * FROM sessions WHERE ssid = $1', [cookieId], (err, result) => {
    if (result.rows.length !== 0) {
      res.locals.email = cookieId;
      return next();
    } else {
      console.log(err);
    }
  });
};


sessionController.startSession = (req, res, next) => {
  // write code here
  const { cookieId } = res.locals;
  console.log('COOKIE ID ----->', cookieId);
  // create a new session and save the user information into psql table by using query and query array
  client.query('INSERT INTO sessions (ssid) VALUES ($1)', [cookieId], (err, queryResponse) => {
    if (err) {
      return res.status(500).json({ message: 'Error: Could Not Save Session', error: err });
    }
    // Todo - add variable to local storage
    return next();
  });
};

module.exports = sessionController;
