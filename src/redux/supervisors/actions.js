// Reducer action types
export const STORE_SET_SUPERVISORS_DATA = 'STORE_SET_SUPERVISORS_DATA';

// Middleware action types
export const EMIT_ALL_SUPERVISORS_FETCH = 'EMIT_ALL_SUPERVISORS_FETCH'; 

//====================== Reducer trigger actions
// Set supervisors data in store
export const storeSetSupervisorsData = ({supervisors, hasMoreData, page}) => ({
    page,
    supervisors,
    hasMoreData,
    type: STORE_SET_SUPERVISORS_DATA
});

//====================== Middleware trigger actions
// Emit all supervisors fetch
export const emitAllSupervisorsFetch = () => ({
    type: EMIT_ALL_SUPERVISORS_FETCH
});