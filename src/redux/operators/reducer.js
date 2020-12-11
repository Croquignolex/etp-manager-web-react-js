import {
    STORE_SET_OPERATOR_DATA,
    STORE_SET_OPERATORS_DATA,
    STORE_SET_OPERATOR_ACTION_DATA,
    STORE_SET_OPERATOR_SIMS_ACTION_DATA
} from "./actions";

// Partial global store for operators data management
const initialState = {
    list: [],
    current: {
        id: '', name: '', description: '', creation: '',

        sims: []
    },
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set operators data
        case STORE_SET_OPERATORS_DATA:
            nextState = {...state, list: action.operators};
            return nextState || state;
        // Resolve event to set operator data
        case STORE_SET_OPERATOR_DATA:
            nextState = {...state, current: action.operator};
            return nextState || state;
        // Resolve event to set operator sims action data
        case STORE_SET_OPERATOR_SIMS_ACTION_DATA:
            nextState = {...state, current: {...state.current, sims: state.current.sims.map(sim => {
                        if(sim.id === action.sim) {
                            sim.actionLoader = !sim.actionLoader;
                        }
                        return sim;
                    })
            }};
            return nextState || state;
        // Resolve event to set operator action data
        case STORE_SET_OPERATOR_ACTION_DATA:
            nextState = {...state, list: state.list.map(operator => {
                    if(operator.id === action.id) {
                        operator.actionLoader = !operator.actionLoader;
                    }
                    return operator;
                }
            )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce