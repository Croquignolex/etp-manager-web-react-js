// Reducer action types
export const STORE_SET_USER_CHECK_ERROR_DATA = 'STORE_SET_USER_CHECK_ERROR_DATA';
export const STORE_RESET_USER_CHECK_ERROR_DATA = 'STORE_RESET_USER_CHECK_ERROR_DATA';

//====================== Reducer trigger actions

// ======================================================== User check
// Empty user check error data into store
export const storeResetUserCheckErrorData = () => ({
    type: STORE_RESET_USER_CHECK_ERROR_DATA
});

// Set user check error data in store
export const storeSetUserCheckErrorData = ({message}) => ({
    message,
    type: STORE_SET_USER_CHECK_ERROR_DATA
});
// ========================================================