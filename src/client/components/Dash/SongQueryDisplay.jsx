import React from 'react';
import Modal from 'react-modal';
import UniqueFriend from './UniqueFriend.jsx';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(document.getElementById('root'));

class SongQueryDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const {
      album, artist, title, url,
    } = this.props.songQueryResultDetail ? this.props.songQueryResultDetail : this.props.savedSongDetail;
    const { saveSong } = this.props;
    // console.log(this.props);
    // console.log(saveSong);

    let listOfFriendsUnique
    if (this.props.savedFriends) {
      listOfFriendsUnique = this.props.savedFriends.map((ele) => {
        return ele.email;
      }).filter((el, i, arr) => {
        return arr.indexOf(el) === i;
      });
    }

    return (
      <div className="song-query-container">
      {/* Buttons */}
      <div className="song-query-button-container">
        {/* Recommend Button, opens Modal */}
        {!saveSong
          ? <button className="song-query-button" onClick={this.openModal}>Rec</button>
          : null}
        {/* Save Button */}
        {saveSong
          ? <button className="song-query-button" onClick={() => saveSong(title, artist, album, url)}>Add</button>
          : null}
        {/* Play Button */}
        <a href={url} target="_blank">
          <button className="song-play-button">Play</button>
        </a>
      </div>

      {/* Song Details */}
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

      {/* Modal Popup triggered by the Recommend Button */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Recommend Modal"
        >
          <h2>Recommend this Song to Who?</h2>
          <ul>
            {listOfFriendsUnique ? listOfFriendsUnique.map((email, i) => {
              // return <li key={i} email={email}></li>
              return <UniqueFriend key={i} email={email} />
            }) : null}
          </ul>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    )
  }
}

// const SongQueryDisplay = (props) => {
//   const {
//     album, artist, title, url,
//   } = props.songQueryResultDetail ? props.songQueryResultDetail : props.savedSongDetail;
//   const { saveSong } = props;

//   return (
//     <div className="song-query-container">
//       {/* Buttons */}
//       <div className="song-query-button-container">
//         {/* Recommend Button, opens Modal */}
//         {!saveSong
//           ? <button className="song-query-button" onClick={props.openModal}>Rec</button>
//           : null}
//         {/* Save Button */}
//         {saveSong
//           ? <button className="song-query-button" onClick={() => saveSong(title, artist, album, url)}>Add</button>
//           : null}
//         {/* Play Button */}
//         <a href={url} target="_blank">
//           <button className="song-play-button">Play</button>
//         </a>
//       </div>

//       {/* Song Details */}
//       <div className="song-query-detail">
//         Song Title:
//         {' '}
//         <a href={url} target="_blank">{title}</a>
//         <br />
//         By:
//         {' '}
//         {artist}
//         <br />
//         Album:
//         {' '}
//         {album}
//       </div>

//       {/* Modal Popup triggered by the Recommend Button */}
//       <Modal
//           isOpen={props.modalIsOpen}
//           onAfterOpen={props.afterOpenModal}
//           onRequestClose={props.closeModal}
//           style={customStyles}
//           contentLabel="Recommend Modal"
//         >

//           <h2>Hello</h2>
//           <button onClick={props.closeModal}>close</button>
//           <div>I am a modal</div>
//           <form>
//             <input />
//             <button>tab navigation</button>
//             <button>stays</button>
//             <button>inside</button>
//             <button>the modal</button>
//           </form>
//         </Modal>
//     </div>
//   );
// };
export default SongQueryDisplay;
