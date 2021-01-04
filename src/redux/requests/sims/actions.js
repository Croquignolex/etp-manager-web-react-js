// Reducer action types
export const STORE_SIMS_REQUEST_INIT = 'STORE_SIMS_REQUEST_INIT';
export const STORE_SIMS_REQUEST_RESET = 'STORE_SIMS_REQUEST_RESET';
export const STORE_SIMS_REQUEST_FAILED = 'STORE_SIMS_REQUEST_FAILED';
export const STORE_SIMS_REQUEST_SUCCEEDED = 'STORE_SIMS_REQUEST_SUCCEEDED';

export const STORE_NEXT_SIMS_REQUEST_INIT = 'STORE_NEXT_SIMS_REQUEST_INIT';
export const STORE_NEXT_SIMS_REQUEST_RESET = 'STORE_NEXT_SIMS_REQUEST_RESET';
export const STORE_NEXT_SIMS_REQUEST_FAILED = 'STORE_NEXT_SIMS_REQUEST_FAILED';
export const STORE_NEXT_SIMS_REQUEST_SUCCEEDED = 'STORE_NEXT_SIMS_REQUEST_SUCCEEDED';

export const STORE_ALL_SIMS_REQUEST_INIT = 'STORE_ALL_SIMS_REQUEST_INIT';
export const STORE_ALL_SIMS_REQUEST_RESET = 'STORE_ALL_SIMS_REQUEST_RESET';
export const STORE_ALL_SIMS_REQUEST_FAILED = 'STORE_ALL_SIMS_REQUEST_FAILED';
export const STORE_ALL_SIMS_REQUEST_SUCCEEDED = 'STORE_ALL_SIMS_REQUEST_SUCCEEDED';

// ======================================================== Sims
// Set sims init data into store
export const storeSimsRequestInit = () => ({
    type: STORE_SIMS_REQUEST_INIT
});

// Set sims failed data into store
export const storeSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_SIMS_REQUEST_FAILED
});

// Set sims succeeded data into store
export const storeSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_SIMS_REQUEST_SUCCEEDED
});

// Set sims reset data into store
export const storeSimsRequestReset = () => ({
    type: STORE_SIMS_REQUEST_RESET
});
// ======================================================== Next sims
// Set next sims init data into store
export const storeNextSimsRequestInit = () => ({
    type: STORE_NEXT_SIMS_REQUEST_INIT
});

// Set next sims failed data into store
export const storeNextSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_SIMS_REQUEST_FAILED
});

// Set next sims succeeded data into store
export const storeNextSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_SIMS_REQUEST_SUCCEEDED
});

// Set next sims reset data into store
export const storeNextSimsRequestReset = () => ({
    type: STORE_NEXT_SIMS_REQUEST_RESET
});
// ======================================================== All sims
// Set all sims init data into store
export const storeAllSimsRequestInit = () => ({
    type: STORE_ALL_SIMS_REQUEST_INIT
});

// Set all sims failed data into store
export const storeAllSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_SIMS_REQUEST_FAILED
});

// Set all sims succeeded data into store
export const storeAllSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_SIMS_REQUEST_SUCCEEDED
});

// Set all sims reset data into store
export const storeAllSimsRequestReset = () => ({
    type: STORE_ALL_SIMS_REQUEST_RESET
});