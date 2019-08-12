import React, { Component } from "react";
import { connect } from 'react-redux';
import mapReduxStoreToProps from '../redux/mapReduxStoreToProps';

class MasterCountdown extends Component {
    createTimerInterval () {
        this.timer = setInterval(() => {
            const newTime = this.props.store.masterTime.timerCount - 10;
            if (newTime >= 0) {
                this.props.dispatch({
                    type: 'MASTER_TIMER_COUNT',
                    payload: newTime
                });
            } else {
                clearInterval(this.timer);
                this.props.dispatch({ 
                    type: 'MASTER_TIMER_ON',
                    payload: false
                });
                alert("Master Countdown Ended");
            }
        }, 10);
    }
    
    startTimer = () => {
        this.props.dispatch({
            type: 'MASTER_TIMER_SET_ALL',
            payload: {
                timerOn: true,
                timerCount: this.props.store.currentTime.timerTime,
                timerStart: this.props.store.currentTime.timerTime
            }
        });
        this.createTimerInterval();        
    };

    holdTimer = () => {
        clearInterval(this.timer);
        this.props.dispatch({
            type: 'MASTER_TIMER_ON',
            payload: true
        });
    };
    
    stopTimer = () => {
        clearInterval(this.timer);
        this.props.dispatch({ 
            type: 'MASTER_TIMER_ON',
            payload: false
        });
    };

    resetTimer = () => {
        this.props.dispatch({
            type: 'MASTER_TIMER_COUNT',
            payload: this.props.store.masterTime.timerStart
        });
    };

    resumeTimer = () => {
        this.props.dispatch({
            type: 'MASTER_TIMER_ON',
            payload: true
        });
        this.createTimerInterval();
    }

    render (){
        return (
            <div>
                <button onClick={this.startTimer}>Start</button>
                <button onClick={this.holdTimer}>Hold</button>
                <button onClick={this.stopTimer}>Stop</button>
                <button onClick={this.startTimer}>Resume</button>
                <button onClick={this.resetTimer}>Reset</button>
            </div>
        );
    }
}
export default connect(mapReduxStoreToProps)(MasterCountdown);