// Reducer action types
export const STORE_SET_REFUEL_DATA = 'STORE_SET_REFUEL_DATA';
export const STORE_SET_REFUELS_DATA = 'STORE_SET_REFUELS_DATA';
export const STORE_SET_REFUELS_ACTION_DATA = 'STORE_SET_REFUELS_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_REFUEL = 'EMIT_NEW_REFUEL';
export const EMIT_NEW_AFFORD = 'EMIT_NEW_AFFORD';
export const EMIT_CONFIRM_REFUEL = 'EMIT_CONFIRM_REFUEL';
export const EMIT_CONFIRM_AFFORD = 'EMIT_CONFIRM_AFFORD';
export const EMIT_REFUELS_FETCH_BY_AGENT = 'EMIT_REFUELS_FETCH_BY_AGENT';
export const EMIT_REFUELS_FETCH_BY_MANAGER = 'EMIT_REFUELS_FETCH_BY_MANAGER';
export const EMIT_AFFORDS_FETCH_BY_MANAGER = 'EMIT_AFFORDS_FETCH_BY_MANAGER';
export const EMIT_AFFORDS_FETCH_BY_COLLECTOR = 'EMIT_AFFORDS_FETCH_BY_COLLECTOR';
export const EMIT_REFUELS_FETCH_BY_COLLECTOR = 'EMIT_REFUELS_FETCH_BY_COLLECTOR';

//====================== Reducer trigger actions
// Set refuels data in store
export const storeSetRefuelsData = ({refuels}) => ({
    refuels,
    type: STORE_SET_REFUELS_DATA
});

// Set refuel data in store
export const storeSetRefuelData = ({refuel}) => ({
    refuel,
    type: STORE_SET_REFUEL_DATA
});

// Set sim action data in store
export const storeSetRefuelsActionData = ({id}) => ({
    id,
    type: STORE_SET_REFUELS_ACTION_DATA
});
//====================== Middleware trigger actions
// Emit refuels fetch by agent
export const emitRefuelsFetchByAgent = ({id}) => ({
    id,
    type: EMIT_REFUELS_FETCH_BY_AGENT
});

// Emit refuels fetch by collector
export const emitRefuelsFetchByCollector = ({id}) => ({
    id,
    type: EMIT_REFUELS_FETCH_BY_COLLECTOR
});

// Emit refuels fetch by manager
export const emitRefuelsFetchByManager = () => ({
    type: EMIT_REFUELS_FETCH_BY_MANAGER
});

// Emit affords fetch by collector
export const emitAffordsFetchByCollector = ({id}) => ({
    id,
    type: EMIT_AFFORDS_FETCH_BY_COLLECTOR
});

// Emit affords fetch by manager
export const emitAffordsFetchByManager = () => ({
    type: EMIT_AFFORDS_FETCH_BY_MANAGER
});

// Emit confirm refuel
export const emitConfirmRefuel = ({id}) => ({
    id,
    type: EMIT_CONFIRM_REFUEL
});

// Emit confirm afford
export const emitConfirmAfford = ({id}) => ({
    id,
    type: EMIT_CONFIRM_AFFORD
});

// Emit fleet new refuel
export const emitNewRefuel = ({agent, amount, sim, receipt}) => ({
    sim,
    agent,
    amount,
    receipt,
    type: EMIT_NEW_REFUEL
});

// Emit fleet new afford
export const emitNewAfford = ({amount, sim, receipt, vendor}) => ({
    sim,
    vendor,
    amount,
    receipt,
    type: EMIT_NEW_AFFORD
});
