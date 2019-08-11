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

    this.props.dispatch({
      type: `CURRENT_TIME_${timeKey.toUpperCase()}`,
      payload: event.target.value,
    })
  };

  render() {
    return (
      <div>
        <input
          type="number"
          onChange={event => this.changeInputTime(event, "hours")}
          className="field-item_hrs"
          required
        />
        <input
          type="number"
          onChange={event => this.changeInputTime(event, "minutes")}
          className="field-item_min"
          required
        />
        <input
          type="number"
          onChange={event => this.changeInputTime(event, "seconds")}
          className="field-item_sec"
          required
        />
      </div>
    );
  }
}

export default connect(mapReduxStoreToProps)(TimerInput);
