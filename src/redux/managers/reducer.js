import * as actions from "./actions";

// Partial global store for users data management
const initialState = {
    page: 1,
    list: [],
    hasMoreData: false
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set collectors data
        case actions.STORE_SET_COLLECTORS_DATA:
            nextState = {...state, list: action.collectors, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce