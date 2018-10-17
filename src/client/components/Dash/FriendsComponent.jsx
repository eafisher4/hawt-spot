import React, { Component } from 'react';

import FriendQueryDisplay from './FriendQueryDisplay.jsx';

class FriendsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Placeholder.
  }

  render() {
    const {
      saveFriend, searchFriends, friendField, friendQueryResults, updateFriendField, savedFriends, cancelSearchFriends, toggleFriendsSavedSongsDisplay, showFriendsSavedSongs,
    } = this.props;
    const friendQueryArray = [];
    if (friendQueryResults.length) {
      friendQueryResults.forEach((friendQueryResultDetail, i) => friendQueryArray.push(<FriendQueryDisplay key={i} saveFriend={saveFriend} friendQueryResultDetail={friendQueryResultDetail} />));
    }
    const friendList = [];
    // console.log(savedFriends);
    // if (savedFriends.length) {
    //   savedFriends.forEach((savedFriendDetail, i) => friendList.push(<FriendQueryDisplay key={i} savedFriendDetail={savedFriendDetail} />));
    // }
    let lastSavedFriendDetail = null;
    let friendSongList = [];
    let key = 0;
    for (let i = 0; i < savedFriends.length; i += 1) {
      if (lastSavedFriendDetail !== null && savedFriends[i].email !== lastSavedFriendDetail.email) {
        friendList.push(<FriendQueryDisplay key={key} index={key} savedFriendDetail={lastSavedFriendDetail} friendSongList={friendSongList} toggleFriendsSavedSongsDisplay={toggleFriendsSavedSongsDisplay} showFriendsSavedSongs={showFriendsSavedSongs} />);
        friendSongList = [];
        key += 1;
      }
      if (savedFriends[i].album !== null) {
        const {
          album, artist, title, url,
        } = savedFriends[i];
        friendSongList.push({
          album, artist, title, url,
        });
      }
      lastSavedFriendDetail = savedFriends[i];
    }
    // Push the last friend detail.
    if (savedFriends.length) {
      friendList.push(<FriendQueryDisplay key={key} index={key} savedFriendDetail={lastSavedFriendDetail} friendSongList={friendSongList} toggleFriendsSavedSongsDisplay={toggleFriendsSavedSongsDisplay} showFriendsSavedSongs={showFriendsSavedSongs} />);
    }

    return (
      <div>
        <div className="friends-header-container">
          <div className="friends-header">
            <strong>Search Friends: </strong>
            <input className="friend-search-field" name="friendSearchField" onChange={updateFriendField} type="text" value={friendField} />
            <input className="friend-search-submit" name="friendSearchSubmit" onClick={searchFriends} type="submit" />
          </div>
        </div>
        <div className="friends-list">
          <strong>Your Friends: </strong>
          <button onClick={cancelSearchFriends}>Cancel</button>
          { friendQueryArray.length ? friendQueryArray : friendList}
        </div>
      </div>
    );
  }
}
export default FriendsComponent;
