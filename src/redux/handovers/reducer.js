import Lodash from "lodash";

import * as actions from "./actions";
import {CANCEL, DONE} from "../../constants/typeConstants";

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
        // Resolve event to set handovers data
        case actions.STORE_SET_HANDOVERS_DATA:
            nextState = {list: action.handovers, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next handovers data
        case actions.STORE_SET_NEXT_HANDOVERS_DATA:
            nextState = {list: [...state.list, ...action.handovers], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll handovers data
        case actions.STORE_STOP_INFINITE_SCROLL_HANDOVER_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to set new handover data
        case actions.STORE_SET_NEW_HANDOVER_DATA:
            nextState = {...state, list: [action.handover, ...state.list]}
            return nextState || state;
        // Resolve event to update handover data
        case actions.STORE_UPDATE_HANDOVER_DATA:
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
        // Resolve event to cancel handover data
        case actions.STORE_CANCEL_HANDOVER_DATA:
            nextState = {
                ...state,
                list: Lodash.map(state.list, (item) => {
                    if(item.id === action.id) {
                        item.status = CANCEL;
                    }
                    return item;
                })
            };
            return nextState || state;
        // Resolve event to set handover action data
        case actions.STORE_SET_HANDOVER_ACTION_DATA:
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