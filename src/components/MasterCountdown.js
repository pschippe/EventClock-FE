import React, { Component } from "react";
import { connect } from 'react-redux';
import mapReduxStoreToProps from '../redux/mapReduxStoreToProps';
import Api from '../api';

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
    };
    
    startTimer = () => {
        this.props.dispatch({
            type: 'MASTER_TIMER_SET_ALL',
            payload: {
                timerOn: true,
                timerCount: this.props.store.currentTime.timerTime,
                timerStart: this.props.store.currentTime.timerTime
            }
        });
        // Creates Promises for all clocks if different endpoints are needed
        // Hope only one endpoint is needed
        // First create empty array
        const apiArray = [];
        // Fill using a for loop
        for (let clock of this.props.store.countdownTimers) {
            const apiObj = {
                ...this.props.store.currentTime,
                id: clock.id,
                status: 'start'
            };
            apiArray.push(Api.postTime(apiObj));
        }
        // Send promise for all
        Promise.all(apiArray)
            // Then is a response to make sure that it was successful to hit api
            .then((response) => {
                window.setTimeout(() => {
                    this.startTimer()
                }, 2000);
            })
            // Catch is an error... its just an error
            .catch((error) => {
                console.log('Error on preStart for Countdown.js', error);
            });
        // Controls timing delay for clock start
        window.setTimeout(() => {
            this.createTimerInterval();        
        }, 2000);
    };

    holdTimer = () => {
        clearInterval(this.timer);
        this.props.dispatch({
            type: 'MASTER_TIMER_SET_ALL',
            payload: {
                timerOn: true,
                timerCount: this.props.store.currentTime.timerTime,
                timerStart: this.props.store.currentTime.timerTime   
            }
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
                <button onClick={this.startTimer} className="btn btn_start mix-btn_lg"><span>Start</span></button>
                <button onClick={this.holdTimer} className="btn btn_hold mix-btn_lg"><span>Hold</span></button>
                <button onClick={this.stopTimer} className="btn btn_stop mix-btn_lg"><span>Stop</span></button>
                <button onClick={this.startTimer} className="btn btn_start mix-btn_lg"><span>Resume</span></button>
                <button onClick={this.resetTimer} className="btn btn_reset mix-btn_lg"><span>Reset</span></button>
            </div>
        );
    }
}
export default connect(mapReduxStoreToProps)(MasterCountdown);