import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    message: "",
    failed: false,
    loading: false,
    succeeded: false
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set notifications init request store data
        case actions.STORE_NOTIFICATIONS_REQUEST_INIT:
            nextState = requestInitValue();
            return nextState || state;
        // Resolve event to set notifications failed request store data
        case actions.STORE_NOTIFICATIONS_REQUEST_FAILED:
            nextState = requestFailedValue(action.message);
            return nextState || state;
        // Resolve event to set notifications succeeded request store data
        case actions.STORE_NOTIFICATIONS_REQUEST_SUCCEEDED:
            nextState = requestSucceededValue(action.message);
            return nextState || state;
        // Resolve event to set notifications reset request store data
        case actions.STORE_NOTIFICATIONS_REQUEST_RESET:
            nextState = initialState;
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
