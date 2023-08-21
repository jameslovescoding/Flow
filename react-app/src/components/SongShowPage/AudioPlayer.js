import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Duration from './Duration';
import "./AudioPlayer.css";

class MyAudioPlayer extends Component {
  state = {
    url: this.props.url,
    playing: false,
    volume: 0.5,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    loop: false
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleStop = () => {
    console.log('onStop')
    this.setState({
      playing: false,
    })
    this.player.seekTo(parseFloat("0"))
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  ref = player => {
    this.player = player
  }

  render() {
    const { url, playing, volume, muted, loop, played, loaded, duration } = this.state
    const SEPARATOR = ' · '

    return (<>
      <div className='audio-player-container'>
        <div className='audio-player-buttons'>
          <div className='audio-player-play-pause'>
            <button onClick={this.handlePlayPause}>{playing ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
            <p>{playing ? 'Pause' : 'Play'}</p>
          </div>
          <div className='audio-player-stop'>
            <button onClick={this.handleStop}><i className="fa-solid fa-stop"></i></button>
            <p>Stop</p>
          </div>
          <div className='audio-player-loop'>
            <button
              onClick={this.handleToggleLoop}
              value={loop}><i className="fa-solid fa-repeat"></i></button>
            <p>Loop</p>
          </div>
          <div className='audio-player-mute'>
            <button onClick={this.handleToggleMuted}
              value={muted}><i className="fa-solid fa-volume-xmark"></i></button>
            <p>Mute</p>
          </div>
        </div>
        <div className='audio-player-progress'>
          <input
            type='range' min={0} max={0.999999} step='any'
            value={played}
            onMouseDown={this.handleSeekMouseDown}
            onChange={this.handleSeekChange}
            onMouseUp={this.handleSeekMouseUp}
          />
          <div className='audio-player-progress-info'>
            <p>
              <span><Duration seconds={duration * played} /></span>
              <span>Duration <Duration seconds={duration} /></span>
              <span>-<Duration seconds={duration * (1 - played)} /></span>
            </p>
          </div>
        </div>
        <div className='audio-player-volume'>
          <input type='range' min={0} max={1} step='any'
            value={volume}
            onChange={this.handleVolumeChange}
          />
          <div className='audio-player-volume-info'>
            <p >
              <span>Volume</span>
              <span>{(volume * 100).toFixed(0)}%</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className='player-wrapper'>
          <ReactPlayer
            ref={this.ref}
            className='react-player'
            width='100%'
            height='100%'
            url={url}
            playing={playing}
            loop={loop}
            volume={volume}
            muted={muted}
            onPlay={this.handlePlay}
            onPause={this.handlePause}
            onBuffer={() => console.log('onBuffer')}
            onSeek={e => console.log('onSeek', e)}
            onEnded={this.handleEnded}
            onError={e => console.log('onError', e)}
            onProgress={this.handleProgress}
            onDuration={this.handleDuration}
          />
        </div>
      </div>
    </>)
  }
}

export default MyAudioPlayer
