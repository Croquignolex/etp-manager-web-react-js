import Lodash from "lodash";

import * as actions from "./actions";
import {DONE} from "../../constants/typeConstants";

// Partial global store for users data management
const initialState = {
    page: 1,
    list: [],
    group: [],
    hasMoreData: false
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set fleets data
        case actions.STORE_SET_FLEETS_DATA:
            nextState = {list: action.fleets, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set fleets data
        case actions.STORE_SET_GROUP_FLEETS_DATA:
            nextState = {group: Lodash.groupBy(action.fleets, fleet => fleet.agent.id && fleet.operator.id)};
            return nextState || state;
        // Resolve event to set next fleets data
        case actions.STORE_SET_NEXT_FLEETS_DATA:
            nextState = {list: [...state.list, ...action.fleets], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll fleets data
        case actions.STORE_STOP_INFINITE_SCROLL_FLEETS_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to update fleet data
        case actions.STORE_UPDATE_FLEET_DATA:
            nextState = {
                ...state,
                list: Lodash.map(state.list, (item) => {
                    if(item.id === action.id) {
                        item.remaining = item.remaining - action.amount;
                        item.status = DONE;
                    }
                    return item;
                })
            };
            return nextState || state;
        // Resolve event to set fleet action data
        case actions.STORE_SET_FLEET_ACTION_DATA:
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
