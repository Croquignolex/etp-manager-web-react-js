// Reducer action types
export const STORE_SET_AFFORDS_DATA = 'STORE_SET_AFFORDS_DATA';
export const STORE_SET_NEXT_AFFORDS_DATA = 'STORE_SET_NEXT_AFFORDS_DATA';
export const STORE_SET_AFFORD_ACTION_DATA = 'STORE_SET_AFFORD_ACTION_DATA';
export const STORE_STOP_INFINITE_SCROLL_AFFORD_DATA = 'STORE_STOP_INFINITE_SCROLL_AFFORD_DATA';

// Middleware action types
export const EMIT_AFFORDS_FETCH = 'EMIT_AFFORDS_FETCH';
export const EMIT_NEXT_AFFORDS_FETCH = 'EMIT_NEXT_AFFORDS_FETCH';

//====================== Reducer trigger actions
// Set affords data in store
export const storeSetAffordsData = ({affords, hasMoreData, page}) => ({
    page,
    affords,
    hasMoreData,
    type: STORE_SET_AFFORDS_DATA
});
 
// Set next affords data in store
export const storeSetNextAffordsData = ({affords, hasMoreData, page}) => ({
    page,
    affords,
    hasMoreData,
    type: STORE_SET_NEXT_AFFORDS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollAffordData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_AFFORD_DATA
});

// Set afford action data in store
export const storeSetAffordActionData = ({id}) => ({
    id,
    type: STORE_SET_AFFORD_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit affords fetch
export const emitAffordsFetch = () => ({
    type: EMIT_AFFORDS_FETCH
});

// Emit next affords fetch
export const emitNextAffordsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_AFFORDS_FETCH
});