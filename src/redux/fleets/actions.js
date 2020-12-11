// Reducer action types
export const STORE_SET_FLEET_DATA = 'STORE_SET_FLEET_DATA';
export const STORE_SET_FLEETS_DATA = 'STORE_SET_FLEETS_DATA';
export const STORE_SET_FLEET_ACTION_DATA = 'STORE_SET_FLEET_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_FLEET_BY_AGENT = 'EMIT_NEW_FLEET_BY_AGENT';
export const EMIT_FLEET_FETCH_BY_AGENT = 'EMIT_FLEET_FETCH_BY_AGENT';
export const EMIT_UPDATE_FLEET_BY_AGENT = 'EMIT_UPDATE_FLEET_BY_AGENT';
export const EMIT_FLEETS_FETCH_BY_AGENT = 'EMIT_FLEETS_FETCH_BY_AGENT';
export const EMIT_FLEET_CANCEL_BY_AGENT = 'EMIT_FLEET_CANCEL_BY_AGENT';

export const EMIT_NEW_FLEET_BY_COLLECTOR = 'EMIT_NEW_FLEET_BY_COLLECTOR';
export const EMIT_FLEET_FETCH_BY_COLLECTOR = 'EMIT_FLEET_FETCH_BY_COLLECTOR';
export const EMIT_FLEET_CANCEL_BY_COLLECTOR = 'EMIT_FLEET_CANCEL_BY_COLLECTOR';
export const EMIT_UPDATE_FLEET_BY_COLLECTOR = 'EMIT_UPDATE_FLEET_BY_COLLECTOR';
export const EMIT_FLEETS_FETCH_BY_COLLECTOR = 'EMIT_FLEETS_FETCH_BY_COLLECTOR';

export const EMIT_UPDATE_FLEET_BY_MANAGER = 'EMIT_UPDATE_FLEET_BY_MANAGER';
export const EMIT_FLEETS_FETCH_BY_MANAGER = 'EMIT_FLEETS_FETCH_BY_MANAGER';
export const EMIT_FLEET_ADD_SUPPLY_BY_MANAGER = 'EMIT_FLEET_ADD_SUPPLY_BY_MANAGER';

//====================== Reducer trigger actions
// Set fleets data in store
export const storeSetFleetsData = ({fleets}) => ({
    fleets,
    type: STORE_SET_FLEETS_DATA
});

// Set fleet data in store
export const storeSetFleetData = ({fleet}) => ({
    fleet,
    type: STORE_SET_FLEET_DATA
});

// Set fleet action data in store
export const storeSetFleetActionData = ({id}) => ({
    id,
    type: STORE_SET_FLEET_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit fleets fetch by agent
export const emitFleetsFetchByAgent = () => ({
    type: EMIT_FLEETS_FETCH_BY_AGENT
});

// Emit fleets fetch by manager
export const emitFleetsFetchByManager = () => ({
    type: EMIT_FLEETS_FETCH_BY_MANAGER
});

// Emit fleets fetch by collector
export const emitFleetsFetchByCollector = () => ({
    type: EMIT_FLEETS_FETCH_BY_COLLECTOR
});

// Emit fleets fetch by id by agent
export const emitFleetFetchByAgent = ({id}) => ({
    id,
    type: EMIT_FLEET_FETCH_BY_AGENT
});

// Emit fleets fetch by id by manager
export const emitFleetFetchByManager = ({id}) => ({
    id,
    type: EMIT_FLEET_FETCH_BY_AGENT
});

// Emit fleet fetch by id by agent
export const emitFleetFetchByCollector = ({id}) => ({
    id,
    type: EMIT_FLEET_FETCH_BY_COLLECTOR
});

// Emit new fleet by agent
export const emitNewFleetByAgent = ({sim, amount}) => ({
    sim,
    amount,
    type: EMIT_NEW_FLEET_BY_AGENT
});

// Emit new fleet by collector
export const emitNewFleetByCollector = ({sim, amount, agent}) => ({
    sim,
    agent,
    amount,
    type: EMIT_NEW_FLEET_BY_COLLECTOR
});

// Emit update fleet by agent
export const emitUpdateFleetByAgent = ({id, sim, amount}) => ({
    id,
    sim,
    amount,
    type: EMIT_UPDATE_FLEET_BY_AGENT
});

// Emit update fleet by manager
export const emitUpdateFleetByManager = ({id, reference}) => ({
    id,
    reference,
    type: EMIT_UPDATE_FLEET_BY_MANAGER
});

// Emit update fleet by collector
export const emitUpdateFleetByCollector = ({id, sim, amount, agent}) => ({
    id,
    sim,
    agent,
    amount,
    type: EMIT_UPDATE_FLEET_BY_COLLECTOR
});

// Emit fleet cancel by id by agent
export const emitFleetCancelByAgent = ({id}) => ({
    id,
    type: EMIT_FLEET_CANCEL_BY_AGENT
});


// Emit fleet cancel by id by collector
export const emitFleetCancelByCollector = ({id}) => ({
    id,
    type: EMIT_FLEET_CANCEL_BY_COLLECTOR
});

// Emit fleet add supply by manager
export const emitFleetAddSupplyByManager = ({id, amount, sim}) => ({
    id,
    sim,
    amount,
    type: EMIT_FLEET_ADD_SUPPLY_BY_MANAGER
});


