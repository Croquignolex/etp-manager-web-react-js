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

export const STORE_SIM_REQUEST_INIT = 'STORE_SIM_REQUEST_INIT';
export const STORE_SIM_REQUEST_RESET = 'STORE_SIM_REQUEST_RESET';
export const STORE_SIM_REQUEST_FAILED = 'STORE_SIM_REQUEST_FAILED';
export const STORE_SIM_REQUEST_SUCCEEDED = 'STORE_SIM_REQUEST_SUCCEEDED';

export const STORE_ALL_FLEET_SIMS_REQUEST_INIT = 'STORE_ALL_FLEET_SIMS_REQUEST_INIT';
export const STORE_ALL_FLEET_SIMS_REQUEST_RESET = 'STORE_ALL_FLEET_SIMS_REQUEST_RESET';
export const STORE_ALL_FLEET_SIMS_REQUEST_FAILED = 'STORE_ALL_FLEET_SIMS_REQUEST_FAILED';
export const STORE_ALL_FLEET_SIMS_REQUEST_SUCCEEDED = 'STORE_ALL_FLEET_SIMS_REQUEST_SUCCEEDED';

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
// ======================================================== All fleets sims
// Set all fleets sims init data into store
export const storeAllFleetSimsRequestInit = () => ({
    type: STORE_ALL_FLEET_SIMS_REQUEST_INIT
});

// Set all fleets sims failed data into store
export const storeAllFleetSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_FLEET_SIMS_REQUEST_FAILED
});

// Set all fleets sims succeeded data into store
export const storeAllFleetSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_FLEET_SIMS_REQUEST_SUCCEEDED
});

// Set all fleets sims reset data into store
export const storeAllFleetSimsRequestReset = () => ({
    type: STORE_ALL_FLEET_SIMS_REQUEST_RESET
});
// ======================================================== Sim
// Set sim init data into store
export const storeSimRequestInit = () => ({
    type: STORE_SIM_REQUEST_INIT
});

// Set sim failed data into store
export const storeSimRequestFailed = ({message}) => ({
    message,
    type: STORE_SIM_REQUEST_FAILED
});

// Set sim succeeded data into store
export const storeSimRequestSucceed = ({message}) => ({
    message,
    type: STORE_SIM_REQUEST_SUCCEEDED
});

// Set sim reset data into store
export const storeSimRequestReset = () => ({
    type: STORE_SIM_REQUEST_RESET
});