// Reducer action types
export const STORE_ALL_OPERATORS_REQUEST_INIT = 'STORE_ALL_OPERATORS_REQUEST_INIT';
export const STORE_ALL_OPERATORS_REQUEST_RESET = 'STORE_ALL_OPERATORS_REQUEST_RESET';
export const STORE_ALL_OPERATORS_REQUEST_FAILED = 'STORE_ALL_OPERATORS_REQUEST_FAILED';
export const STORE_ALL_OPERATORS_REQUEST_SUCCEEDED = 'STORE_ALL_OPERATORS_REQUEST_SUCCEEDED';

// ======================================================== All zones
// Set all operators init data into store
export const storeAllOperatorsRequestInit = () => ({
    type: STORE_ALL_OPERATORS_REQUEST_INIT
});

// Set all operators failed data into store
export const storeAllOperatorsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_OPERATORS_REQUEST_FAILED
});

// Set all operators succeeded data into store
export const storeAllOperatorsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_OPERATORS_REQUEST_SUCCEEDED
});

// Set all operators reset data into store
export const storeAllOperatorsRequestReset = () => ({
    type: STORE_ALL_OPERATORS_REQUEST_RESET
});