import {
    STORE_SET_ANONYMOUS_FLEET_DATA,
    STORE_SET_ANONYMOUS_FLEETS_DATA,
} from "./actions";

// Partial global store for fleets data management
const initialState = {
    list: [],
    current: {
        id: '', reference: '', amount: '', receiver: '', receiverSim: '', status: '', creation: '',

        claimant: {id: '', name: '', phone: ''},
        sim_outgoing: {id: '', name: '', number: ''},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set fleets data
        case STORE_SET_ANONYMOUS_FLEETS_DATA:
            nextState = {...state, list: action.anonymousFleets};
            return nextState || state;
        // Resolve event to set fleet data
        case STORE_SET_ANONYMOUS_FLEET_DATA:
            nextState = {...state, current: action.anonymousFleet};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce