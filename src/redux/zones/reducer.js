import {
    STORE_SET_ZONE_DATA,
    STORE_SET_ZONES_DATA,
    STORE_SET_ZONE_ACTION_DATA,
    STORE_SET_ZONE_AGENTS_ACTION_DATA,
    STORE_SET_ZONE_COLLECTORS_ACTION_DATA,
} from "./actions";

// Partial global store for sims data management
const initialState = {
    list: [],
    current: {
        id: '', name: '', reference: '', map: '', description: '', creation: '',

        agents: [],
        collector: {id: '', name: '', phone: ''},
    },
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set zones data
        case STORE_SET_ZONES_DATA:
            nextState = {...state, list: action.zones};
            return nextState || state;
        // Resolve event to set zone data
        case STORE_SET_ZONE_DATA:
            nextState = {...state, current: action.zone};
            return nextState || state;
        // Resolve event to set zone agents action data
        case STORE_SET_ZONE_AGENTS_ACTION_DATA:
            nextState = {...state, current: {...state.current, sims: state.current.agents.map(agent => {
                        if(agent.id === action.agent) {
                            agent.actionLoader = !agent.actionLoader;
                        }
                        return agent;
                    })
                }};
            return nextState || state;
        // Resolve event to set zone collectors action data
        case STORE_SET_ZONE_COLLECTORS_ACTION_DATA:
            nextState = {...state, current: {...state.current, sims: state.current.collectors.map(collector => {
                        if(collector.id === action.collector) {
                            collector.actionLoader = !collector.actionLoader;
                        }
                        return collector;
                    })
                }};
            return nextState || state;
        // Resolve event to set zone action data
        case STORE_SET_ZONE_ACTION_DATA:
            nextState = {...state, list: state.list.map(zone => {
                    if(zone.id === action.id) {
                        zone.actionLoader = !zone.actionLoader;
                    }
                    return zone;
                }
            )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce