import React, { Component } from "react";
import Countdown from "./components/Countdown";
import TimerInput from "./components/TimerInput";

class App extends React.Component {
  state = {
    timers: [
      {
        id: "damnit",
        time: 0
      },
      {
        id: "damnit2",
        time: 0
      }
    ],
    indvTimer: 0,
    allTimers: 0,
    currentTime: 0
  };

  setTimer = timeObj => {
    this.setState({
      indvTimer: `${timeObj.inputHrs}:${timeObj.inputMin}:${timeObj.inputSec}`,
      currentTime: timeObj
    });
  };

  startAll = timeObj => {
    this.setState({
      allTimers: `${timeObj.inputHrs}:${timeObj.inputMin}:${timeObj.inputSec}`
    });
  };

  startIndvCountdown = (countdownIndex, timeConv) => {
    const timersArray = [...this.state.timers];
    timersArray[countdownIndex] = timeConv;
    this.setState({ timers: timersArray });
  };

  render() {
    const rmClocks = this.state.timers.map((timer, index) => {
      return (
        <Countdown id={timer.id} time={timer.time} key={index} index={index} />
      );
    });
    return (
      <div className="App">
        <div className="App-title">
          <TimerInput setTimer={this.setTimer} startAll={this.startAll} />
          <p>{this.state.indvTimer}</p>
          <p>{this.state.allTimers}</p>
        </div>
        <div className="Timers">{rmClocks}</div>
      </div>
    );
  }
}

export default App;
