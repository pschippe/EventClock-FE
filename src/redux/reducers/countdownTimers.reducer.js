const defaultCounntdowns = [
    {
        id: 'room01',
        time: 0
    },
    {
        id: 'room02',
        time: 0
    }
];

const countdownTimers = (state = defaultCounntdowns, action) => {
    switch (action.type) {
        case 'ADD_TIMER':
            return [ ...state, action.payload ];
        default:
            return state;
    }
};

export default countdownTimers;