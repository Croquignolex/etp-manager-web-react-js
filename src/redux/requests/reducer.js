import {
    STORE_USER_CHECK_REQUEST_INIT,
    STORE_USER_CHECK_REQUEST_RESET,
    STORE_USER_CHECK_REQUEST_FAILED,
    STORE_USER_CHECK_REQUEST_SUCCEEDED,
} from "./actions";

// Partial global store for requests data management
const initialState = {
    userCheck: {failed: false, loading: false, succeeded: false}
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== User check start
        // Resolve event to set user check init request store data
        case STORE_USER_CHECK_REQUEST_INIT:
            nextState = {...state, userCheck: {...state.userCheck, failed: false, loading: true, succeeded: false}};
            return nextState || state;
        // Resolve event to set user check failed request store data
        case STORE_USER_CHECK_REQUEST_FAILED:
            nextState = {...state, userCheck: {...state.userCheck, failed: true, loading: true, succeeded: false}};
            return nextState || state;
        // Resolve event to set user check succeeded request store data
        case STORE_USER_CHECK_REQUEST_SUCCEEDED:
            nextState = {...state, userCheck: {...state.userCheck, failed: false, loading: true, succeeded: true}};
            return nextState || state;
        // Resolve event to set user check reset request store data
        case STORE_USER_CHECK_REQUEST_RESET:
            nextState = {...state, userCheck: {...initialState.userCheck}};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
