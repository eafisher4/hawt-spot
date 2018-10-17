const express = require('express');

// Import middleware for Password authentication and User storage
const passwordController = require('../controllers/passwordController.js');
const userController = require('../controllers/userController.js');

// Import middleware for Cookie Setup and Authentication
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js');

// Invoke Router to create router object for /users
const router = express.Router();

/**
 * Load User Model
 * @route   GET /users/test
 * @desc    Tests users route
 * @access  Public
 */
router.get('/test', (req, res) => {
  res.json({
    message: 'Test route successful',
  });
});

// Retrieve User from DB 'users' table by e-mail address
router.post('/findAccount',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.json({ userVerification: res.locals.userVerification, userEmail: res.locals.userEmail }));

// Save song to DB 'user_saved_songs' table
router.post('/save-song',
  userController.saveSong,
  (req, res) => res.json({ message: 'save successful' }));

// Retrieve all song objects from DB 'user_saved_songs' table for e-mail address
router.post('/find-saved-songs',
  userController.findUserSongs,
  (req, res) => {
    // console.log(res.locals.userSongs);
    res.json(res.locals.userSongs);
  });

// Retrieve all friend objects from DB 'friends' table for e-mail address
router.post('/find-saved-friends',
  userController.findUserFriends,
  (req, res) => {
    // console.log(res.locals.userSongs);
    res.json(res.locals.userFriends);
  });


/**
 * Register User to DB 'users' table
 * @route   POST users/register
 * @desc    Register User
 * @access  Public
 */
router.post('/register',
  passwordController.hashPassword,
  userController.addUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.status(200).json({ message: 'Welcome to HawtSpot!' }));

/**
 * Login User by email
 * @reoute  POST users/login
 * @desc    Login User
 * @access  Public
 */
// router.post('/login',
//   // userController.getUser,
//   passwordController.comparePassword,
//   cookieController.setSSIDCookie,
//   sessionController.startSession,
//   (req, res) => {
//     console.log(res.locals.cookieId)
//     res.status(200).json({});
//   });

/**
 * Check if User Cookie exists and if it matches with the session ID
 */
router.get('/session',
  // need to create a cookie controller that checks current cookie
  sessionController.isLoggedIn,
  (req, res) => res.json(res.locals.email));

router.delete('/',
  userController.deleteUser,
  (req, res) => res.status(200).json(res.locals));

router.post('/get-friends',
  userController.getFriends,
  (req, res) => res.status(200).json(res.locals.friends));

// Save friend to DB 'friends' table
router.post('/save-friend',
  userController.saveFriend,
  (req, res) => res.json({ message: 'save successful' }));

module.exports = router;
