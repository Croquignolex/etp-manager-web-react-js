import {
    STORE_USER_CHECK_REQUEST_INIT,
    STORE_USER_CHECK_REQUEST_RESET,
    STORE_USER_CHECK_REQUEST_FAILED,
    STORE_USER_CHECK_REQUEST_SUCCEEDED,
    STORE_USER_PASSWORD_EDIT_REQUEST_INIT,
    STORE_USER_PASSWORD_EDIT_REQUEST_RESET,
    STORE_USER_PASSWORD_EDIT_REQUEST_FAILED,
    STORE_USER_PASSWORD_EDIT_REQUEST_SUCCEEDED
} from "./actions";

// Partial global store for requests data management
const initialState = {
    user: {
        check: {failed: false, loading: false, succeeded: false},
        password: {failed: false, loading: false, succeeded: false},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== User check
        // Resolve event to set user check init request store data
        case STORE_USER_CHECK_REQUEST_INIT:
            nextState = {...state, user: {...state.user, check: {failed: false, loading: true, succeeded: false}}};
            return nextState || state;
        // Resolve event to set user check failed request store data
        case STORE_USER_CHECK_REQUEST_FAILED:
            nextState = {...state, user: {...state.user, check: {failed: true, loading: false, succeeded: false}}};
            return nextState || state;
        // Resolve event to set user check succeeded request store data
        case STORE_USER_CHECK_REQUEST_SUCCEEDED:
            nextState = {...state, user: {...state.user, check: {failed: false, loading: false, succeeded: true}}};
            return nextState || state;
        // Resolve event to set user check reset request store data
        case STORE_USER_CHECK_REQUEST_RESET:
            nextState = {...state, user: {...state.user, check: initialState.user.check}};
            return nextState || state;
        // ======================================================== User password edit
        // Resolve event to set user check init request store data
        case STORE_USER_PASSWORD_EDIT_REQUEST_INIT:
            nextState = {...state, user: {...state.user, password: {failed: false, loading: true, succeeded: false}}};
            return nextState || state;
        // Resolve event to set user check failed request store data
        case STORE_USER_PASSWORD_EDIT_REQUEST_FAILED:
            nextState = {...state, user: {...state.user, password: {failed: true, loading: false, succeeded: false}}};
            return nextState || state;
        // Resolve event to set user check succeeded request store data
        case STORE_USER_PASSWORD_EDIT_REQUEST_SUCCEEDED:
            nextState = {...state, user: {...state.user, password: {failed: false, loading: false, succeeded: true}}};
            return nextState || state;
        // Resolve event to set user check reset request store data
        case STORE_USER_PASSWORD_EDIT_REQUEST_RESET:
            nextState = {...state, user: {...state.user, password: initialState.user.password}};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
