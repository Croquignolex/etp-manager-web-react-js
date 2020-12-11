import {STORE_SET_SIM_DATA, STORE_SET_SIMS_DATA, STORE_SET_SIM_ACTION_DATA} from "./actions";

// Partial global store for sims data management
const initialState = {
    list: [],
    current: {
        id: '', name: '', reference: '', number: '', balance: '', description: '', creation: '',

        type: {id: '', name: ''},
        company: {id: '', name: ''},
        operator: {id: '', name: ''},
        collector: {id: '', name: ''},
        agent: {id: '', name: '', reference: ''}
    },
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set sims data
        case STORE_SET_SIMS_DATA:
            nextState = {...state, list: action.sims};
            return nextState || state;
        // Resolve event to set sim data
        case STORE_SET_SIM_DATA:
            nextState = {...state, current: action.sim};
            return nextState || state;
        // Resolve event to set sim action data
        case STORE_SET_SIM_ACTION_DATA:
            nextState = {...state, list: state.list.map(sim => {
                        if(sim.id === action.id) {
                            sim.actionLoader = !sim.actionLoader;
                        }
                        return sim;
                    }
                )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
