// Reducer action types
export const STORE_ALL_ZONES_REQUEST_INIT = 'STORE_ALL_ZONES_REQUEST_INIT';
export const STORE_ALL_ZONES_REQUEST_RESET = 'STORE_ALL_ZONES_REQUEST_RESET';
export const STORE_ALL_ZONES_REQUEST_FAILED = 'STORE_ALL_ZONES_REQUEST_FAILED';
export const STORE_ALL_ZONES_REQUEST_SUCCEEDED = 'STORE_ALL_ZONES_REQUEST_SUCCEEDED';

// ======================================================== All zones
// Set all zones init data into store
export const storeAllZonesRequestInit = () => ({
    type: STORE_ALL_ZONES_REQUEST_INIT
});

// Set all zones failed data into store
export const storeAllZonesRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_ZONES_REQUEST_FAILED
});

// Set all zones succeeded data into store
export const storeAllZonesRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_ZONES_REQUEST_SUCCEEDED
});

// Set all zones reset data into store
export const storeAllZonesRequestReset = () => ({
    type: STORE_ALL_ZONES_REQUEST_RESET
});