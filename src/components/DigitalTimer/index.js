// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  elapsedTimeInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrementTimerController = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementTimerController = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, elapsedTimeInSeconds} = this.state

    const isTimerCompleted = elapsedTimeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
      }))
    }
  }

  onClickPauseOrPlayButton = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      elapsedTimeInSeconds,
    } = this.state

    const isTimerCompleted = elapsedTimeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({elapsedTimeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, elapsedTimeInSeconds} = this.state
    const isButtonDisabled = elapsedTimeInSeconds > 0

    return (
      <div className="timer-limit-controllers-container">
        <p className="timer-controller-heading">Set Timer Limit</p>
        <div className="timer-controllers-container">
          <button
            className="limit-button"
            type="button"
            onClick={this.onDecrementTimerController}
            disabled={isButtonDisabled}
          >
            -
          </button>
          <div className="minutes-limit-label-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-button"
            type="button"
            onClick={this.onIncrementTimerController}
            disabled={isButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state

    const startOrPauseStatus = isTimerRunning

    const playOrPauseImageUrl = startOrPauseStatus
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="pause-or-play-container">
        <button
          className="control-button"
          type="button"
          onClick={this.onClickPauseOrPlayButton}
        >
          <img
            src={playOrPauseImageUrl}
            alt={playOrPauseAltText}
            className="play-or-pause-image"
          />
        </button>
        <p className="play-or-pause-text">
          {isTimerRunning ? 'Pause' : 'Start'}
        </p>
        <button
          className="control-button"
          type="button"
          onClick={this.onClickReset}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="play-or-pause-image"
          />
        </button>
        <p className="play-or-pause-text">Reset</p>
      </div>
    )
  }

  getElapsedTimeInSeconds = () => {
    const {timerLimitInMinutes, elapsedTimeInSeconds} = this.state

    const remainingSecondsInTime =
      timerLimitInMinutes * 60 - elapsedTimeInSeconds

    const minutes = Math.floor(remainingSecondsInTime / 60)
    const seconds = Math.floor(remainingSecondsInTime % 60)

    const displayMinutes = minutes > 9 ? minutes : `0${minutes}`
    const displaySeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${displayMinutes}:${displaySeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const timerCurrentStatus = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="digital-heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="timer-container">
              <h1 className="timer">{this.getElapsedTimeInSeconds()}</h1>
              <p className="timer-status">{timerCurrentStatus}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
