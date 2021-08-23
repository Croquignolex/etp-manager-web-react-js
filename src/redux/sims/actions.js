// Reducer action types
export const STORE_SET_SIM_DATA = 'STORE_SET_SIM_DATA';
export const STORE_SET_SIMS_DATA = 'STORE_SET_SIMS_DATA';
export const STORE_SET_NEXT_SIMS_DATA = 'STORE_SET_NEXT_SIMS_DATA';
export const STORE_SET_SIM_ACTION_DATA = 'STORE_SET_SIM_ACTION_DATA';
export const STORE_SET_SIM_TRANSACTIONS_DATA = 'STORE_SET_SIM_TRANSACTIONS_DATA';
export const STORE_STOP_INFINITE_SCROLL_SIMS_DATA = 'STORE_STOP_INFINITE_SCROLL_SIMS_DATA';

// Middleware action types
export const EMIT_SIM_FETCH = 'EMIT_SIM_FETCH';
export const EMIT_SIMS_FETCH = 'EMIT_SIMS_FETCH';
export const EMIT_ALL_SIMS_FETCH = 'EMIT_ALL_SIMS_FETCH';
export const EMIT_NEXT_SIMS_FETCH = 'EMIT_NEXT_SIMS_FETCH';
export const EMIT_FLEETS_SIMS_FETCH = 'EMIT_FLEETS_SIMS_FETCH';
export const EMIT_AGENTS_SIMS_FETCH = 'EMIT_AGENTS_SIMS_FETCH';
export const EMIT_UPDATE_SIM_OPERATOR = 'EMIT_UPDATE_SIM_OPERATOR';
export const EMIT_INTERNAL_SIMS_FETCH = 'EMIT_INTERNAL_SIMS_FETCH';
export const EMIT_MANAGERS_SIMS_FETCH = 'EMIT_MANAGERS_SIMS_FETCH';
export const EMIT_RESOURCES_SIMS_FETCH = 'EMIT_RESOURCES_SIMS_FETCH';
export const EMIT_ALL_FLEETS_SIMS_FETCH = 'EMIT_ALL_FLEETS_SIMS_FETCH';
export const EMIT_COLLECTORS_SIMS_FETCH = 'EMIT_COLLECTORS_SIMS_FETCH';
export const EMIT_SIM_TRANSACTIONS_FETCH = 'EMIT_SIM_TRANSACTIONS_FETCH';
export const EMIT_NEXT_FLEETS_SIMS_FETCH = 'EMIT_NEXT_FLEETS_SIMS_FETCH';
export const EMIT_NEXT_AGENTS_SIMS_FETCH = 'EMIT_NEXT_AGENTS_SIMS_FETCH';
export const EMIT_NEXT_MANAGERS_SIMS_FETCH = 'EMIT_NEXT_MANAGERS_SIMS_FETCH';
export const EMIT_NEXT_RESOURCES_SIMS_FETCH = 'EMIT_NEXT_RESOURCES_SIMS_FETCH';
export const EMIT_NEXT_COLLECTORS_SIMS_FETCH = 'EMIT_NEXT_COLLECTORS_SIMS_FETCH';

//====================== Reducer trigger actions
// Set sims data in store
export const storeSetSimsData = ({sims, hasMoreData, page}) => ({
    page,
    sims,
    hasMoreData,
    type: STORE_SET_SIMS_DATA
});

// Set sim data in store
export const storeSetSimData = ({sim, alsoInList}) => ({
    sim,
    alsoInList,
    type: STORE_SET_SIM_DATA
});

// Set next sims data in store
export const storeSetNextSimsData = ({sims, hasMoreData, page}) => ({
    page,
    sims,
    hasMoreData,
    type: STORE_SET_NEXT_SIMS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollSimData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_SIMS_DATA
});

// Set sim action data in store
export const storeSetSimActionData = ({id}) => ({
    id,
    type: STORE_SET_SIM_ACTION_DATA
});

// Set sim transactions data in store
export const storeSetSimTransactionsData = ({transactions}) => ({
    transactions,
    type: STORE_SET_SIM_TRANSACTIONS_DATA
});

//====================== Middleware trigger actions
// Emit fleets sims fetch
export const emitFleetsSimsFetch = () => ({
    type: EMIT_FLEETS_SIMS_FETCH
});

// Emit next fleets sims fetch
export const emitNextFleetsSimsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_FLEETS_SIMS_FETCH
});

// Emit agents sims fetch
export const emitAgentsSimsFetch = () => ({
    type: EMIT_AGENTS_SIMS_FETCH
});

// Emit next agents sims fetch
export const emitNextAgentsSimsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_AGENTS_SIMS_FETCH
});

// Emit resource sims fetch
export const emitResourcesSimsFetch = () => ({
    type: EMIT_RESOURCES_SIMS_FETCH
});

// Emit next resource sims fetch
export const emitNextResourcesSimsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_RESOURCES_SIMS_FETCH
});

// Emit collectors sims fetch
export const emitCollectorsSimsFetch = () => ({
    type: EMIT_COLLECTORS_SIMS_FETCH
});

// Emit next collectors sims fetch
export const emitNextCollectorsSimsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_COLLECTORS_SIMS_FETCH
});

// Emit all sims fetch
export const emitAllSimsFetch = () => ({
    type: EMIT_ALL_SIMS_FETCH
});

// Emit sim fetch
export const emitSimFetch = ({id}) => ({
    id,
    type: EMIT_SIM_FETCH
});

// Emit all fleet sims fetch
export const emitAllFleetSimsFetch = () => ({
    type: EMIT_ALL_FLEETS_SIMS_FETCH
});

// Emit all internal sims fetch
export const emitAllInternalSimsFetch = () => ({
    type: EMIT_INTERNAL_SIMS_FETCH
});

// Emit update sim operator
export const emitUpdateSimOperator = ({id, operator}) => ({
    id,
    operator,
    type: EMIT_UPDATE_SIM_OPERATOR
});

// Emit fetch sim transactions
export const emitSimTransactionsFetch = ({id, selectedStartDay, selectedEndDay}) => ({
    id,
    selectedEndDay,
    selectedStartDay,
    type: EMIT_SIM_TRANSACTIONS_FETCH
});