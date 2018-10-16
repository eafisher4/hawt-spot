import React, { Component } from 'react';

import SongQueryDisplay from './SongQueryDisplay.jsx';

class SongsComponent extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   const { fetchSavedSongs } = this.props;
  //   fetchSavedSongs();
  // }

  render() {
    const {
      saveSong, searchSongs, songField, songQueryResults, updateSongField, savedSongs,
    } = this.props;
    const songQueryArray = [];
    if (songQueryResults.length) {
      songQueryResults.forEach((songQueryResultDetail, i) => songQueryArray.push(<SongQueryDisplay key={i} saveSong={saveSong} songQueryResultDetail={songQueryResultDetail} />));
    }
    const songList = [];
    console.log(savedSongs);
    if (savedSongs.length) {
      savedSongs.forEach((savedSongDetail, i) => songList.push(<SongQueryDisplay key={i} savedSongDetail={savedSongDetail} />));
    }

    return (
      <div>
        <div className="songs-header-container">
          <div className="songs-header">
            <strong>Search Songs: </strong>
            <input className="song-search-field" name="songSearchField" onChange={updateSongField} type="text" value={songField} />
            <input className="song-search-submit" name="songSearchSubmit" onClick={searchSongs} type="submit" />
          </div>
        </div>
        <div className="songs-list">
          <strong>Your Songs:</strong>
          {songQueryArray}
          {songList}
        </div>
      </div>
    );
  }
}

export default SongsComponent;
