// Reducer action types
export const STORE_SET_SIMS_TYPES_DATA = 'STORE_SET_SIMS_TYPES_DATA';

// Middleware action types
export const EMIT_SIMS_TYPES_FETCH = 'EMIT_SIMS_TYPES_FETCH';

//====================== Reducer trigger actions
// Set simsTypes data in store
export const storeSetSimsTypesData = ({simsTypes}) => ({
    simsTypes,
    type: STORE_SET_SIMS_TYPES_DATA
});

//====================== Middleware trigger actions
// Emit simsTypes fetch
export const emitSimsTypesFetch = () => ({
    type: EMIT_SIMS_TYPES_FETCH
});
