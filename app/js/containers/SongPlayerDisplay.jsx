import React from 'react';
import { connect } from 'react-redux';
import { setSongPlayerCmd } from '../actions';
import SongPlayerButton from '../components/SongPlayerButton.jsx';
import rewind from './../../../public/SVG/rewind.svg';
import play from './../../../public/SVG/play.svg';
import pause from './../../../public/SVG/pause.svg';
import forward from './../../../public/SVG/forward.svg';

const btnData = {
  rewind,
  play: { play, pause },
  forward,
};

const SongPlayerDisplay = ({
  btnOnClick,
  selectedSong,
  songTime,
  command,
}) => (
  <div className='song-player'>
    <figcaption className='song-player-caption'>
      { selectedSong ?
        selectedSong.name :
        'Loading song . . .' }
    </figcaption>
    <p>{ songTime }</p>
    <figure className='progress-bar'>
      <ul className="button-bar">
        {
          Object.entries(btnData).map(([name, value], i) => (
            <SongPlayerButton
              key={ i }
              type={ name }
              button={ value }
              onClick={ btnOnClick }
              command={ command }
            />
          ))
        }
      </ul>
    </figure>
  </div>
);

const mapStateToProps = ({
  songPlayer: { command, selectedSong, songTime },
}) => ({ command, selectedSong, songTime });

const mapDispatchToProps = { btnOnClick: setSongPlayerCmd };

export default connect(mapStateToProps, mapDispatchToProps)(SongPlayerDisplay);