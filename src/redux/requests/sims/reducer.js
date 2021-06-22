import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    all: {failed: false, loading: false, succeeded: false, message: ""},
    list: {failed: false, loading: false, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
    show: {failed: false, loading: false, succeeded: false, message: ""},
    fleet: {failed: false, loading: false, succeeded: false, message: ""},
    internal: {failed: false, loading: false, succeeded: false, message: ""},
    operator: {failed: false, loading: false, succeeded: false, message: ""},
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== Sims
        // Resolve event to set sims init request store data
        case actions.STORE_SIMS_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set sims failed request store data
        case actions.STORE_SIMS_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set sims succeeded request store data
        case actions.STORE_SIMS_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set sims reset request store data
        case actions.STORE_SIMS_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next sims
        // Resolve event to set next sims init request store data
        case actions.STORE_NEXT_SIMS_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next sims failed request store data
        case actions.STORE_NEXT_SIMS_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next sims succeeded request store data
        case actions.STORE_NEXT_SIMS_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next sims reset request store data
        case actions.STORE_NEXT_SIMS_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ======================================================== All sims
        // Resolve event to set all sims  init request store data
        case actions.STORE_ALL_SIMS_REQUEST_INIT:
            nextState = {...state, all: requestInitValue()};
            return nextState || state;
        // Resolve event to set all sims failed request store data
        case actions.STORE_ALL_SIMS_REQUEST_FAILED:
            nextState = {...state, all: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set all sims succeeded request store data
        case actions.STORE_ALL_SIMS_REQUEST_SUCCEEDED:
            nextState = {...state, all: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set all sims reset request store data
        case actions.STORE_ALL_SIMS_REQUEST_RESET:
            nextState = {...state, all: initialState.all};
            return nextState || state;
        // ======================================================== Sim
        // Resolve event to set sim init request store data
        case actions.STORE_SIM_REQUEST_INIT:
            nextState = {...state, show: requestInitValue()};
            return nextState || state;
        // Resolve event to set sim failed request store data
        case actions.STORE_SIM_REQUEST_FAILED:
            nextState = {...state, show: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set sim succeeded request store data
        case actions.STORE_SIM_REQUEST_SUCCEEDED:
            nextState = {...state, show: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set sim reset request store data
        case actions.STORE_SIM_REQUEST_RESET:
            nextState = {...state, show: initialState.show};
            return nextState || state;
        // ======================================================== All flee sims
        // Resolve event to set all fleet sims init request store data
        case actions.STORE_ALL_FLEET_SIMS_REQUEST_INIT:
            nextState = {...state, fleet: requestInitValue()};
            return nextState || state;
        // Resolve event to set all fleet sims failed request store data
        case actions.STORE_ALL_FLEET_SIMS_REQUEST_FAILED:
            nextState = {...state, fleet: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set all fleet sims succeeded request store data
        case actions.STORE_ALL_FLEET_SIMS_REQUEST_SUCCEEDED:
            nextState = {...state, fleet: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set all fleet sims reset request store data
        case actions.STORE_ALL_FLEET_SIMS_REQUEST_RESET:
            nextState = {...state, fleet: initialState.fleet};
            return nextState || state;
        // ======================================================== All internal sims
        // Resolve event to set all internal sims init request store data
        case actions.STORE_ALL_INTERNAL_SIMS_REQUEST_INIT:
            nextState = {...state, internal: requestInitValue()};
            return nextState || state;
        // Resolve event to set all internal sims failed request store data
        case actions.STORE_ALL_INTERNAL_SIMS_REQUEST_FAILED:
            nextState = {...state, internal: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set all internal sims succeeded request store data
        case actions.STORE_ALL_INTERNAL_SIMS_REQUEST_SUCCEEDED:
            nextState = {...state, internal: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set all internal sims reset request store data
        case actions.STORE_ALL_INTERNAL_SIMS_REQUEST_RESET:
            nextState = {...state, internal: initialState.internal};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
