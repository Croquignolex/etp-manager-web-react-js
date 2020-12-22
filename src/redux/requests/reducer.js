import {
    STORE_USER_CHECK_REQUEST_INIT,
    STORE_USER_CHECK_REQUEST_RESET,
    STORE_USER_CHECK_REQUEST_FAILED,
    STORE_USER_CHECK_REQUEST_SUCCEEDED,
    STORE_USER_AVATAR_EDIT_REQUEST_INIT,
    STORE_USER_PROFILE_EDIT_REQUEST_INIT,
    STORE_USER_AVATAR_EDIT_REQUEST_RESET,
    STORE_USER_PASSWORD_EDIT_REQUEST_INIT,
    STORE_USER_AVATAR_EDIT_REQUEST_FAILED,
    STORE_USER_PROFILE_EDIT_REQUEST_RESET,
    STORE_USER_PASSWORD_EDIT_REQUEST_RESET,
    STORE_USER_PROFILE_EDIT_REQUEST_FAILED,
    STORE_USER_PASSWORD_EDIT_REQUEST_FAILED,
    STORE_USER_AVATAR_EDIT_REQUEST_SUCCEEDED,
    STORE_USER_PROFILE_EDIT_REQUEST_SUCCEEDED,
    STORE_USER_PASSWORD_EDIT_REQUEST_SUCCEEDED
} from "./actions";

// Partial global store for requests data management
const initialState = {
    user: {
        check: {failed: false, loading: false, succeeded: false, message: ""},
        avatar: {failed: false, loading: false, succeeded: false, message: ""},
        profile: {failed: false, loading: false, succeeded: false, message: ""},
        password: {failed: false, loading: false, succeeded: false, message: ""},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== User check
        // Resolve event to set user check init request store data
        case STORE_USER_CHECK_REQUEST_INIT:
            nextState = {...state, user: {...state.user, check: getInitValue()}};
            return nextState || state;
        // Resolve event to set user check failed request store data
        case STORE_USER_CHECK_REQUEST_FAILED:
            nextState = {...state, user: {...state.user, check: getFailedValue(action.message)}};
            return nextState || state;
        // Resolve event to set user check succeeded request store data
        case STORE_USER_CHECK_REQUEST_SUCCEEDED:
            nextState = {...state, user: {...state.user, check: getSucceededValue(action.message)}};
            return nextState || state;
        // Resolve event to set user check reset request store data
        case STORE_USER_CHECK_REQUEST_RESET:
            nextState = {...state, user: {...state.user, check: initialState.user.check}};
            return nextState || state;
        // ======================================================== User password edit
        // Resolve event to set user check init request store data
        case STORE_USER_PASSWORD_EDIT_REQUEST_INIT:
            nextState = {...state, user: {...state.user, password: getInitValue()}};
            return nextState || state;
        // Resolve event to set user check failed request store data
        case STORE_USER_PASSWORD_EDIT_REQUEST_FAILED:
            nextState = {...state, user: {...state.user, password: getFailedValue(action.message)}};
            return nextState || state;
        // Resolve event to set user check succeeded request store data
        case STORE_USER_PASSWORD_EDIT_REQUEST_SUCCEEDED:
            nextState = {...state, user: {...state.user, password: getSucceededValue(action.message)}};
            return nextState || state;
        // Resolve event to set user check reset request store data
        case STORE_USER_PASSWORD_EDIT_REQUEST_RESET:
            nextState = {...state, user: {...state.user, password: initialState.user.password}};
            return nextState || state;
        // ======================================================== User profile edit
        // Resolve event to set user check init request store data
        case STORE_USER_PROFILE_EDIT_REQUEST_INIT:
            nextState = {...state, user: {...state.user, profile: getInitValue()}};
            return nextState || state;
        // Resolve event to set user check failed request store data
        case STORE_USER_PROFILE_EDIT_REQUEST_FAILED:
            nextState = {...state, user: {...state.user, profile: getFailedValue(action.message)}};
            return nextState || state;
        // Resolve event to set user check succeeded request store data
        case STORE_USER_PROFILE_EDIT_REQUEST_SUCCEEDED:
            nextState = {...state, user: {...state.user, profile: getSucceededValue(action.message)}};
            return nextState || state;
        // Resolve event to set user check reset request store data
        case STORE_USER_PROFILE_EDIT_REQUEST_RESET:
            nextState = {...state, user: {...state.user, profile: initialState.user.profile}};
            return nextState || state;
        // ======================================================== User avatar edit
        // Resolve event to set user check init request store data
        case STORE_USER_AVATAR_EDIT_REQUEST_INIT:
            nextState = {...state, user: {...state.user, avatar: getInitValue()}};
            return nextState || state;
        // Resolve event to set user check failed request store data
        case STORE_USER_AVATAR_EDIT_REQUEST_FAILED:
            nextState = {...state, user: {...state.user, avatar: getFailedValue(action.message)}};
            return nextState || state;
        // Resolve event to set user check succeeded request store data
        case STORE_USER_AVATAR_EDIT_REQUEST_SUCCEEDED:
            nextState = {...state, user: {...state.user, avatar: getSucceededValue(action.message)}};
            return nextState || state;
        // Resolve event to set user check reset request store data
        case STORE_USER_AVATAR_EDIT_REQUEST_RESET:
            nextState = {...state, user: {...state.user, avatar: initialState.user.avatar}};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

function getInitValue() {
    return {failed: false, loading: true, succeeded: false, message: ""}
}

function getFailedValue(message) {
    return {failed: true, loading: false, succeeded: false, message}
}

function getSucceededValue(message) {
    return {failed: false, loading: false, succeeded: true, message}
}

export default reduce
