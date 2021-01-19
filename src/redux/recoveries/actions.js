// Reducer action types
export const STORE_SET_RECOVERIES_DATA = 'STORE_SET_RECOVERIES_DATA';
export const STORE_UPDATE_RECOVERY_DATA = 'STORE_UPDATE_RECOVERY_DATA';
export const STORE_SET_NEXT_RECOVERIES_DATA = 'STORE_SET_NEXT_RECOVERIES_DATA';
export const STORE_SET_RECOVERY_ACTION_DATA = 'STORE_SET_RECOVERY_ACTION_DATA';
export const STORE_STOP_INFINITE_SCROLL_RECOVERIES_DATA = 'STORE_STOP_INFINITE_SCROLL_RECOVERIES_DATA';

// Middleware action types
export const EMIT_RECOVERIES_FETCH = 'EMIT_RECOVERIES_FETCH';
export const EMIT_NEXT_RECOVERIES_FETCH = 'EMIT_NEXT_RECOVERIES_FETCH';

//====================== Reducer trigger actions
// Set recoveries data in store
export const storeSetRecoveriesData = ({recoveries, hasMoreData, page}) => ({
    page,
    recoveries,
    hasMoreData,
    type: STORE_SET_RECOVERIES_DATA
});

// Set next recoveries data in store
export const storeSetNextRecoveriesData = ({recoveries, hasMoreData, page}) => ({
    page,
    recoveries,
    hasMoreData,
    type: STORE_SET_NEXT_RECOVERIES_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollRecoveryData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_RECOVERIES_DATA
});

// Set update recovery data in store
export const storeUpdateRecoveryData = ({id, amount}) => ({
    id,
    amount,
    type: STORE_UPDATE_RECOVERY_DATA
});

// Set recovery action data in store
export const storeSetRecoveryActionData = ({id}) => ({
    id,
    type: STORE_SET_RECOVERY_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit recoveries fetch
export const emitRecoveriesFetch = () => ({
    type: EMIT_RECOVERIES_FETCH
});

// Emit next recoveries fetch
export const emitNextRecoveriesFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_RECOVERIES_FETCH
});