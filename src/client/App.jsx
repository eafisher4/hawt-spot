import React, { Component } from 'react';
// import Login from './components/Auth/Login';
import Register from './components/Auth/Register.jsx';
import Dashboard from './components/Dash/Dashboard.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loggedInUser: 'vartanov.s@gmail.com',
      songField: '',
      songQueryResults: [],
      savedSongs: [],
      friendField: '',
      friendQueryResults: [],
      savedFriends: [],
    };
    this.fetchSavedSongs = this.fetchSavedSongs.bind(this);
    this.saveSong = this.saveSong.bind(this);
    this.successfulLogin = this.successfulLogin.bind(this);
    this.searchSongs = this.searchSongs.bind(this);
    this.updateLoggedInUser = this.updateLoggedInUser.bind(this);
    this.updateSongField = this.updateSongField.bind(this);
    this.searchFriends = this.searchFriends.bind(this);
    this.updateFriendField = this.updateFriendField.bind(this);
  }

  fetchSavedSongs() {
    const { loggedInUser } = this.state;
    console.log(this.state);
    fetch('/users/find-saved-songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ username: 'vartanov.s@gmail.com' }),
    })
      .then(data => data.json())
      .then((data) => { console.log(data); this.setState({ savedSongs: data }); })
      .catch(err => console.error(err));
  }

  fetchSavedSongs() {
    const { loggedInUser } = this.state;
    console.log(this.state);
    fetch('/users/find-saved-songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ username: 'vartanov.s@gmail.com' }),
    })
      .then(data => data.json())
      .then((data) => { console.log(data); this.setState({ savedSongs: data }); })
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
    console.log(songData);
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
    console.log(friendField);
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

  render() {
    // Destructuring variables from state for rendering logic
    const {
      isLoggedIn, loggedInUser, songField, songQueryResults, savedSongs, friendField, friendQueryResults, savedFriends,
    } = this.state;
    // If !isLoggedIn, render Register component, passing in updateLoggedInUser successfulLogin handlers
    let renderComponent = <Register updateLoggedInUser={this.updateLoggedInUser} successfulLogin={this.successfulLogin} />;
    if (isLoggedIn) {
      // If user is logged in, render Dashboard component, passing it saveSong, searchSongs and updateSongFields handlers
      renderComponent = <Dashboard loggedInUser={loggedInUser} saveSong={this.saveSong} searchSongs={this.searchSongs} songField={songField} songQueryResults={songQueryResults} updateSongField={this.updateSongField} fetchSavedSongs={this.fetchSavedSongs} savedSongs={savedSongs} searchFriends={this.searchFriends} friendField={friendField} friendQueryResults={friendQueryResults} updateFriendField={this.updateFriendField} fetchSavedFriends={this.fetchSavedFriends} savedFriends={savedFriends} />;
    }
    return (
      <div>
        {renderComponent}
      </div>
    );
  }
}

export default App;
