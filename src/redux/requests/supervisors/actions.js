// Reducer action types
export const STORE_ALL_SUPERVISORS_REQUEST_INIT = 'STORE_ALL_SUPERVISORS_REQUEST_INIT';
export const STORE_ALL_SUPERVISORS_REQUEST_RESET = 'STORE_ALL_SUPERVISORS_REQUEST_RESET';
export const STORE_ALL_SUPERVISORS_REQUEST_FAILED = 'STORE_ALL_SUPERVISORS_REQUEST_FAILED';
export const STORE_ALL_SUPERVISORS_REQUEST_SUCCEEDED = 'STORE_ALL_SUPERVISORS_REQUEST_SUCCEEDED';

// ======================================================== All supervisors
// Set all supervisors init data into store
export const storeAllSupervisorsRequestInit = () => ({
    type: STORE_ALL_SUPERVISORS_REQUEST_INIT
});

// Set all supervisors failed data into store
export const storeAllSupervisorsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_SUPERVISORS_REQUEST_FAILED
});

// Set all supervisors succeeded data into store
export const storeAllSupervisorsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_SUPERVISORS_REQUEST_SUCCEEDED
});

// Set all supervisors reset data into store
export const storeAllSupervisorsRequestReset = () => ({
    type: STORE_ALL_SUPERVISORS_REQUEST_RESET
});