// Reducer action types
export const STORE_SET_SUPPLIES_DATA = 'STORE_SET_SUPPLIES_DATA';
export const STORE_CANCEL_SUPPLY_DATA = 'STORE_CANCEL_SUPPLY_DATA';
export const STORE_UPDATE_SUPPLY_DATA = 'STORE_UPDATE_SUPPLY_DATA';
export const STORE_SET_NEW_SUPPLY_DATA = 'STORE_SET_NEW_SUPPLY_DATA';
export const STORE_SET_SUPPLY_ACTION_DATA = 'STORE_SET_SUPPLY_ACTION_DATA';
export const STORE_SET_NEXT_SUPPLIES_DATA = 'STORE_SET_NEXT_SUPPLIES_DATA';
export const STORE_SET_GROUP_SUPPLIES_DATA = 'STORE_SET_GROUP_SUPPLIES_DATA';
export const STORE_STOP_INFINITE_SCROLL_SUPPLY_DATA = 'STORE_STOP_INFINITE_SCROLL_SUPPLY_DATA';

// Middleware action types
export const EMIT_ADD_SUPPLY = 'EMIT_ADD_SUPPLY';
export const EMIT_CANCEL_SUPPLY = 'EMIT_CANCEL_SUPPLY';
export const EMIT_SUPPLIES_FETCH = 'EMIT_SUPPLIES_FETCH';
export const EMIT_NEXT_SUPPLIES_FETCH = 'EMIT_NEXT_SUPPLIES_FETCH';
export const EMIT_ADD_ANONYMOUS_SUPPLY = 'EMIT_ADD_ANONYMOUS_SUPPLY';
export const EMIT_GROUP_SUPPLIES_FETCH = 'EMIT_GROUP_SUPPLIES_FETCH';
export const EMIT_SEARCH_SUPPLIES_FETCH = 'EMIT_SEARCH_SUPPLIES_FETCH';
export const EMIT_GROUP_SUPPLY_ADD_RETURN = 'EMIT_GROUP_SUPPLY_ADD_RETURN';
export const EMIT_GROUP_SUPPLY_ADD_RECOVERY = 'EMIT_GROUP_SUPPLY_ADD_RECOVERY';

//====================== Reducer trigger actions
// Set supplies data in store
export const storeSetSuppliesData = ({supplies, hasMoreData, page}) => ({
    page,
    supplies,
    hasMoreData,
    type: STORE_SET_SUPPLIES_DATA
});

// Set new supply data in store
export const storeSetNewSupplyData = ({supply}) => ({
    supply,
    type: STORE_SET_NEW_SUPPLY_DATA
});

// Set next supplies data in store
export const storeSetNextSuppliesData = ({supplies, hasMoreData, page}) => ({
    page,
    supplies,
    hasMoreData,
    type: STORE_SET_NEXT_SUPPLIES_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollSupplyData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_SUPPLY_DATA
});

// Set update supply data in store
export const storeUpdateSupplyData = ({id, amount}) => ({
    id,
    amount,
    type: STORE_UPDATE_SUPPLY_DATA
});

// Set cancel supply data in store
export const storeCancelSupplyData = ({id}) => ({
    id,
    type: STORE_CANCEL_SUPPLY_DATA
});

// Set supply action data in store
export const storeSetSupplyActionData = ({id}) => ({
    id,
    type: STORE_SET_SUPPLY_ACTION_DATA
});

// Set group supplies data in store
export const storeSetGroupSuppliesData = ({supplies}) => ({
    supplies,
    type: STORE_SET_GROUP_SUPPLIES_DATA
});

//====================== Middleware trigger actions
// Emit supplies fetch
export const emitSuppliesFetch = () => ({
    type: EMIT_SUPPLIES_FETCH
});

// Emit next supplies fetch
export const emitNextSuppliesFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_SUPPLIES_FETCH
});

// Emit add supply
export const emitAddSupply = ({amount, managerSim, agentSim, agent, pay}) => ({
    pay,
    agent,
    amount,
    agentSim,
    managerSim,
    type: EMIT_ADD_SUPPLY
});

// Emit add anonymous supply
export const emitAddAnonymousSupply = ({sim, amount, receiver, receiverSim, pay, zone}) => ({
    pay,
    sim,
    zone,
    amount,
    receiver,
    receiverSim,
    type: EMIT_ADD_ANONYMOUS_SUPPLY
});

// Emit search supplies fetch
export const emitSearchSuppliesFetch = ({needle}) => ({
    needle,
    type: EMIT_SEARCH_SUPPLIES_FETCH
});

// Emit cancel supply
export const emitCancelSupply = ({id}) => ({
    id,
    type: EMIT_CANCEL_SUPPLY
});

// Emit group supply add return
export const emitGroupSupplyAddReturn = ({ids, amount, agentSim, managerSim}) => ({
    ids,
    amount,
    agentSim,
    managerSim,
    type: EMIT_GROUP_SUPPLY_ADD_RETURN
});

// Emit group supply add return
export const emitGroupSupplyAddRecovery = ({ids, amount}) => ({
    ids,
    amount,
    type: EMIT_GROUP_SUPPLY_ADD_RECOVERY
});

// Emit group supplies fetch
export const emitGroupSuppliesFetch = () => ({
    type: EMIT_GROUP_SUPPLIES_FETCH
});
