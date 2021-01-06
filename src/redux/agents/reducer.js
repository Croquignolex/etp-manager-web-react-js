import Lodash from "lodash";

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
        // Resolve event to set agents data
        case actions.STORE_SET_AGENTS_DATA:
            nextState = {list: action.agents, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next agents data
        case actions.STORE_SET_NEXT_AGENTS_DATA:
            nextState = {list: [...state.list, ...action.agents], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll agents data
        case actions.STORE_STOP_INFINITE_SCROLL_AGENTS_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to set sim action data
        case actions.STORE_SET_SIM_ACTION_DATA:
            nextState = {
                ...state,
                list: Lodash.map(state.list, (item) => {
                    if(item.id === action.id) item.actionLoader = !item.actionLoader;
                    return item;
                })
            };
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce