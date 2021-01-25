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
        // Resolve event to set anonymous data
        case actions.STORE_SET_ANONYMOUS_DATA:
            nextState = {list: action.anonymous, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next anonymous data
        case actions.STORE_SET_NEXT_ANONYMOUS_DATA:
            nextState = {list: [...state.list, ...action.anonymous], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll anonymous data
        case actions.STORE_STOP_INFINITE_SCROLL_ANONYMOUS_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to set new anonymous data
        case actions.STORE_SET_NEW_ANONYMOUS_DATA:
            nextState = {...state, list: [action.anonymous, ...state.list]}
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce