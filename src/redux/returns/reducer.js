import Lodash from "lodash";
import * as actions from "./actions";

import {DONE} from "../../constants/typeConstants";

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
        // Resolve event to set returns data
        case actions.STORE_SET_RETURNS_DATA:
            nextState = {list: action.returns, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next returns data
        case actions.STORE_SET_NEXT_RETURNS_DATA:
            nextState = {list: [...state.list, ...action.returns], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll returns data
        case actions.STORE_STOP_INFINITE_SCROLL_RETURNS_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to update return data
        case actions.STORE_UPDATE_RETURN_DATA:
            nextState = {
                ...state,
                list: Lodash.map(state.list, (item) => {
                    if(item.id === action.id) {
                        item.status = DONE;
                    }
                    return item;
                })
            };
            return nextState || state;
        // Resolve event to set return action data
        case actions.STORE_SET_RETURN_ACTION_DATA:
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