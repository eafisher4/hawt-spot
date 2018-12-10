import React from 'react';
import './Dashboard.css';

import SongsComponent from './SongsComponent.jsx';
import FriendsComponent from './FriendsComponent.jsx';

const Dashboard = (props) => {
  const {
    saveSong, searchSongs, songField, songQueryResults, updateSongField, fetchSavedSongs, savedSongs, saveFriend, searchFriends, friendField, friendQueryResults, updateFriendField, fetchSavedFriends, savedFriends, cancelSearchSongs, cancelSearchFriends, toggleFriendsSavedSongsDisplay, showFriendsSavedSongs, logOutUser,
  } = props;

  return (
    <div>
      <div className="header-container">
        <header>HAWT-SPOT DASHBOARD</header>
        <button className="button-styler" onClick={logOutUser}>Log Out</button>
        <div className="header-right">
        </div>
      </div>
      <main>
        {/* Renders the Songs on the left side */}
        <SongsComponent 
          saveSong={saveSong} 
          searchSongs={searchSongs} 
          songField={songField} 
          songQueryResults={songQueryResults} 
          updateSongField={updateSongField} 
          fetchSavedSongs={fetchSavedSongs} 
          savedSongs={savedSongs} 
          savedFriends={savedFriends}
          cancelSearchSongs={cancelSearchSongs} 
        />
        {/* Renders the Friends list on the right side */}
        <FriendsComponent 
          saveFriend={saveFriend} 
          searchFriends={searchFriends} 
          songField={friendField} 
          friendQueryResults={friendQueryResults} 
          updateFriendField={updateFriendField} 
          fetchSavedFriends={fetchSavedFriends} 
          savedFriends={savedFriends} 
          cancelSearchFriends={cancelSearchFriends} 
          toggleFriendsSavedSongsDisplay={toggleFriendsSavedSongsDisplay} 
          showFriendsSavedSongs={showFriendsSavedSongs} 
        />
      </main>
    </div>
  );
};

export default Dashboard;
