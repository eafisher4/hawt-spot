import React from 'react';

const FriendQueryDisplay = props => (
  <div className="song-query-container">
    <div className="song-query-button-container">
      {saveSong
        ? <button className="song-query-button" onClick={() => saveSong(title, artist, album, url)}>Add</button>
        : null}
      <a href={url} target="_blank">
        <button className="song-play-button">Play</button>
      </a>
    </div>
    <div className="song-query-detail">
        Song Title:
      {' '}
      <a href={url} target="_blank">{title}</a>
      <br />
        By:
      {' '}
      {artist}
      <br />
        Album:
      {' '}
      {album}
    </div>
  </div>
);
export default FriendQueryDisplay;
