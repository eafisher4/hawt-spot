const client = require('../db');

module.export = {
addFriend: (req, res, next) => {
	//pull out the user information from req.body
	const { fid, user_id, friend_id } = req.body;
	//create query text
	const friendsTable = 'CREATE TABLE friends ("fid" SERIAL PRIMARY KEY, "user_id" INTEGER REFERENCES "users", "friend_id" INTEGER REFERENCES "users" )';
	const queryFriends = `INSERT INTO users ("fid", "user_id", "friend_id") VALUES ($1, $2, $3);`;
	//create query array from user info
	const friend_query = [
    fid,
    user_id,
    friend_id,
	];
	//save the friend information into psql table by using query and query array
	client.query(queryFriends, queryFriends, (queryErr, queryResponse) => {
		if (queryErr) {
			return res.status(500).json({ message: 'Error: friend query', error: queryErr });
		}
		return next();
		});
	},
	findUserFriends: (req, res, next) => {
    const { username } = req.body;
    
  }
};