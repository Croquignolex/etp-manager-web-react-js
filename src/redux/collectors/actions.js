// Reducer action types
export const STORE_SET_COLLECTORS_DATA = 'STORE_SET_COLLECTORS_DATA';

// Middleware action types
export const EMIT_ALL_COLLECTORS_FETCH = 'EMIT_ALL_COLLECTORS_FETCH';

//====================== Reducer trigger actions
// Set collectors data in store
export const storeSetCollectorsData = ({collectors, hasMoreData, page}) => ({
    page,
    collectors,
    hasMoreData,
    type: STORE_SET_COLLECTORS_DATA
});

//====================== Middleware trigger actions
// Emit all collectors fetch
export const emitAllCollectorsFetch = () => ({
    type: EMIT_ALL_COLLECTORS_FETCH
});