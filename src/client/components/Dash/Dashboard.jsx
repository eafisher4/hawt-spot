import React from 'react';
import './Dashboard.css';

import SongsComponent from './SongsComponent.jsx';
import FriendsComponent from './FriendsComponent.jsx';

const Dashboard = (props) => {
  const {
    saveSong, searchSongs, songField, songQueryResults, updateSongField, fetchSavedSongs, savedSongs, searchFriends, friendField, friendQueryResults, updateFriendField, fetchSavedFriends, savedFriends,
  } = props;
  return (
    <div>
      <header>HAWT-SPOT DASHBOARD</header>
      <main>
        <SongsComponent saveSong={saveSong} searchSongs={searchSongs} songField={songField} songQueryResults={songQueryResults} updateSongField={updateSongField} fetchSavedSongs={fetchSavedSongs} savedSongs={savedSongs} />
        <FriendsComponent searchFriends={searchFriends} songField={friendField} friendQueryResults={friendQueryResults} updateFriendField={updateFriendField} fetchSavedFriends={fetchSavedFriends} savedFriends={savedFriends} />
      </main>
    </div>
  );
};

export default Dashboard;
