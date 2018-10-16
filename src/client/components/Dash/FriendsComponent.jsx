import React, { Component } from 'react';

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
    const songQueryArray = [];
    // if (songQueryResults.length) {
    //   songQueryResults.forEach((songQueryResultDetail, i) => songQueryArray.push(<SongQueryDisplay key={i} saveSong={saveSong} songQueryResultDetail={songQueryResultDetail} />));
    // }
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
        </div>
      </div>
    );
  }
}
export default FriendsComponent;
