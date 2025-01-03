import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    list: {failed: false, loading: false, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
    apply: {failed: false, loading: false, succeeded: false, message: ""},
    cancel: {failed: false, loading: false, succeeded: false, message: ""},
    improve: {failed: false, loading: false, succeeded: false, message: ""},
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== Handover
        // Resolve event to set handovers init request store data
        case actions.STORE_HANDOVERS_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set handovers failed request store data
        case actions.STORE_HANDOVERS_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set handovers succeeded request store data
        case actions.STORE_HANDOVERS_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set handovers reset request store data
        case actions.STORE_HANDOVERS_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next handovers
        // Resolve event to set next handovers init request store data
        case actions.STORE_NEXT_HANDOVERS_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next handovers failed request store data
        case actions.STORE_NEXT_HANDOVERS_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next handovers succeeded request store data
        case actions.STORE_NEXT_HANDOVERS_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next handovers reset request store data
        case actions.STORE_NEXT_HANDOVERS_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ======================================================== Improve handover
        // Resolve event to set improve handover init request store data
        case actions.STORE_IMPROVE_HANDOVER_REQUEST_INIT:
            nextState = {...state, improve: requestInitValue()};
            return nextState || state;
        // Resolve event to set improve handover failed request store data
        case actions.STORE_IMPROVE_HANDOVER_REQUEST_FAILED:
            nextState = {...state, improve: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set improve handover succeeded request store data
        case actions.STORE_IMPROVE_HANDOVER_REQUEST_SUCCEEDED:
            nextState = {...state, improve: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set improve handover reset request store data
        case actions.STORE_IMPROVE_HANDOVER_REQUEST_RESET:
            nextState = {...state, improve: initialState.improve};
            return nextState || state;
        // ======================================================== Confirm handover
        // Resolve event to set confirm handover init request store data
        case actions.STORE_CONFIRM_HANDOVER_REQUEST_INIT:
            nextState = {...state, apply: requestInitValue()};
            return nextState || state;
        // Resolve event to set confirm handover failed request store data
        case actions.STORE_CONFIRM_HANDOVER_REQUEST_FAILED:
            nextState = {...state, apply: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set confirm handover succeeded request store data
        case actions.STORE_CONFIRM_HANDOVER_REQUEST_SUCCEEDED:
            nextState = {...state, apply: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set confirm handover reset request store data
        case actions.STORE_CONFIRM_HANDOVER_REQUEST_RESET:
            nextState = {...state, apply: initialState.apply};
            return nextState || state;
        // ======================================================== Cancel handover
        // Resolve event to set cancel handover init request store data
        case actions.STORE_CANCEL_HANDOVER_REQUEST_INIT:
            nextState = {...state, cancel: requestInitValue()};
            return nextState || state;
        // Resolve event to set cancel handover failed request store data
        case actions.STORE_CANCEL_HANDOVER_REQUEST_FAILED:
            nextState = {...state, cancel: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set cancel handover succeeded request store data
        case actions.STORE_CANCEL_HANDOVER_REQUEST_SUCCEEDED:
            nextState = {...state, cancel: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set cancel handover reset request store data
        case actions.STORE_CANCEL_HANDOVER_REQUEST_RESET:
            nextState = {...state, cancel: initialState.cancel};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
