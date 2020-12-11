import {STORE_SET_SIMS_TYPES_DATA} from "./actions";

// Partial global store for users data management
const initialState = {
    list: []
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    if (action.type === STORE_SET_SIMS_TYPES_DATA) {
        nextState = {...state, list: action.simsTypes};
        return nextState || state;
    } else {
        return state;
    }
}

export default reduce