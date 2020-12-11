// Reducer action types
export const STORE_SET_CLEARANCE_DATA = 'STORE_SET_CLEARANCE_DATA';
export const STORE_SET_CLEARANCES_DATA = 'STORE_SET_CLEARANCES_DATA';
export const STORE_SET_CLEARANCE_ACTION_DATA = 'STORE_SET_CLEARANCE_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_CLEARANCE_BY_AGENT = 'EMIT_NEW_CLEARANCE_BY_AGENT';
export const EMIT_CLEARANCE_FETCH_BY_AGENT = 'EMIT_CLEARANCE_FETCH_BY_AGENT';
export const EMIT_UPDATE_CLEARANCE_BY_AGENT = 'EMIT_UPDATE_CLEARANCE_BY_AGENT';
export const EMIT_CLEARANCES_FETCH_BY_AGENT = 'EMIT_CLEARANCES_FETCH_BY_AGENT';
export const EMIT_CLEARANCE_CANCEL_BY_AGENT = 'EMIT_CLEARANCE_CANCEL_BY_AGENT';

export const EMIT_NEW_CLEARANCE_BY_COLLECTOR = 'EMIT_NEW_CLEARANCE_BY_COLLECTOR';
export const EMIT_CLEARANCE_FETCH_BY_COLLECTOR = 'EMIT_CLEARANCE_FETCH_BY_COLLECTOR';
export const EMIT_CLEARANCE_CANCEL_BY_COLLECTOR = 'EMIT_CLEARANCE_CANCEL_BY_COLLECTOR';
export const EMIT_UPDATE_CLEARANCE_BY_COLLECTOR = 'EMIT_UPDATE_CLEARANCE_BY_COLLECTOR';
export const EMIT_CLEARANCES_FETCH_BY_COLLECTOR = 'EMIT_CLEARANCES_FETCH_BY_COLLECTOR';
export const EMIT_CLEARANCE_PROCEED_BY_COLLECTOR = 'EMIT_CLEARANCE_PROCEED_BY_COLLECTOR';

//====================== Reducer trigger actions
// Set clearances data in store
export const storeSetClearancesData = ({clearances}) => ({
    clearances,
    type: STORE_SET_CLEARANCES_DATA
});

// Set clearance data in store
export const storeSetClearanceData = ({clearance}) => ({
    clearance,
    type: STORE_SET_CLEARANCE_DATA
});

// Set clearance action data in store
export const storeSetClearanceActionData = ({id}) => ({
    id,
    type: STORE_SET_CLEARANCE_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit clearances fetch by agent
export const emitClearancesFetchByAgent = () => ({
    type: EMIT_CLEARANCES_FETCH_BY_AGENT
});

// Emit clearances fetch by collector
export const emitClearancesFetchByCollector = () => ({
    type: EMIT_CLEARANCES_FETCH_BY_COLLECTOR
});

// Emit clearance fetch by agent id
export const emitClearanceFetchByAgent = ({id}) => ({
    id,
    type: EMIT_CLEARANCE_FETCH_BY_AGENT
});

// Emit clearance fetch by id by collector
export const emitClearanceFetchByCollector = ({id}) => ({
    id,
    type: EMIT_CLEARANCE_FETCH_BY_COLLECTOR
});

// Emit new clearance by agent
export const emitNewClearanceByAgent = ({sim, amount}) => ({
    sim,
    amount,
    type: EMIT_NEW_CLEARANCE_BY_AGENT
});

// Emit new clearance by collector
export const emitNewClearanceByCollector = ({sim, amount, agent}) => ({
    sim,
    agent,
    amount,
    type: EMIT_NEW_CLEARANCE_BY_COLLECTOR
});

// Emit update clearance by agent
export const emitUpdateClearanceByAgent = ({id, sim, amount}) => ({
    id,
    sim,
    amount,
    type: EMIT_UPDATE_CLEARANCE_BY_AGENT
});

// Emit update clearance by agent
export const emitUpdateClearanceByCollector = ({id, sim, amount, agent}) => ({
    id,
    sim,
    agent,
    amount,
    type: EMIT_UPDATE_CLEARANCE_BY_COLLECTOR
});

// Emit clearance cancel by agent id
export const emitClearanceCancelByAgent = ({id}) => ({
    id,
    type: EMIT_CLEARANCE_CANCEL_BY_AGENT
});

// Emit clearance cancel by id by collector
export const emitClearanceCancelByCollector = ({id}) => ({
    id,
    type: EMIT_CLEARANCE_CANCEL_BY_COLLECTOR
});

// Emit clearance proceed by collector id
export const emitClearanceProceedByCollector = ({id, amount}) => ({
    id,
    amount,
    type: EMIT_CLEARANCE_PROCEED_BY_COLLECTOR
});
