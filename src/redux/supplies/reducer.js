import {
    STORE_SET_SUPPLY_DATA,
    STORE_SET_SUPPLIES_DATA,
} from "./actions";

// Partial global store for supplies data management
const initialState = {
    list: [],
    current: {
        id: '', reference: '', amount: '', creation: '',
        note: '', remaining: '', status: '',

        request: {id: ''},
        supplier: {id: '', name: ''},
        agent: {id: '', name: '', reference: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set supplies data
        case STORE_SET_SUPPLIES_DATA:
            nextState = {...state, list: action.supplies};
            return nextState || state;
        // Resolve event to set supply data
        case STORE_SET_SUPPLY_DATA:
            nextState = {...state, current: action.supply};
            return nextState || state;

        // Unknown action
        default: return state;
    }
}

export default reduce
