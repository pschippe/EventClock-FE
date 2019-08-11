const defaultCurrentTime = {
    hours: '00',
    minutes: '00',
    seconds: '00',
    timerTime: 0,
};

const currentTime = (state = defaultCurrentTime, action) => {
    switch (action.type) {
        case 'CURRENT_TIME_HOURS':
            const newState = addTimeToState(state, 'hours', action.payload);
            return newState;
        case 'CURRENT_TIME_MINUTES':
            const newState = addTimeToState(state, 'minutes', action.payload);
            return newState;
        case 'CURRENT_TIME_SECONDS':
            const newState = addTimeToState(state, 'seconds', action.payload);
            return newState;
        default:
            return state;
    }
}

function addTimeToState(currState, timeKey, timeValue) {
    const timeAsNumber = parseInt(timeValue);
    const timeDoubleDigit = makeTimeDoubleDigit(timeValue);
    const newTimeState = {
        ...currState,
    };
    newTimeState[timeKey] = timeDoubleDigit;
    newTimeState.timerTime = timeConverter(currState.timerTime, timeAsNumber, timeKey);

}

function makeTimeDoubleDigit(timeStr) {
    let doubleDigit = '00';

    if (timeStr.length < 2 && timeStr.length !== 0) {
        doubleDigit = `0${timeStr}`;
    }

    return doubleDigit;
}

function timeConverter(baseTime, newTime, timeType) {
    let finalTime = baseTime;
    let conversion = 1;

    if (timeType === 'hours') {
        conversion = 1000 * 60 * 60;
    } else if (timeType === 'minutes') {
        conversion = 1000 * 60;
    } else if (timeType === 'seconds') {
        conversion = 1000;
    }
    finalTime = finalTime + (newTime * conversion);

    return finalTime;
}

export default currentTime;