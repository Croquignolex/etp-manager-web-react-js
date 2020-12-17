import {
    STORE_SET_USER_CHECK_ERROR_DATA,
    STORE_RESET_USER_CHECK_ERROR_DATA,
} from "./actions";

// Partial global store for error data management
const initialState = {
    userCheck: {show: false, message: ''}
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== User check
        // Resolve event to reset error store data
        case STORE_RESET_USER_CHECK_ERROR_DATA:
            nextState = {...state, userCheck: {...initialState.userCheck}};
            return nextState || state;
        // Resolve event to set error store data
        case STORE_SET_USER_CHECK_ERROR_DATA:
            nextState = {...state, userCheck: {...state.userCheck, show: true, message: action.message}};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce