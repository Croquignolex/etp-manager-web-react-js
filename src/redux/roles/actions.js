// Reducer action types
export const STORE_SET_ROLES_DATA = 'STORE_SET_ROLES_DATA';

// Middleware action types
export const EMIT_ROLES_FETCH = 'EMIT_ROLES_FETCH';

//====================== Reducer trigger actions
// Set roles data in store
export const storeSetRolesData = ({roles}) => ({
    roles,
    type: STORE_SET_ROLES_DATA
});

//====================== Middleware trigger actions
// Emit roles fetch
export const emitRolesFetch = () => ({
    type: EMIT_ROLES_FETCH
});
