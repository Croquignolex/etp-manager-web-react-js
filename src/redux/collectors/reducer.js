import {
    STORE_SET_COLLECTOR_DATA,
    STORE_SET_COLLECTORS_DATA,
    STORE_SET_COLLECTOR_ACTION_DATA,
    STORE_SET_COLLECTOR_TOGGLE_DATA,
    STORE_SET_COLLECTOR_SIMS_ACTION_DATA,
} from "./actions";

// Partial global store for collectors data management
const initialState = {
    list: [],
    current: {
        id: '', name: '', phone: '', email: '', avatar: '', address: '', creation: '', description: '',

        role: {id: '', name: ''},
        account: {id: '', balance: ''},
        zone: {id: '', name: '', reference: '', map: ''},

        sims: [],
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set collectors data
        case STORE_SET_COLLECTORS_DATA:
            nextState = {...state, list: action.collectors};
            return nextState || state;
        // Resolve event to set collector data
        case STORE_SET_COLLECTOR_DATA:
            nextState = {...state, current: action.collector};
            return nextState || state;
        // Resolve event to set agent sims action data
        case STORE_SET_COLLECTOR_SIMS_ACTION_DATA:
            nextState = {...state, current: {...state.current, sims: state.current.sims.map(sim => {
                        if(sim.id === action.sim) {
                            sim.actionLoader = !sim.actionLoader;
                        }
                        return sim;
                    })
                }};
            return nextState || state;
        // Resolve event to set collector action data
        case STORE_SET_COLLECTOR_TOGGLE_DATA:
            nextState = {...state, list: state.list.map(collector => {
                        if(collector.id === action.id) {
                            collector.toggleLoader = !collector.toggleLoader;
                        }
                        return collector;
                    }
                )};
            return nextState || state;
        // Resolve event to set collector action data
        case STORE_SET_COLLECTOR_ACTION_DATA:
            nextState = {...state, list: state.list.map(collector => {
                    if(collector.id === action.id) {
                        collector.actionLoader = !collector.actionLoader;
                    }
                    return collector;
                }
            )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce