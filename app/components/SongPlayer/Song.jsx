import React from 'react';
import '../../main.css';

class Song extends React.Component {
  constructor(props) {
    super(props);
    const {
      path_lower: pathLower,
      content_hash: contentHash,
      id,
    } = props.info;
    this.path = pathLower;
    this.contentHash = contentHash;
    this.id = id;
    this.fetchSongPlayData = props.fetch.bind(this);
    this.state = {};
  }

  getSong() {
    this.fetchSongPlayData(this.path);
  }

  render() {
    const { name } = this.props.info;
    const { link } = this.state;
    return (
      <figure className="song" onClick={ () => this.fetchSongPlayData(this.path) }>
        <div className="song-img-placeholder"></div>
        <div className="song-controller">
          <h3>{ name }</h3>
        </div>
        {
          link ?
            <audio
              src={ link }
              preload="auto"
              controls></audio> :
            <p>Click to load song</p>
        }
      </figure>
    );
  }
}

export default Song;
