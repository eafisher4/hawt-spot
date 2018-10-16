import React, { Component } from 'react';

import FriendQueryDisplay from './FriendQueryDisplay.jsx';

class FriendsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const {
      searchFriends, friendField, friendQueryResults, updateFriendField, savedFriends,
    } = this.props;
    const friendQueryArray = [];
    if (friendQueryResults.length) {
      friendQueryResults.forEach((friendQueryResultDetail, i) => friendQueryArray.push(<FriendQueryDisplay key={i} saveSong={saveSong} friendQueryResultDetail={friendQueryResultDetail} />));
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
          <strong>Your Friends:</strong>
          {friendQueryArray}
        </div>
      </div>
    );
  }
}
export default FriendsComponent;
