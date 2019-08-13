import React, { Component } from "react";
import Countdown from "./components/Countdown";
import MasterCountdown from "./components/MasterCountdown";
import TimerInput from "./components/TimerInput";
import { connect } from 'react-redux';
import mapReduxStoreToProps from './redux/mapReduxStoreToProps';

class App extends React.Component {
  state = {
    indvTimer: 0,
    allTimers: 0,
    currentTime: 0,
    masterStart: false
  };

  // setTimer = timeObj => {
  //   this.setState({
  //     indvTimer: `${timeObj.inputHrs}:${timeObj.inputMin}:${timeObj.inputSec}`,
  //     currentTime: timeObj
  //   });
  // };

  startAll = timeObj => {
    this.setState({
      allTimers: `${timeObj.inputHrs}:${timeObj.inputMin}:${timeObj.inputSec}`,
      masterStart: true
    });
  };

  startIndvCountdown = (countdownIndex, timeConv) => {
    const timersArray = [...this.state.timers];
    timersArray[countdownIndex] = timeConv;
    this.setState({ timers: timersArray });
  };

  resetMaster = () => {
    this.setState({
      masterStart: false
    })
  }

  render() {
    const {
      store,
    } = this.props;
    const rmClocks = store.countdownTimers.map((timers, index) => {
      return (
        <Countdown
          id={timers.id}
          masterStart={this.state.masterStart}
          resetMasterCallback={this.resetMaster}
          key={index}
          index={index} 
        />
      );
    });
    return (
        <div className="grid">
          <div className="grid-col grid-col_4of12">
            {rmClocks}
          </div>
          <div className="grid-col grid-col_8of12">
            <TimerInput
              startAll={this.startAll}
            />
            <MasterCountdown />
          </div>
        </div>
    );
  }
}

export default connect(mapReduxStoreToProps)(App);
