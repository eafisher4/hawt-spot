import React from 'react';
import SongQueryDisplay from './SongQueryDisplay.jsx';

const FriendQueryDisplay = (props) => {
  const {
    user_id, first_name, last_name, email,
  } = props.friendQueryResultDetail ? props.friendQueryResultDetail : props.savedFriendDetail;
  const {
    saveFriend, friendSongList, toggleFriendsSavedSongsDisplay, index, showFriendsSavedSongs,
  } = props;
  const songList = [];
  // console.log(savedSongs);
  // console.log(props.saveSong);
  if (friendSongList !== undefined && friendSongList.length) {
    friendSongList.forEach((savedSongDetail, i) => songList.push(<SongQueryDisplay key={i} savedSongDetail={savedSongDetail} />));
  }

  return (
    <div>
      <div className="song-query-container">
        <div className="song-query-button-container">
          <button className="song-query-button" onClick={() => toggleFriendsSavedSongsDisplay(index)}>Show</button>
        </div>
        <div className="song-query-detail">
        First Name:
          {' '}
          {first_name}
          <br />
        Last Name:
          {' '}
          {last_name}
          <br />
        Email:
          {' '}
          {email}
        </div>
      </div>
      {showFriendsSavedSongs !== undefined && showFriendsSavedSongs[index]
        ? songList
        : null}
    </div>
  );
};
export default FriendQueryDisplay;
