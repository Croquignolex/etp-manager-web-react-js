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
        // Resolve event to set payments data
        case actions.STORE_SET_PAYMENTS_DATA:
            nextState = {list: action.payments, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next payments data
        case actions.STORE_SET_NEXT_PAYMENTS_DATA:
            nextState = {list: [...state.list, ...action.payments], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll payments data
        case actions.STORE_STOP_INFINITE_SCROLL_PAYMENT_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to set new payment data
        case actions.STORE_SET_NEW_PAYMENT_DATA:
            nextState = {...state, list: [action.payment, ...state.list]}
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce