import {
    STORE_SET_CLEARANCE_DATA,
    STORE_SET_CLEARANCES_DATA,
    STORE_SET_CLEARANCE_ACTION_DATA
} from "./actions";

// Partial global store for clearances data management
const initialState = {
    list: [],
    current: {
        id: '', reference: '', amount: '', status: '', creation: '',

        sim: {id: '', name: '', number: ''},
        claimant: {id: '', name: '', phone: ''},
        agent: {id: '', name: '', reference: ''},

        supplies: []
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set clearances data
        case STORE_SET_CLEARANCES_DATA:
            nextState = {...state, list: action.clearances};
            return nextState || state;
        // Resolve event to set clearance data
        case STORE_SET_CLEARANCE_DATA:
            nextState = {...state, current: action.clearance};
            return nextState || state;
        // Resolve event to set operator action data
        case STORE_SET_CLEARANCE_ACTION_DATA:
            nextState = {...state, list: state.list.map(clearance => {
                        if(clearance.id === action.id) {
                            clearance.actionLoader = !clearance.actionLoader;
                        }
                        return clearance;
                    }
                )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce