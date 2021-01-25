// Reducer action types
export const STORE_ANONYMOUS_REQUEST_INIT = 'STORE_ANONYMOUS_REQUEST_INIT';
export const STORE_ANONYMOUS_REQUEST_RESET = 'STORE_ANONYMOUS_REQUEST_RESET';
export const STORE_ANONYMOUS_REQUEST_FAILED = 'STORE_ANONYMOUS_REQUEST_FAILED';
export const STORE_ANONYMOUS_REQUEST_SUCCEEDED = 'STORE_ANONYMOUS_REQUEST_SUCCEEDED';

export const STORE_NEXT_ANONYMOUS_REQUEST_INIT = 'STORE_NEXT_ANONYMOUS_REQUEST_INIT';
export const STORE_NEXT_ANONYMOUS_REQUEST_RESET = 'STORE_NEXT_ANONYMOUS_REQUEST_RESET';
export const STORE_NEXT_ANONYMOUS_REQUEST_FAILED = 'STORE_NEXT_ANONYMOUS_REQUEST_FAILED';
export const STORE_NEXT_ANONYMOUS_REQUEST_SUCCEEDED = 'STORE_NEXT_ANONYMOUS_REQUEST_SUCCEEDED';

export const STORE_ADD_ANONYMOUS_REQUEST_INIT = 'STORE_ADD_ANONYMOUS_REQUEST_INIT';
export const STORE_ADD_ANONYMOUS_REQUEST_RESET = 'STORE_ADD_ANONYMOUS_REQUEST_RESET';
export const STORE_ADD_ANONYMOUS_REQUEST_FAILED = 'STORE_ADD_ANONYMOUS_REQUEST_FAILED';
export const STORE_ADD_ANONYMOUS_REQUEST_SUCCEEDED = 'STORE_ADD_ANONYMOUS_REQUEST_SUCCEEDED';

// ======================================================== Anonymous
// Set anonymous init data into store
export const storeAnonymousRequestInit = () => ({
    type: STORE_ANONYMOUS_REQUEST_INIT
});

// Set anonymous failed data into store
export const storeAnonymousRequestFailed = ({message}) => ({
    message,
    type: STORE_ANONYMOUS_REQUEST_FAILED
});

// Set anonymous succeeded data into store
export const storeAnonymousRequestSucceed = ({message}) => ({
    message,
    type: STORE_ANONYMOUS_REQUEST_SUCCEEDED
});

// Set anonymous reset data into store
export const storeAnonymousRequestReset = () => ({
    type: STORE_ANONYMOUS_REQUEST_RESET
});
// ======================================================== Next anonymous
// Set next anonymous init data into store
export const storeNextAnonymousRequestInit = () => ({
    type: STORE_NEXT_ANONYMOUS_REQUEST_INIT
});

// Set next anonymous failed data into store
export const storeNextAnonymousRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_ANONYMOUS_REQUEST_FAILED
});

// Set next anonymous succeeded data into store
export const storeNextAnonymousRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_ANONYMOUS_REQUEST_SUCCEEDED
});

// Set next anonymous reset data into store
export const storeNextAnonymousRequestReset = () => ({
    type: STORE_NEXT_ANONYMOUS_REQUEST_RESET
});
// ======================================================== Add anonymous
// Set add anonymous init data into store
export const storeAddAnonymousRequestInit = () => ({
    type: STORE_ADD_ANONYMOUS_REQUEST_INIT
});

// Set add anonymous failed data into store
export const storeAddAnonymousRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_ANONYMOUS_REQUEST_FAILED
});

// Set add anonymous succeeded data into store
export const storeAddAnonymousRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_ANONYMOUS_REQUEST_SUCCEEDED
});

// Set add anonymous reset data into store
export const storeAddAnonymousRequestReset = () => ({
    type: STORE_ADD_ANONYMOUS_REQUEST_RESET
});