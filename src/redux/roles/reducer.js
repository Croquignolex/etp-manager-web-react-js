import {STORE_SET_ROLES_DATA} from "./actions";

// Partial global store for roles data management
const initialState = {
    list: []
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    if (action.type === STORE_SET_ROLES_DATA) {
        nextState = {...state, list: action.roles};
        return nextState || state;
    } else {
        return state;
    }
}

export default reduce