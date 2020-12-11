import {
    STORE_SET_REFUEL_DATA,
    STORE_SET_REFUELS_DATA,
    STORE_SET_REFUELS_ACTION_DATA,
} from "./actions";

// Partial global store for refuels data management
const initialState = {
    list: [],
    current: {
        id: '', reference: '', amount: '', creation: '', type: '',
        note: '', vendor: '', receipt: '', status: '',

        collector: {id: '', name: ''},
        sim: {id: '', name: '', number: ''},
        agent: {id: '', name: '', reference: ''},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set refuels data
        case STORE_SET_REFUELS_DATA:
            nextState = {...state, list: action.refuels};
            return nextState || state;
        // Resolve event to set refuel data
        case STORE_SET_REFUEL_DATA:
            nextState = {...state, current: action.refuel};
            return nextState || state;
        // Resolve event to set sim action data
        case STORE_SET_REFUELS_ACTION_DATA:
            nextState = {...state, list: state.list.map(refuel => {
                        if(refuel.id === action.id) {
                            refuel.actionLoader = !refuel.actionLoader;
                        }
                        return refuel;
                    }
                )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
