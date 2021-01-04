// Reducer action types
export const STORE_FLEETS_REQUEST_INIT = 'STORE_FLEETS_REQUEST_INIT';
export const STORE_FLEETS_REQUEST_RESET = 'STORE_FLEETS_REQUEST_RESET';
export const STORE_FLEETS_REQUEST_FAILED = 'STORE_FLEETS_REQUEST_FAILED';
export const STORE_FLEETS_REQUEST_SUCCEEDED = 'STORE_FLEETS_REQUEST_SUCCEEDED';

export const STORE_NEXT_FLEETS_REQUEST_INIT = 'STORE_NEXT_FLEETS_REQUEST_INIT';
export const STORE_NEXT_FLEETS_REQUEST_RESET = 'STORE_NEXT_FLEETS_REQUEST_RESET';
export const STORE_NEXT_FLEETS_REQUEST_FAILED = 'STORE_NEXT_FLEETS_REQUEST_FAILED';
export const STORE_NEXT_FLEETS_REQUEST_SUCCEEDED = 'STORE_NEXT_FLEETS_REQUEST_SUCCEEDED';

export const STORE_FLEET_SUPPLY_REQUEST_INIT = 'STORE_FLEET_SUPPLY_REQUEST_INIT';
export const STORE_FLEET_SUPPLY__REQUEST_RESET = 'STORE_FLEET_SUPPLY__REQUEST_RESET';
export const STORE_FLEET_SUPPLY__REQUEST_FAILED = 'STORE_FLEET_SUPPLY__REQUEST_FAILED';
export const STORE_FLEET_SUPPLY__REQUEST_SUCCEEDED = 'STORE_FLEET_SUPPLY__REQUEST_SUCCEEDED';

// ======================================================== Fleets
// Set fleets init data into store
export const storeFleetsRequestInit = () => ({
    type: STORE_FLEETS_REQUEST_INIT
});

// Set fleets failed data into store
export const storeFleetsRequestFailed = ({message}) => ({
    message,
    type: STORE_FLEETS_REQUEST_FAILED
});

// Set fleets succeeded data into store
export const storeFleetsRequestSucceed = ({message}) => ({
    message,
    type: STORE_FLEETS_REQUEST_SUCCEEDED
});

// Set fleets reset data into store
export const storeFleetsRequestReset = () => ({
    type: STORE_FLEETS_REQUEST_RESET
});
// ======================================================== Next fleets
// Set next fleets init data into store
export const storeNextFleetsRequestInit = () => ({
    type: STORE_NEXT_FLEETS_REQUEST_INIT
});

// Set next fleets failed data into store
export const storeNextFleetsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_FLEETS_REQUEST_FAILED
});

// Set next fleets succeeded data into store
export const storeNextFleetsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_FLEETS_REQUEST_SUCCEEDED
});

// Set next fleets reset data into store
export const storeNextFleetsRequestReset = () => ({
    type: STORE_NEXT_FLEETS_REQUEST_RESET
});
// ======================================================== Fleet supply
// Set fleet supply init data into store
export const storeFleetSupplyRequestInit = () => ({
    type: STORE_FLEET_SUPPLY_REQUEST_INIT
});

// Set fleet supply failed data into store
export const storeFleetSupplyRequestFailed = ({message}) => ({
    message,
    type: STORE_FLEET_SUPPLY__REQUEST_FAILED
});

// Set fleet supply succeeded data into store
export const storeFleetSupplyRequestSucceed = ({message}) => ({
    message,
    type: STORE_FLEET_SUPPLY__REQUEST_SUCCEEDED
});

// Set fleet supply reset data into store
export const storeFleetSupplyRequestReset = () => ({
    type: STORE_FLEET_SUPPLY__REQUEST_RESET
});