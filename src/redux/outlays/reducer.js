import {
    STORE_SET_OUTLAY_DATA,
    STORE_SET_OUTLAYS_DATA,
} from "./actions";

// Partial global store for supplies data management
const initialState = {
    list: [],
    current: {
        id: '', reference: '', amount: '', creation: '', note: '', receipt: '',

        manager: {id: '', name: ''},
        collector: {id: '', name: ''},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set supplies data
        case STORE_SET_OUTLAYS_DATA:
            nextState = {...state, list: action.outlays};
            return nextState || state;
        // Resolve event to set supply data
        case STORE_SET_OUTLAY_DATA:
            nextState = {...state, current: action.outlay};
            return nextState || state;

        // Unknown action
        default: return state;
    }
}

export default reduce
