import React, { Component } from "react";
import { connect } from 'react-redux';
import mapReduxStoreToProps from '../redux/mapReduxStoreToProps';

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    inputHrs: 0,
    inputMin: 0,
    inputSec: 0,
  };

  preStart = () => {
    this.setState({
      timerTime: this.props.store.currentTime.timerTime
    }, () => {
      window.setTimeout(() => {
        this.startTimer()
      }, 2000);
    });
  }

  // convertTime(timeObj) {
  //   let finalTime = 0;
  //   if (timeObj.inputHrs > 0) {
  //     const hoursToMills = 1000 * 60 * 60;
  //     finalTime = finalTime + (timeObj.inputHrs * hoursToMills);
  //   }
  //   if (timeObj.inputMin > 0) {
  //     const minutesToMills = 1000 * 60;
  //     finalTime = finalTime + (timeObj.inputMin * minutesToMills);
  //   }
  //   if (timeObj.inputSec > 0) {
  //     const secondsToMills = 1000;
  //     finalTime = finalTime + (timeObj.inputSec * secondsToMills);
  //   }
  //   return finalTime;
  // }

  startTimer = () => {
    // TODO: Use npm install "axios" library for ajax call to backend
    this.setState({
      timerOn: true,
      // timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    console.log(this.state.timerStart);
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("Countdown Ended");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    this.setState({
      timerTime: this.state.timerStart
    });
  };

  startForMaster() {
    this.props.resetMasterCallback();
    this.preStart();
  }

  render() {
    let { timerTime, timerStart, timerOn } = this.state;
    let disableButtons = false;

    if (this.props.store.masterTime.timerOn === true) {
      timerTime = this.props.store.masterTime.timerCount;
      timerStart = this.props.store.masterTime.timerStart;
      timerOn = this.props.store.masterTime.timerOn;
      disableButtons = true;
    }
    
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <div className="Countdown">
        <div className="Countdown-header">Countdown</div>
        <div className="Countdown-label">Hours : Minutes : Seconds</div>
        <div className="Countdown-time">
          {hours} : {minutes} : {seconds}
        </div>
        {timerOn === false &&
          (timerStart === 0 || timerTime === timerStart) && (
            <button onClick={this.preStart} disabled={disableButtons}>Start</button>
          )}
        {timerOn === true && timerTime >= 1000 && (
          <button onClick={this.stopTimer} disabled={disableButtons}>Stop</button>
        )}
        {timerOn === false &&
          (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
            <button onClick={this.startTimer} disabled={disableButtons}>Resume</button>
          )}
        {(timerOn === false || timerTime < 1000) && (
          <button onClick={this.resetTimer} disabled={disableButtons}>Reset</button>
        )}
      </div>
    );
  }
}

export default connect(mapReduxStoreToProps)(Countdown);
