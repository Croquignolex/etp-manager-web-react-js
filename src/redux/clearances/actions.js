// Reducer action types
export const STORE_SET_CLEARANCES_DATA = 'STORE_SET_CLEARANCES_DATA';
export const STORE_UPDATE_CLEARANCE_DATA = 'STORE_UPDATE_CLEARANCE_DATA';
export const STORE_SET_NEXT_CLEARANCES_DATA = 'STORE_SET_NEXT_CLEARANCES_DATA';
export const STORE_SET_CLEARANCE_ACTION_DATA = 'STORE_SET_CLEARANCE_ACTION_DATA';
export const STORE_STOP_INFINITE_SCROLL_CLEARANCES_DATA = 'STORE_STOP_INFINITE_SCROLL_CLEARANCES_DATA';

// Middleware action types
export const EMIT_CLEARANCES_FETCH = 'EMIT_CLEARANCES_FETCH';
export const EMIT_ALL_CLEARANCES_FETCH = 'EMIT_ALL_CLEARANCES_FETCH';
export const EMIT_NEXT_CLEARANCES_FETCH = 'EMIT_NEXT_CLEARANCES_FETCH';
export const EMIT_CLEARANCE_ADD_DECLARE = 'EMIT_CLEARANCE_ADD_DECLARE';

//====================== Reducer trigger actions
// Set clearances data in store
export const storeSetClearancesData = ({clearances, hasMoreData, page}) => ({
    page,
    clearances,
    hasMoreData,
    type: STORE_SET_CLEARANCES_DATA
});

// Set next clearances data in store
export const storeSetNextClearancesData = ({clearances, hasMoreData, page}) => ({
    page,
    clearances,
    hasMoreData,
    type: STORE_SET_NEXT_CLEARANCES_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollClearanceData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_CLEARANCES_DATA
});

// Set update clearance data in store
export const storeUpdateClearanceData = ({id, amount}) => ({
    id,
    amount,
    type: STORE_UPDATE_CLEARANCE_DATA
});

// Set clearance action data in store
export const storeSetClearanceActionData = ({id}) => ({
    id,
    type: STORE_SET_CLEARANCE_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit clearances fetch
export const emitClearancesFetch = () => ({
    type: EMIT_CLEARANCES_FETCH
});

// Emit next clearances fetch
export const emitNextClearancesFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_CLEARANCES_FETCH
});

// Emit all clearances fetch
export const emitAllClearancesFetch = () => ({
    type: EMIT_ALL_CLEARANCES_FETCH
});

// Emit clearance add declare
export const emitClearanceAddDeclare = ({id, amount}) => ({
    id,
    amount,
    type: EMIT_CLEARANCE_ADD_DECLARE
});
