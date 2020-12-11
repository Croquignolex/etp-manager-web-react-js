import {
    STORE_SET_RECOVERY_DATA,
    STORE_SET_RECOVERIES_DATA,
    STORE_SET_RECOVERIES_ACTION_DATA,
} from "./actions";

// Partial global store for refuels data management
const initialState = {
    list: [],
    current: {
        id: '', reference: '', amount: '', creation: '', type: '',
        receipt: '', status: '',

        collector: {id: '', name: ''},
        fleet: {id: '', name: '', reference: ''},
        agent: {id: '', name: '', reference: ''},
        payment: {id: '', name: '', reference: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
        transaction: {id: '', name: '', reference: ''},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set refuels data
        case STORE_SET_RECOVERIES_DATA:
            nextState = {...state, list: action.recoveries};
            return nextState || state;
        // Resolve event to set refuel data
        case STORE_SET_RECOVERY_DATA:
            nextState = {...state, current: action.recovery};
            return nextState || state;
        // Resolve event to set sim action data
        case STORE_SET_RECOVERIES_ACTION_DATA:
            nextState = {...state, list: state.list.map(recovery => {
                        if(recovery.id === action.id) {
                            recovery.actionLoader = !recovery.actionLoader;
                        }
                        return recovery;
                    }
                )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
