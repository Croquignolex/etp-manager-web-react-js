// Reducer action types
export const STORE_RESET_ERROR_DATA = 'STORE_RESET_ERROR_DATA';
export const STORE_SET_DANGER_ERROR_DATA = 'STORE_SET_DANGER_ERROR_DATA';
export const STORE_SET_WARNING_ERROR_DATA = 'STORE_SET_WARNING_ERROR_DATA';

//====================== Reducer trigger actions
// Empty error data into store
export const storeResetErrorData = ({scope}) => ({
    scope,
    type: STORE_RESET_ERROR_DATA
});

// Set danger error data in store
export const storeSetDangerErrorData = ({message, scope}) => ({
    scope,
    message,
    type: STORE_SET_DANGER_ERROR_DATA
});

// Set warning error data in store
export const storeSetWarningErrorData = ({message, scope}) => ({
    scope,
    message,
    type: STORE_SET_WARNING_ERROR_DATA
});