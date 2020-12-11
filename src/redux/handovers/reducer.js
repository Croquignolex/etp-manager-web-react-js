import {
    STORE_SET_HANDOVER_DATA,
    STORE_SET_HANDOVERS_DATA,
} from "./actions";

// Partial global store for supplies data management
const initialState = {
    list: [],
    current: {
        id: '', reference: '', amount: '', creation: '', note: '',

        sender: {id: '', name: ''},
        receiver: {id: '', name: ''},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set supplies data
        case STORE_SET_HANDOVERS_DATA:
            nextState = {...state, list: action.handovers};
            return nextState || state;
        // Resolve event to set supply data
        case STORE_SET_HANDOVER_DATA:
            nextState = {...state, current: action.handover};
            return nextState || state;

        // Unknown action
        default: return state;
    }
}

export default reduce
