import Lodash from "lodash";

import * as actions from "./actions";

// Partial global store for users data management
const initialState = {
    page: 1,
    list: [],
    hasMoreData: false,
    current: {
        id: '', reference: '', amount: '', status: '', creation: '',

        sim: {id: '', name: '', number: ''},
        claimant: {id: '', name: '', phone: ''},
        agent: {id: '', name: '', reference: ''},

        supplies: []
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set fleets data
        case actions.STORE_SET_FLEETS_DATA:
            nextState = {list: action.fleets, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to delete fleets data
        case actions.STORE_SET_NEXT_FLEETS_DATA:
            nextState = {list: [...state.list, ...action.fleets], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set fleet data
        case actions.STORE_UPDATE_FLEET_DATA:
            nextState = {
                ...state,
                list: Lodash.map(state.list, (item) => {
                    if(item.id === action.id) item.actionLoader = !item.actionLoader;
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