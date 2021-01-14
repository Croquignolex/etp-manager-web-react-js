// Reducer action types
export const STORE_SET_MANAGERS_DATA = 'STORE_SET_MANAGERS_DATA';

// Middleware action types
export const EMIT_ALL_MANAGERS_FETCH = 'EMIT_ALL_MANAGERS_FETCH';

//====================== Reducer trigger actions
// Set managers data in store
export const storeSetManagersData = ({managers, hasMoreData, page}) => ({
    page,
    managers,
    hasMoreData,
    type: STORE_SET_MANAGERS_DATA
});

//====================== Middleware trigger actions
// Emit all managers fetch
export const emitAllManagersFetch = () => ({
    type: EMIT_ALL_MANAGERS_FETCH
});