import React, { Component } from "react";
import { connect } from 'react-redux';
import mapReduxStoreToProps from '../redux/mapReduxStoreToProps';

class TimerInput extends Component {
  state = {
    inputHrs: 0,
    inputMin: 0,
    inputSec: 0
  };

  changeInputTime = (event, timeKey) => {
    const newState = this.state;
    newState[timeKey] = parseInt(event.target.value);
    this.setState(newState);
    this.props.setTimer(newState);
  };

  startMaster = () => {
    this.props.startAll(this.state);
  };

  render() {
    return (
      <div>
        <input
          type="number"
          onChange={event => this.changeInputTime(event, "inputHrs")}
          className="field-item_hrs"
          required
        />
        <input
          type="number"
          onChange={event => this.changeInputTime(event, "inputMin")}
          className="field-item_min"
          required
        />
        <input
          type="number"
          onChange={event => this.changeInputTime(event, "inputSec")}
          className="field-item_sec"
          required
        />
        <button onClick={this.startMaster}>Start Master</button>
      </div>
    );
  }
}

export default connect(mapReduxStoreToProps)(TimerInput);
