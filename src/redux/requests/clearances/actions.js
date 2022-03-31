// Reducer action types
export const STORE_CLEARANCES_REQUEST_INIT = 'STORE_CLEARANCES_REQUEST_INIT';
export const STORE_CLEARANCES_REQUEST_RESET = 'STORE_CLEARANCES_REQUEST_RESET';
export const STORE_CLEARANCES_REQUEST_FAILED = 'STORE_CLEARANCES_REQUEST_FAILED';
export const STORE_CLEARANCES_REQUEST_SUCCEEDED = 'STORE_CLEARANCES_REQUEST_SUCCEEDED';

export const STORE_NEXT_CLEARANCES_REQUEST_INIT = 'STORE_NEXT_CLEARANCES_REQUEST_INIT';
export const STORE_NEXT_CLEARANCES_REQUEST_RESET = 'STORE_NEXT_CLEARANCES_REQUEST_RESET';
export const STORE_NEXT_CLEARANCES_REQUEST_FAILED = 'STORE_NEXT_CLEARANCES_REQUEST_FAILED';
export const STORE_NEXT_CLEARANCES_REQUEST_SUCCEEDED = 'STORE_NEXT_CLEARANCES_REQUEST_SUCCEEDED';

export const STORE_ALL_CLEARANCES_REQUEST_INIT = 'STORE_ALL_CLEARANCES_REQUEST_INIT';
export const STORE_ALL_CLEARANCES_REQUEST_RESET = 'STORE_ALL_CLEARANCES_REQUEST_RESET';
export const STORE_ALL_CLEARANCES_REQUEST_FAILED = 'STORE_ALL_CLEARANCES_REQUEST_FAILED';
export const STORE_ALL_CLEARANCES_REQUEST_SUCCEEDED = 'STORE_ALL_CLEARANCES_REQUEST_SUCCEEDED';

export const STORE_CLEARANCE_DECLARE_REQUEST_INIT = 'STORE_CLEARANCE_DECLARE_REQUEST_INIT';
export const STORE_CLEARANCE_DECLARE_REQUEST_RESET = 'STORE_CLEARANCE_DECLARE_REQUEST_RESET';
export const STORE_CLEARANCE_DECLARE_REQUEST_FAILED = 'STORE_CLEARANCE_DECLARE_REQUEST_FAILED';
export const STORE_CLEARANCE_DECLARE_REQUEST_SUCCEEDED = 'STORE_CLEARANCE_DECLARE_REQUEST_SUCCEEDED';

// ======================================================== Clearances
// Set clearances init data into store
export const storeClearancesRequestInit = () => ({
    type: STORE_CLEARANCES_REQUEST_INIT
});

// Set clearances failed data into store
export const storeClearancesRequestFailed = ({message}) => ({
    message,
    type: STORE_CLEARANCES_REQUEST_FAILED
});

// Set clearances succeeded data into store
export const storeClearancesRequestSucceed = ({message}) => ({
    message,
    type: STORE_CLEARANCES_REQUEST_SUCCEEDED
});

// Set clearances reset data into store
export const storeClearancesRequestReset = () => ({
    type: STORE_CLEARANCES_REQUEST_RESET
});
// ======================================================== Next clearances
// Set next clearances init data into store
export const storeNextClearancesRequestInit = () => ({
    type: STORE_NEXT_CLEARANCES_REQUEST_INIT
});

// Set next clearances failed data into store
export const storeNextClearancesRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_CLEARANCES_REQUEST_FAILED
});

// Set next clearances succeeded data into store
export const storeNextClearancesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_CLEARANCES_REQUEST_SUCCEEDED
});

// Set next clearances reset data into store
export const storeNextClearancesRequestReset = () => ({
    type: STORE_NEXT_CLEARANCES_REQUEST_RESET
});
// ======================================================== All clearances
// Set all clearances init data into store
export const storeAllClearancesRequestInit = () => ({
    type: STORE_ALL_CLEARANCES_REQUEST_INIT
});

// Set all clearances failed data into store
export const storeAllClearancesRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_CLEARANCES_REQUEST_FAILED
});

// Set all clearances succeeded data into store
export const storeAllClearancesRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_CLEARANCES_REQUEST_SUCCEEDED
});

// Set all clearances reset data into store
export const storeAllClearancesRequestReset = () => ({
    type: STORE_ALL_CLEARANCES_REQUEST_RESET
});
// ======================================================== Clearance declare
// Set clearance declare init data into store
export const storeClearanceDeclareRequestInit = () => ({
    type: STORE_CLEARANCE_DECLARE_REQUEST_INIT
});

// Set clearance declare failed data into store
export const storeClearanceDeclareRequestFailed = ({message}) => ({
    message,
    type: STORE_CLEARANCE_DECLARE_REQUEST_FAILED
});

// Set clearance declare succeeded data into store
export const storeClearanceDeclareRequestSucceed = ({message}) => ({
    message,
    type: STORE_CLEARANCE_DECLARE_REQUEST_SUCCEEDED
});

// Set clearance declare reset data into store
export const storeClearanceDeclareRequestReset = () => ({
    type: STORE_CLEARANCE_DECLARE_REQUEST_RESET
});
