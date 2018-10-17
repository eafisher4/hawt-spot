const bcrypt = require('bcryptjs');
const client = require('../db');


module.exports = {
  addUser: (req, res, next) => {
    // pull out the user information from req.body
    const { hashPass } = res.locals;
    const {
      loginMethod, firstName, lastName, email, token,
    } = req.body;
    // create query text
    const queryText = 'INSERT INTO users ("login_method", "first_name", "last_name", "email", "hash_pass", "token") VALUES ($1, $2, $3, $4, $5, $6);';
    // create query array from user info
    const queryValues = [
      loginMethod,
      firstName,
      lastName,
      email,
      hashPass,
      token,
    ];
    // save the user information into psql table by using query and query array
    client.query(queryText, queryValues, (queryErr, queryResponse) => {
      if (queryErr) {
        return res.status(500).json({ message: 'Error: Could Not Save Information', error: queryErr });
      }
      // Todo - add variable to local storage
      res.locals.userEmail = email;
      return next();
    });
  },

  deleteUser: (req, res, next) => {
    // Pull out email from req.body
    const { email } = req.body;

    // Initialize deletion query text and array
    const deleteQuery = 'DELETE FROM users WHERE "email"=$1';
    const deleteArray = [email];

    // Issue query to delete user from array
    client.query(deleteQuery, deleteArray)
      .then((data) => {
        res.locals.data = data;
        if (!data.rowCount) return res.status(500).json({ message: 'Error: Could Not Find User To Delete' });
        return next();
      })
      .catch(delErr => res.status(500).json({ message: 'Error: Could Not Delete User', error: delErr }));
  },

  verifyUser: (req, res, next) => {
    const { accountEmail, accountPassword } = req.body;
    const queryText = 'SELECT * FROM users WHERE "email"=$1;';
    const queryArray = [accountEmail];
    client.query(queryText, queryArray, (queryErr, queryResponse) => {
      if (queryErr) {
        return res.status(500).json({ message: 'Error: Problem Verifying User ', error: queryErr });
      }

      if (bcrypt.compareSync(accountPassword, queryResponse.rows[0].hash_pass)) {
        res.locals.userVerification = true;
        res.locals.userEmail = queryResponse.rows[0].email;
        return next();
      }
      res.locals.userVerification = false;
      return next();
    });
  },

  saveSong: (req, res, next) => {
    const {
      title, artist, album, url, user,
    } = req.body;
    console.log('body ', req.body);
    const queryText = 'INSERT INTO user_saved_songs ("title", "artist", "album", "url", "user") VALUES ($1, $2, $3, $4, $5);';
    const queryValues = [
      title,
      artist,
      album,
      url,
      user,
    ];
    client.query(queryText, queryValues, (queryErr, queryResponse) => {
      if (queryErr) {
        return res.status(500).json({ message: 'Error: Problem Saving Song ', error: queryErr });
      }
      return next();
    });
  },

  findUserSongs: (req, res, next) => {
    const { username } = req.body;
    const queryText = 'SELECT * FROM user_saved_songs WHERE "user"=$1;';
    const queryValue = [username];
    client.query(queryText, queryValue, (queryErr, queryResponse) => {
      if (queryErr) {
        return res.status(500).json({ message: 'Error: Problem Verifying User ', error: queryErr });
      }
      const userSavedSongs = [];
      for (let i = 0; i < queryResponse.rows.length; i += 1) {
        // console.log(queryResponse.rows[i]);
        userSavedSongs.push(queryResponse.rows[i]);
      }
      res.locals.userSongs = userSavedSongs;
      return next();
    });
  },

  getFriends: (req, res, next) => {
    const { friendName } = req.body;
    const queryText = `SELECT * FROM users WHERE "email" ILIKE '%${friendName}%' OR "first_name" ILIKE '%${friendName}%' OR "last_name" ILIKE '%${friendName}%';`;
    console.log(queryText);
    client.query(queryText, (queryErr, queryResponse) => {
      if (queryErr) {
        return res.status(500).json({ message: 'Error: Problem Finding Friend ', error: queryErr });
      }
      const friends = [];
      for (let i = 0; i < queryResponse.rows.length; i += 1) {
        console.log(queryResponse.rows[i]);
        friends.push(queryResponse.rows[i]);
      }
      res.locals.friends = friends;
      return next();
    });
  },

  saveFriend: (req, res, next) => {
    // Pull out the user information from req.body.
    const { friendId } = req.body;
    const { userId } = req.cookies;
    // Create query text.
    const queryText = 'INSERT INTO friends ("user_id", "friend_id") VALUES ($1, $2);';
    // Create query array from user info.
    const queryValue = [
      parseInt(userId, 10),
      friendId,
    ];
    // Save the friend information into psql table by using query text and query array.
    client.query(queryText, queryValue, (queryErr, queryResponse) => {
      if (queryErr) {
        console.log(queryErr);
        return res.status(500).json({ message: 'Error: friend query', error: queryErr });
      }
      return next();
    });
  },

  findUserFriends: (req, res, next) => {
    const { userId } = req.cookies;
    const queryText = `SELECT * FROM friends JOIN users ON friend_id = users.user_id LEFT JOIN user_saved_songs ON users.email = user_saved_songs.user WHERE friends.user_id=${userId};`;
    const queryValue = [userId];
    client.query(queryText, (queryErr, queryResponse) => {
      if (queryErr) {
        return res.status(500).json({ message: 'Error: Problem Verifying User ', error: queryErr });
      }
      const userSavedFriends = [];
      for (let i = 0; i < queryResponse.rows.length; i += 1) {
        // console.log(queryResponse.rows[i]);
        userSavedFriends.push(queryResponse.rows[i]);
      }
      res.locals.userFriends = userSavedFriends;
      return next();
    });
  },
};
