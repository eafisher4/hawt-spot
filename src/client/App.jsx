import React, { Component } from 'react';
// import Login from './components/Auth/Login';
import Register from './components/Auth/Register.jsx';
import Dashboard from './components/Dash/Dashboard.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loggedInUser: '',
      songField: '',
      songQueryResults: [],
      savedSongs: [],
      friendField: '',
      friendQueryResults: [],
      savedFriends: [],
      showFriendsSavedSongs: [],
    };
    this.fetchSavedSongs = this.fetchSavedSongs.bind(this);
    this.saveSong = this.saveSong.bind(this);
    this.successfulLogin = this.successfulLogin.bind(this);
    this.searchSongs = this.searchSongs.bind(this);
    this.updateLoggedInUser = this.updateLoggedInUser.bind(this);
    this.updateSongField = this.updateSongField.bind(this);
    this.searchFriends = this.searchFriends.bind(this);
    this.updateFriendField = this.updateFriendField.bind(this);
    this.saveFriend = this.saveFriend.bind(this);
    this.cancelSearchSongs = this.cancelSearchSongs.bind(this);
    this.cancelSearchFriends = this.cancelSearchFriends.bind(this);
    this.toggleFriendsSavedSongsDisplay = this.toggleFriendsSavedSongsDisplay.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  componentDidMount() {
    // check if cookie exists and if it does, switch the isLoggedIn to true
    fetch('/users/session')
      .then(data => data.json())
      .then((data) => {
        this.successfulLogin(data);
        this.fetchSavedSongs();
      })
      .catch(err => console.error(err));
  }

  fetchSavedSongs() {
    const { loggedInUser } = this.state;

    fetch('/users/find-saved-songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ username: loggedInUser }),
    })
      .then(data => data.json())
      .then((data) => { this.setState({ savedSongs: data }); })
      .catch(err => console.error(err));
  }

  fetchSavedFriends() {
    const { loggedInUser } = this.state;

    fetch('/users/find-saved-friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ username: loggedInUser }),
    })
      .then(data => data.json())
      .then((savedFriends) => {
        let lastSavedFriendDetail = null;
        let count = 0;
        for (let i = 0; i < savedFriends.length; i += 1) {
          if (lastSavedFriendDetail !== null && savedFriends[i].email !== lastSavedFriendDetail.email) {
            count += 1;
          }
          lastSavedFriendDetail = savedFriends[i];
        }
        this.setState({ savedFriends, friendsSavedSongsDisplay: Array(count).fill(false) });
      })
      .catch(err => console.error(err));
  }

  saveSong(title, artist, album, url) {
    const { loggedInUser } = this.state;
    const songData = {
      user: loggedInUser,
      title,
      artist,
      album,
      url,
    };
    fetch('/users/save-song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(songData),
    })
      .then(data => this.setState({ songQueryResults: [] }))
      .then(data => this.fetchSavedSongs())
      .catch(err => console.error(err));
  }

  saveFriend(friendId) {
    const friendData = {
      friendId,
    };
    fetch('/users/save-friend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(friendData),
    })
      .then(data => this.setState({ friendQueryResults: [] }))
      .then(data => this.fetchSavedFriends())
      .catch(err => console.error(err));
  }

  searchSongs() {
    const { songField } = this.state;
    fetch('/get-songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ songName: songField }),
    })
      .then(data => data.json())
      .then(data => this.setState({
        songQueryResults: data,
        songField: '',
      }))
      .catch(err => console.error(err));
  }

  searchFriends() {
    const { friendField } = this.state;
    fetch('/users/get-friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ friendName: friendField }),
    })
      .then(data => data.json())
      .then(data => this.setState({
        friendQueryResults: data,
        friendField: '',
      }))
      .catch(err => console.error(err));
  }

  successfulLogin(email) {
    this.setState({ ...this.state, isLoggedIn: true, loggedInUser: email });
    this.fetchSavedSongs();
    this.fetchSavedFriends();
  }

  updateLoggedInUser(firstName) {
    this.setState({ ...this.state, loggedInUser: firstName });
  }

  updateSongField(event) {
    this.setState({ songField: event.target.value });
  }

  updateFriendField(event) {
    this.setState({ friendField: event.target.value });
  }

  cancelSearchSongs() {
    this.setState({ songQueryResults: [] });
  }

  cancelSearchFriends() {
    this.setState({ friendQueryResults: [] });
  }

  toggleFriendsSavedSongsDisplay(index) {
    const { showFriendsSavedSongs } = this.state;
    showFriendsSavedSongs[index] = !showFriendsSavedSongs[index];
    this.setState({ showFriendsSavedSongs });
  }

  logOutUser() {
    const { loggedInUser } = this.state;
    fetch('/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ email: loggedInUser }),
    })
      .then(data => data.json())
      .then(data => this.setState({
        isLoggedIn: false,
        loggedInUser: '',
      }))
      .catch(err => console.error(err));
  }

  render() {
    // Destructuring variables from state for rendering logic
    const {
      isLoggedIn, loggedInUser, songField, songQueryResults, savedSongs, friendField, friendQueryResults, savedFriends, showFriendsSavedSongs,
    } = this.state;
    // If !isLoggedIn, render Register component, passing in updateLoggedInUser successfulLogin handlers
    let renderComponent = (
      <Register
        updateLoggedInUser={this.updateLoggedInUser}
        successfulLogin={this.successfulLogin}
      />
    );
    if (isLoggedIn) {
      // If user is logged in, render Dashboard component, passing it saveSong, searchSongs and updateSongFields handlers
      renderComponent = (
        <Dashboard
          loggedInUser={loggedInUser}
          saveSong={this.saveSong}
          searchSongs={this.searchSongs}
          songField={songField}
          songQueryResults={songQueryResults}
          updateSongField={this.updateSongField}
          fetchSavedSongs={this.fetchSavedSongs}
          savedSongs={savedSongs}
          saveFriend={this.saveFriend}
          searchFriends={this.searchFriends}
          friendField={friendField}
          friendQueryResults={friendQueryResults}
          updateFriendField={this.updateFriendField}
          fetchSavedFriends={this.fetchSavedFriends}
          savedFriends={savedFriends}
          cancelSearchSongs={this.cancelSearchSongs}
          cancelSearchFriends={this.cancelSearchFriends}
          toggleFriendsSavedSongsDisplay={this.toggleFriendsSavedSongsDisplay}
          showFriendsSavedSongs={showFriendsSavedSongs}
          logOutUser={this.logOutUser}
        />
      );
    }
    return (
      <div>
        {renderComponent}
      </div>
    );
  }
}

export default App;
