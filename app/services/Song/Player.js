import {
  fetchSongPlayData,
  animate,
  getStartTime,
  formatTime,
} from '../../helpers.jsx';

class Player {
  constructor(updateSongTime) {
    this.audio = document.createElement('audio');
    this.updateSongTime = updateSongTime;
  }

  play() {
    this.audio.play();
    this.startProgress();
    const songTimeId = setInterval(() => {
      if (this.cmd === 'play') {
        this.updateSongTime(
          formatTime(this.audio.currentTime),
        );
      } else {
        clearInterval(songTimeId);
      }
    }, 1000);
  }

  pause() {
    this.audio.pause();
    this.endProgress(this.animationId);
  }

  rewind() {
    this.endProgress(this.animationId);
    this.initProgressBar();
    this.audio.load();
  }

  forward() {
    console.log('forward!');
  }

  setProgressBar(progress) {
    this.progressBar.style.background = `linear-gradient(90deg, #EE7752 0px, #EE7752 ${progress}%, #23D5AB 0px)`;
  }

  getProgressBar() {
    return document.getElementsByClassName('progress-bar')[0];
  }

  initProgressBar(progress = 0) {
    if (!this.progressBar) this.progressBar = this.getProgressBar();
    this.setProgressBar(progress);
  }

  initPlayback() {
    if (this.audio.currentTime > 0) this.pause();
  }

  increaseProgress(progress) {
    if (this.cmd === 'play') {
      this.setProgressBar(progress);
    }
  }

  endProgress(animationId) {
    cancelAnimationFrame(animationId);
  }

  clearTime(song) {
    if (this.song !== song) this.updateSongTime('0:00');
  }

  startProgress() {
    const duration = this.audio.duration * 1000;
    const startTime = getStartTime.bind(null, this.audio.currentTime);
    const animateProgBar = animate({
      timing: timeFraction => timeFraction,
      draw: (progress) => {
        this.increaseProgress(progress * 100);
      },
      player: this,
      duration,
      startTime,
    });
    this.animationId = requestAnimationFrame(animateProgBar);
  }

  queue() {  
    this.initPlayback();
    this.initProgressBar();
    fetchSongPlayData(this.song)
      .then(({ link }) => {
        this.audio.src = link;
      })
      .catch((err) => {
        console.log(err);
        // todo: emit action if fetch fails
      });
  }

  executeCmd(cmd, song) {
    this.clearTime(song);
    this.cmd = cmd;
    this.song = song;
    switch (cmd) {
      case 'play':
        return this.play();
      case 'queued':
        return this.queue();
      case 'pause':
        return this.pause();
      case 'rewind':
        return this.rewind();
      case 'forward':
        return this.forward();
      default:
        return null;
    }
  }
}

export default Player;
