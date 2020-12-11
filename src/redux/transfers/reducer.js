import {
    STORE_SET_TRANSFER_DATA,
    STORE_SET_TRANSFERS_DATA,
} from "./actions";

// Partial global store for supplies data management
const initialState = {
    list: [],
    current: {
        id: '', reference: '', amount: '', creation: '',
        note: '', remaining: '', status: '',

        supervisor: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set supplies data
        case STORE_SET_TRANSFERS_DATA:
            nextState = {...state, list: action.transfers};
            return nextState || state;
        // Resolve event to set supply data
        case STORE_SET_TRANSFER_DATA:
            nextState = {...state, current: action.transfer};
            return nextState || state;

        // Unknown action
        default: return state;
    }
}

export default reduce
