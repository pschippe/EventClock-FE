import React, { Component } from "react";

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    inputHrs: 0,
    inputMin: 0,
    inputSec: 0,
    pulledTime: {}
  };

  preStart = () => {
    this.setState({
      pulledTime: this.props.time,
      timerTime: this.convertTime(this.props.time)
    }, () => {
      window.setTimeout(() => {this.startTimer()}, 2000);
      console.log(this.state.timerTime);
    })
    console.log(this.props.time);
  }

  convertTime(timeObj) {
    let finalTime = 0;
    if (timeObj.inputHrs > 0) {
      const hoursToMills = 1000 * 60 * 60;
      finalTime = finalTime + (timeObj.inputHrs * hoursToMills);
    }
    if (timeObj.inputMin > 0) {
      const minutesToMills = 1000 * 60;
      finalTime = finalTime + (timeObj.inputMin * minutesToMills);
    }
    if (timeObj.inputSec > 0) {
      const secondsToMills = 1000;
      finalTime = finalTime + (timeObj.inputSec * secondsToMills);
    }
    return finalTime;
  }

  startTimer = () => {
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
    // if (this.state.timerOn === false) {
    this.setState({
      timerTime: this.state.timerStart
    });
    // }
  };

  startForMaster() {
    this.props.resetMasterCallback();
    this.preStart();
  }

  render() {
    let { timerTime, timerStart, timerOn } = this.state;

    if (this.props.masterStart === true) {
      this.startForMaster();
    }
    
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <div className="Countdown">
        <p>{JSON.stringify(this.state.pulledTime)}</p>
        <div className="Countdown-header">Countdown</div>
        <div className="Countdown-label">Hours : Minutes : Seconds</div>
        <div className="Countdown-time">
          {hours} : {minutes} : {seconds}
        </div>
        {timerOn === false &&
          (timerStart === 0 || timerTime === timerStart) && (
            <button onClick={this.preStart}>Start</button>
          )}
        {timerOn === true && timerTime >= 1000 && (
          <button onClick={this.stopTimer}>Stop</button>
        )}
        {timerOn === false &&
          (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
            <button onClick={this.startTimer}>Resume</button>
          )}
        {(timerOn === false || timerTime < 1000) && (
          <button onClick={this.resetTimer}>Reset</button>
        )}
      </div>
    );
  }
}

export default Countdown;
