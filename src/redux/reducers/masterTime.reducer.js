const masterTime = (state = {}, action) => {
    // Update Timer count
    switch (action.type) {
        case 'MASTER_TIMER_COUNT':
            return {
                ...state,
                timerCount: action.payload
            };
        case 'MASTER_TIMER_ON':
            return {
                ...state,
                timerOn: action.payload
            };
        case 'MASTER_TIMER_START':
            return {
                ...state,
                timerStart: action.payload
            }
        case 'MASTER_TIMER_SET_ALL':
            return {
                ...state,
                timerCount: action.payload.timerCount,
                timerOn: action.payload.timerOn,
                timerStart: action.payload.timerStart
            }
        default:
            return state;
    }
}

export default masterTime;