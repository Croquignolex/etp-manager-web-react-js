import {
    STORE_SET_USER_CHECK_ERROR_DATA,
    STORE_RESET_USER_CHECK_ERROR_DATA,
    STORE_SET_USER_PROFILE_EDIT_ERROR_DATA,
    STORE_SET_USER_PASSWORD_EDIT_ERROR_DATA,
    STORE_RESET_USER_PROFILE_EDIT_ERROR_DATA,
    STORE_RESET_USER_PASSWORD_EDIT_ERROR_DATA
} from "./actions";

// Partial global store for error data management
const initialState = {
    user: {
        check: {show: false, message: ''},
        profile: {show: false, message: ''},
        password: {show: false, message: ''},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== User check
        // Resolve event to reset error store data
        case STORE_RESET_USER_CHECK_ERROR_DATA:
            nextState = {...state, user: {...state.user, check: initialState.user.check}};
            return nextState || state;
        // Resolve event to set error store data
        case STORE_SET_USER_CHECK_ERROR_DATA:
            nextState = {...state, user: {...state.user, check: {show: true, message: action.message}}};
            return nextState || state;
        // ======================================================== User password edit
        // Resolve event to reset error store data
        case STORE_RESET_USER_PASSWORD_EDIT_ERROR_DATA:
            nextState = {...state, user: {...state.user, password: initialState.user.password}};
            return nextState || state;
        // Resolve event to set error store data
        case STORE_SET_USER_PASSWORD_EDIT_ERROR_DATA:
            nextState = {...state, user: {...state.user, password: {show: true, message: action.message}}};
            return nextState || state;
        // ======================================================== User profile edit
        // Resolve event to reset error store data
        case STORE_RESET_USER_PROFILE_EDIT_ERROR_DATA:
            nextState = {...state, user: {...state.user, profile: initialState.user.profile}};
            return nextState || state;
        // Resolve event to set error store data
        case STORE_SET_USER_PROFILE_EDIT_ERROR_DATA:
            nextState = {...state, user: {...state.user, profile: {show: true, message: action.message}}};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce