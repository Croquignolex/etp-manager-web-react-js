// Reducer action types
export const STORE_SET_RETURNS_DATA = 'STORE_SET_RETURNS_DATA';
export const STORE_SET_NEXT_RETURNS_DATA = 'STORE_SET_NEXT_RETURNS_DATA';
export const STORE_STOP_INFINITE_SCROLL_RETURNS_DATA = 'STORE_STOP_INFINITE_SCROLL_RETURNS_DATA';

// Middleware action types
export const EMIT_RETURNS_FETCH = 'EMIT_RETURNS_FETCH';
export const EMIT_NEXT_RETURNS_FETCH = 'EMIT_NEXT_RETURNS_FETCH';

//====================== Reducer trigger actions
// Set returns data in store
export const storeSetReturnsData = ({returns, hasMoreData, page}) => ({
    page,
    returns,
    hasMoreData,
    type: STORE_SET_RETURNS_DATA
});

// Set next returns data in store
export const storeSetNextReturnsData = ({returns, hasMoreData, page}) => ({
    page,
    returns,
    hasMoreData,
    type: STORE_SET_NEXT_RETURNS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollReturnData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_RETURNS_DATA
});

//====================== Middleware trigger actions
// Emit returns fetch
export const emitReturnsFetch = () => ({
    type: EMIT_RETURNS_FETCH
});

// Emit next returns fetch
export const emitNextReturnsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_RETURNS_FETCH
});