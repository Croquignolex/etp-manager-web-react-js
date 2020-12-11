import {
    STORE_SET_FLEET_DATA,
    STORE_SET_FLEETS_DATA,
    STORE_SET_FLEET_ACTION_DATA
} from "./actions";

// Partial global store for fleets data management
const initialState = {
    list: [],
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
        case STORE_SET_FLEETS_DATA:
            nextState = {...state, list: action.fleets};
            return nextState || state;
        // Resolve event to set fleet data
        case STORE_SET_FLEET_DATA:
            nextState = {...state, current: action.fleet};
            return nextState || state;
        // Resolve event to set operator action data
        case STORE_SET_FLEET_ACTION_DATA:
            nextState = {...state, list: state.list.map(fleet => {
                        if(fleet.id === action.id) {
                            fleet.actionLoader = !fleet.actionLoader;
                        }
                        return fleet;
                    }
                )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce