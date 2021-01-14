// Reducer action types
export const STORE_ALL_MANAGERS_REQUEST_INIT = 'STORE_ALL_MANAGERS_REQUEST_INIT';
export const STORE_ALL_MANAGERS_REQUEST_RESET = 'STORE_ALL_MANAGERS_REQUEST_RESET';
export const STORE_ALL_MANAGERS_REQUEST_FAILED = 'STORE_ALL_MANAGERS_REQUEST_FAILED';
export const STORE_ALL_MANAGERS_REQUEST_SUCCEEDED = 'STORE_ALL_MANAGERS_REQUEST_SUCCEEDED';

// ======================================================== All zones
// Set all managers init data into store
export const storeAllManagersRequestInit = () => ({
    type: STORE_ALL_MANAGERS_REQUEST_INIT
});

// Set all managers failed data into store
export const storeAllManagersRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_MANAGERS_REQUEST_FAILED
});

// Set all managers succeeded data into store
export const storeAllManagersRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_MANAGERS_REQUEST_SUCCEEDED
});

// Set all managers reset data into store
export const storeAllManagersRequestReset = () => ({
    type: STORE_ALL_MANAGERS_REQUEST_RESET
});