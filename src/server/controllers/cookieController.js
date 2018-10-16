const client = require('../db');

// create cookie controller object that we will export
const cookieController = {};
cookieController.setSSIDCookie = setSSIDCookie;

// creating the function that sets the cookie
function setSSIDCookie(req, res, next) {
  const { userEmail } = res.locals;
  console.log('email----->', userEmail);

  // gets the email that was just generated and sets cookie for that email
  client.query('SELECT * from users WHERE "email"=$1', [userEmail], (err, user) => {
    console.log('USER --------->', user);
    res.locals.cookieId = user.rows[0].email;
    console.log('user.email ------>', user.rows[0].email);
    res.cookie('ssid', user.rows[0].email, { httpOnly: true });
    return next();
  });
}

module.exports = cookieController;
