// Reducer action types
export const STORE_SET_OPERATORS_DATA = 'STORE_SET_OPERATORS_DATA';

// Middleware action types
export const EMIT_ALL_OPERATORS_FETCH = 'EMIT_ALL_OPERATORS_FETCH';

//====================== Reducer trigger actions
// Set operators data in store
export const storeSetOperatorsData = ({operators, hasMoreData, page}) => ({
    page,
    operators,
    hasMoreData,
    type: STORE_SET_OPERATORS_DATA
});

//====================== Middleware trigger actions
// Emit all operators fetch
export const emitAllOperatorsFetch = () => ({
    type: EMIT_ALL_OPERATORS_FETCH
});