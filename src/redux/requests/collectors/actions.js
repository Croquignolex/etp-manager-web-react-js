// Reducer action types
export const STORE_ALL_COLLECTORS_REQUEST_INIT = 'STORE_ALL_COLLECTORS_REQUEST_INIT';
export const STORE_ALL_COLLECTORS_REQUEST_RESET = 'STORE_ALL_COLLECTORS_REQUEST_RESET';
export const STORE_ALL_COLLECTORS_REQUEST_FAILED = 'STORE_ALL_COLLECTORS_REQUEST_FAILED';
export const STORE_ALL_COLLECTORS_REQUEST_SUCCEEDED = 'STORE_ALL_COLLECTORS_REQUEST_SUCCEEDED';

// ======================================================== All zones
// Set all collectors init data into store
export const storeAllCollectorsRequestInit = () => ({
    type: STORE_ALL_COLLECTORS_REQUEST_INIT
});

// Set all collectors failed data into store
export const storeAllCollectorsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_COLLECTORS_REQUEST_FAILED
});

// Set all collectors succeeded data into store
export const storeAllCollectorsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_COLLECTORS_REQUEST_SUCCEEDED
});

// Set all collectors reset data into store
export const storeAllCollectorsRequestReset = () => ({
    type: STORE_ALL_COLLECTORS_REQUEST_RESET
});