import {
    STORE_SET_AGENT_DATA,
    STORE_SET_AGENTS_DATA,
    STORE_SET_AGENT_ACTION_DATA,
    STORE_SET_AGENT_TOGGLE_DATA,
    STORE_SET_AGENT_SIMS_ACTION_DATA,
} from "./actions";

// Partial global store for agents data management
const initialState = {
    list: [],
    current: {
        id: '', name: '', address: '',
        salePoint: '', frontIDCard: '', backIDCard: '',
        description: '', phone: '', email: '', creation: '',
        avatar: '', status: '', reference: '', town: '', country: '',

        role: {id: '', name: ''},
        creator: {id: '', name: ''},
        account: {id: '', balance: ''},
        zone: {id: '', name: '', reference: '', map: ''},

        sims: [],
    },
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set agents data
        case STORE_SET_AGENTS_DATA:
            nextState = {...state, list: action.agents};
            return nextState || state;
        // Resolve event to set agent data
        case STORE_SET_AGENT_DATA:
            nextState = {...state, current: action.agent};
            return nextState || state;
        // Resolve event to set agent sims action data
        case STORE_SET_AGENT_SIMS_ACTION_DATA:
            nextState = {...state, current: {...state.current, sims: state.current.sims.map(sim => {
                        if(sim.id === action.sim) {
                            sim.actionLoader = !sim.actionLoader;
                        }
                        return sim;
                    })
                }};
            return nextState || state;
        // Resolve event to set collector action data
        case STORE_SET_AGENT_TOGGLE_DATA:
            nextState = {...state, list: state.list.map(agent => {
                        if(agent.id === action.id) {
                            agent.toggleLoader = !agent.toggleLoader;
                        }
                        return agent;
                    }
                )};
            return nextState || state;
        // Resolve event to set agent action data
        case STORE_SET_AGENT_ACTION_DATA:
            nextState = {...state, list: state.list.map(agent => {
                        if(agent.id === action.id) {
                            agent.actionLoader = !agent.actionLoader;
                        }
                        return agent;
                    }
                )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce