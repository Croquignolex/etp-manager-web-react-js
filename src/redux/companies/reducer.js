import {
    STORE_SET_COMPANY_DATA,
    STORE_SET_COMPANIES_DATA,
    STORE_SET_COMPANY_ACTION_DATA,
    STORE_SET_COMPANY_SIMS_ACTION_DATA,
} from "./actions";

// Partial global store for companies data management
const initialState = {
    list: [],
    current: {
        id: '', name: '', manager: '', phone: '', document: '',
        address: '', creation: '', description: '',

        sims: [],
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set companies data
        case STORE_SET_COMPANIES_DATA:
            nextState = {...state, list: action.companies};
            return nextState || state;
        // Resolve event to set company data
        case STORE_SET_COMPANY_DATA:
            nextState = {...state, current: action.company};
            return nextState || state;
        // Resolve event to set company action data
        case STORE_SET_COMPANY_ACTION_DATA:
            nextState = {...state, list: state.list.map(company => {
                    if(company.id === action.id) {
                        company.actionLoader = !company.actionLoader;
                    }
                    return company;
                }
            )};
            return nextState || state;
        // Resolve event to set company sims action data
        case STORE_SET_COMPANY_SIMS_ACTION_DATA:
            nextState = {...state, current: {...state.current, sims: state.current.sims.map(sim => {
                        if(sim.id === action.sim) {
                            sim.actionLoader = !sim.actionLoader;
                        }
                        return sim;
                    })
                }};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
