// Reducer action types
export const STORE_USER_CHECK_REQUEST_INIT = 'STORE_USER_CHECK_REQUEST_INIT';
export const STORE_USER_CHECK_REQUEST_RESET = 'STORE_USER_CHECK_REQUEST_RESET';
export const STORE_USER_CHECK_REQUEST_FAILED = 'STORE_USER_CHECK_REQUEST_FAILED';
export const STORE_USER_CHECK_REQUEST_SUCCEEDED = 'STORE_USER_CHECK_REQUEST_SUCCEEDED';

//====================== Reducer trigger actions

// ======================================================== User check
// Set user check init data into store
export const storeUserCheckRequestInit = () => ({
    type: STORE_USER_CHECK_REQUEST_INIT
});

// Set user check failed data into store
export const storeUserCheckRequestFailed = () => ({
    type: STORE_USER_CHECK_REQUEST_FAILED
});

// Set user check succeeded data into store
export const storeUserCheckRequestSucceed = () => ({
    type: STORE_USER_CHECK_REQUEST_SUCCEEDED
});

// Set user check reset data into store
export const storeUserCheckRequestReset = () => ({
    type: STORE_USER_CHECK_REQUEST_RESET
});
// ========================================================


