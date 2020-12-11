import {
    STORE_RESET_ERROR_DATA,
    STORE_SET_DANGER_ERROR_DATA,
    STORE_SET_WARNING_ERROR_DATA
} from "./actions";

// Partial global store for error data management
const initialState = {
    list: [],
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to reset error store data
        case STORE_RESET_ERROR_DATA:
            nextState = {...state, list: setErrorAlert(state.list, action.scope)};
            return nextState || state;
        // Resolve event to set danger error store data
        case STORE_SET_DANGER_ERROR_DATA:
            nextState = {...state,
                list: setErrorAlert(
                    state.list, action.scope,
                    action.message, true, 'danger'
                )
            };
            return nextState || state;
        // Resolve event to set warning error store data
        case STORE_SET_WARNING_ERROR_DATA:
            nextState = {...state,
                list: setErrorAlert(
                    state.list, action.scope,
                    action.message, true, 'warning'
                )
            };
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

// Get next state
function setErrorAlert(errors, scope, message = '', show = false, variant = '') {
    // Check if scope is already registered
    if(errors.find(item => item.scope === scope)) {
        // Then update
        errors = errors.map(item => {
            if(item.scope === scope) {
                item.show = show;
                item.message = message;
                item.variant = variant;
            }
            return item;
        });
        // Else add
    } else errors.push({message, show, variant, scope});
    return errors;
}

export default reduce