// Reducer action types
export const STORE_REVENUES_REQUEST_INIT = 'STORE_REVENUES_REQUEST_INIT';
export const STORE_REVENUES_REQUEST_RESET = 'STORE_REVENUES_REQUEST_RESET';
export const STORE_REVENUES_REQUEST_FAILED = 'STORE_REVENUES_REQUEST_FAILED';
export const STORE_REVENUES_REQUEST_SUCCEEDED = 'STORE_REVENUES_REQUEST_SUCCEEDED';

export const STORE_NEXT_REVENUES_REQUEST_INIT = 'STORE_NEXT_REVENUES_REQUEST_INIT';
export const STORE_NEXT_REVENUES_REQUEST_RESET = 'STORE_NEXT_REVENUES_REQUEST_RESET';
export const STORE_NEXT_REVENUES_REQUEST_FAILED = 'STORE_NEXT_REVENUES_REQUEST_FAILED';
export const STORE_NEXT_REVENUES_REQUEST_SUCCEEDED = 'STORE_NEXT_REVENUES_REQUEST_SUCCEEDED';

export const STORE_ADD_REVENUE_REQUEST_INIT = 'STORE_ADD_REVENUE_REQUEST_INIT';
export const STORE_ADD_REVENUE_REQUEST_RESET = 'STORE_ADD_REVENUE_REQUEST_RESET';
export const STORE_ADD_REVENUE_REQUEST_FAILED = 'STORE_ADD_REVENUE_REQUEST_FAILED';
export const STORE_ADD_REVENUE_REQUEST_SUCCEEDED = 'STORE_ADD_REVENUE_REQUEST_SUCCEEDED';

// ======================================================== Revenues
// Set revenues init data into store
export const storeRevenuesRequestInit = () => ({
    type: STORE_REVENUES_REQUEST_INIT
});

// Set revenues failed data into store
export const storeRevenuesRequestFailed = ({message}) => ({
    message,
    type: STORE_REVENUES_REQUEST_FAILED
});

// Set revenues succeeded data into store
export const storeRevenuesRequestSucceed = ({message}) => ({
    message,
    type: STORE_REVENUES_REQUEST_SUCCEEDED
});

// Set revenues reset data into store
export const storeRevenuesRequestReset = () => ({
    type: STORE_REVENUES_REQUEST_RESET
});
// ======================================================== Next revenues
// Set next revenues init data into store
export const storeNextRevenuesRequestInit = () => ({
    type: STORE_NEXT_REVENUES_REQUEST_INIT
});

// Set next revenues failed data into store
export const storeNextRevenuesRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_REVENUES_REQUEST_FAILED
});

// Set next revenues succeeded data into store
export const storeNextRevenuesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_REVENUES_REQUEST_SUCCEEDED
});

// Set next revenues reset data into store
export const storeNextRevenuesRequestReset = () => ({
    type: STORE_NEXT_REVENUES_REQUEST_RESET
});
// ======================================================== Add revenue
// Set add revenue init data into store
export const storeAddRevenueRequestInit = () => ({
    type: STORE_ADD_REVENUE_REQUEST_INIT
});

// Set add revenue failed data into store
export const storeAddRevenueRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_REVENUE_REQUEST_FAILED
});

// Set add revenue succeeded data into store
export const storeAddRevenueRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_REVENUE_REQUEST_SUCCEEDED
});

// Set add revenue reset data into store
export const storeAddRevenueRequestReset = () => ({
    type: STORE_ADD_REVENUE_REQUEST_RESET
});