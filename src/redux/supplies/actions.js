// Reducer action types
export const STORE_SET_SUPPLY_DATA = 'STORE_SET_SUPPLY_DATA';
export const STORE_SET_SUPPLIES_DATA = 'STORE_SET_SUPPLIES_DATA';

// Middleware action types
export const EMIT_NEW_SUPPLY = 'EMIT_NEW_SUPPLY';
export const EMIT_NEW_NETWORK_SUPPLY = 'EMIT_NEW_NETWORK_SUPPLY';
export const EMIT_NETWORK_SUPPLIES_FETCH = 'EMIT_NETWORK_SUPPLIES_FETCH';
export const EMIT_SUPPLIES_FETCH_BY_AGENT = 'EMIT_SUPPLIES_FETCH_BY_AGENT';
export const EMIT_COLLECTORS_FLEETS_FETCH = 'EMIT_COLLECTORS_FLEETS_FETCH';
export const EMIT_SUPPLIES_FETCH_BY_MANAGER = 'EMIT_SUPPLIES_FETCH_BY_MANAGER';
export const EMIT_SUPPLIES_FETCH_BY_COLLECTOR = 'EMIT_SUPPLIES_FETCH_BY_COLLECTOR';

//====================== Reducer trigger actions
// Set supplies data in store
export const storeSetSuppliesData = ({supplies}) => ({
    supplies,
    type: STORE_SET_SUPPLIES_DATA
});

// Set supply data in store
export const storeSetSupplyData = ({supply}) => ({
    supply,
    type: STORE_SET_SUPPLY_DATA
});
//====================== Middleware trigger actions
// Emit supplies fetch by agent
export const emitSuppliesFetchByAgent = ({id}) => ({
    id,
    type: EMIT_SUPPLIES_FETCH_BY_AGENT
});

// Emit supplies fetch by collector
export const emitSuppliesFetchByCollector = () => ({
    type: EMIT_SUPPLIES_FETCH_BY_COLLECTOR
});

// Emit supplies fetch by manager
export const emitSuppliesFetchByManager = () => ({
    type: EMIT_SUPPLIES_FETCH_BY_MANAGER
});

// Emit fleet new supply
export const emitNewSupply = ({agent, amount, agentSim, managerSim}) => ({
    agent,
    amount,
    agentSim,
    managerSim,
    type: EMIT_NEW_SUPPLY
});

// *********************************** Network ***********************************
// Emit supplies fetch by collector in network
export const emitNetworkSuppliesFetch = ({id}) => ({
    id,
    type: EMIT_NETWORK_SUPPLIES_FETCH
});

// Emit new supply by collector in network
export const emitNetworkNewSupply = ({agent, amount, agentSim, collectorSim}) => ({
    agent,
    amount,
    agentSim,
    collectorSim,
    type: EMIT_NEW_NETWORK_SUPPLY
});

// Emit collectors fleets fetch
export const emitCollectorsFleetsFetch = () => ({
    type: EMIT_COLLECTORS_FLEETS_FETCH
});

