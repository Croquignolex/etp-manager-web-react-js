import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    add: {failed: false, loading: false, succeeded: false, message: ""},
    list: {failed: false, loading: false, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
    apply: {failed: false, loading: false, succeeded: false, message: ""},
    anonymous: {failed: false, loading: false, succeeded: false, message: ""},
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== Refuels
        // Resolve event to set refuels init request store data
        case actions.STORE_REFUELS_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set refuels failed request store data
        case actions.STORE_REFUELS_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set refuels succeeded request store data
        case actions.STORE_REFUELS_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set refuels reset request store data
        case actions.STORE_REFUELS_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next refuels
        // Resolve event to set next refuels init request store data
        case actions.STORE_NEXT_REFUELS_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next refuels failed request store data
        case actions.STORE_NEXT_REFUELS_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next refuels succeeded request store data
        case actions.STORE_NEXT_REFUELS_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next refuels reset request store data
        case actions.STORE_NEXT_REFUELS_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ======================================================== Add refuel
        // Resolve event to set add refuel init request store data
        case actions.STORE_ADD_REFUEL_REQUEST_INIT:
            nextState = {...state, add: requestInitValue()};
            return nextState || state;
        // Resolve event to set add refuel failed request store data
        case actions.STORE_ADD_REFUEL_REQUEST_FAILED:
            nextState = {...state, add: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set add refuel succeeded request store data
        case actions.STORE_ADD_REFUEL_REQUEST_SUCCEEDED:
            nextState = {...state, add: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set add refuel reset request store data
        case actions.STORE_ADD_REFUEL_REQUEST_RESET:
            nextState = {...state, add: initialState.add};
            return nextState || state;
        // ======================================================== Confirm refuel
        // Resolve event to set confirm refuel init request store data
        case actions.STORE_CONFIRM_REFUEL_REQUEST_INIT:
            nextState = {...state, apply: requestInitValue()};
            return nextState || state;
        // Resolve event to set confirm refuel  failed request store data
        case actions.STORE_CONFIRM_REFUEL_REQUEST_FAILED:
            nextState = {...state, apply: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set confirm refuel  succeeded request store data
        case actions.STORE_CONFIRM_REFUEL_REQUEST_SUCCEEDED:
            nextState = {...state, apply: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set confirm refuel  reset request store data
        case actions.STORE_CONFIRM_REFUEL_REQUEST_RESET:
            nextState = {...state, apply: initialState.apply};
            return nextState || state;
        // ======================================================== Add anonymous refuel
        // Resolve event to set add anonymous refuel init request store data
        case actions.STORE_ADD_ANONYMOUS_REFUEL_REQUEST_INIT:
            nextState = {...state, anonymous: requestInitValue()};
            return nextState || state;
        // Resolve event to set add anonymous refuel failed request store data
        case actions.STORE_ADD_ANONYMOUS_REFUEL_REQUEST_FAILED:
            nextState = {...state, anonymous: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set add anonymous refuel succeeded request store data
        case actions.STORE_ADD_ANONYMOUS_REFUEL_REQUEST_SUCCEEDED:
            nextState = {...state, anonymous: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set add anonymous refuel reset request store data
        case actions.STORE_ADD_ANONYMOUS_REFUEL_REQUEST_RESET:
            nextState = {...state, anonymous: initialState.anonymous};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
