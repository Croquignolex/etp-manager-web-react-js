// Reducer action types
export const STORE_REFUELS_REQUEST_INIT = 'STORE_REFUELS_REQUEST_INIT';
export const STORE_REFUELS_REQUEST_RESET = 'STORE_REFUELS_REQUEST_RESET';
export const STORE_REFUELS_REQUEST_FAILED = 'STORE_REFUELS_REQUEST_FAILED';
export const STORE_REFUELS_REQUEST_SUCCEEDED = 'STORE_REFUELS_REQUEST_SUCCEEDED';

export const STORE_NEXT_REFUELS_REQUEST_INIT = 'STORE_NEXT_REFUELS_REQUEST_INIT';
export const STORE_NEXT_REFUELS_REQUEST_RESET = 'STORE_NEXT_REFUELS_REQUEST_RESET';
export const STORE_NEXT_REFUELS_REQUEST_FAILED = 'STORE_NEXT_REFUELS_REQUEST_FAILED';
export const STORE_NEXT_REFUELS_REQUEST_SUCCEEDED = 'STORE_NEXT_REFUELS_REQUEST_SUCCEEDED';

export const STORE_ADD_REFUEL_REQUEST_INIT = 'STORE_ADD_REFUEL_REQUEST_INIT';
export const STORE_ADD_REFUEL_REQUEST_RESET = 'STORE_ADD_REFUEL_REQUEST_RESET';
export const STORE_ADD_REFUEL_REQUEST_FAILED = 'STORE_ADD_REFUEL_REQUEST_FAILED';
export const STORE_ADD_REFUEL_REQUEST_SUCCEEDED = 'STORE_ADD_REFUEL_REQUEST_SUCCEEDED';

export const STORE_CONFIRM_REFUEL_REQUEST_INIT = 'STORE_CONFIRM_REFUEL_REQUEST_INIT';
export const STORE_CONFIRM_REFUEL_REQUEST_RESET = 'STORE_CONFIRM_REFUEL_REQUEST_RESET';
export const STORE_CONFIRM_REFUEL_REQUEST_FAILED = 'STORE_CONFIRM_REFUEL_REQUEST_FAILED';
export const STORE_CONFIRM_REFUEL_REQUEST_SUCCEEDED = 'STORE_CONFIRM_REFUEL_REQUEST_SUCCEEDED';

export const STORE_ADD_ANONYMOUS_REFUEL_REQUEST_INIT = 'STORE_ADD_ANONYMOUS_REFUEL_REQUEST_INIT';
export const STORE_ADD_ANONYMOUS_REFUEL_REQUEST_RESET = 'STORE_ADD_ANONYMOUS_REFUEL_REQUEST_RESET';
export const STORE_ADD_ANONYMOUS_REFUEL_REQUEST_FAILED = 'STORE_ADD_ANONYMOUS_REFUEL_REQUEST_FAILED';
export const STORE_ADD_ANONYMOUS_REFUEL_REQUEST_SUCCEEDED = 'STORE_ADD_ANONYMOUS_REFUEL_REQUEST_SUCCEEDED';

// ======================================================== Refuels
// Set refuels init data into store
export const storeRefuelsRequestInit = () => ({
    type: STORE_REFUELS_REQUEST_INIT
});

// Set refuels failed data into store
export const storeRefuelsRequestFailed = ({message}) => ({
    message,
    type: STORE_REFUELS_REQUEST_FAILED
});

// Set refuels succeeded data into store
export const storeRefuelsRequestSucceed = ({message}) => ({
    message,
    type: STORE_REFUELS_REQUEST_SUCCEEDED
});

// Set refuels reset data into store
export const storeRefuelsRequestReset = () => ({
    type: STORE_REFUELS_REQUEST_RESET
});
// ======================================================== Next refuels
// Set next refuels init data into store
export const storeNextRefuelsRequestInit = () => ({
    type: STORE_NEXT_REFUELS_REQUEST_INIT
});

// Set next refuels failed data into store
export const storeNextRefuelsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_REFUELS_REQUEST_FAILED
});

// Set next refuels succeeded data into store
export const storeNextRefuelsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_REFUELS_REQUEST_SUCCEEDED
});

// Set next refuels reset data into store
export const storeNextRefuelsRequestReset = () => ({
    type: STORE_NEXT_REFUELS_REQUEST_RESET
});
// ======================================================== Add refuel
// Set add refuel init data into store
export const storeAddRefuelRequestInit = () => ({
    type: STORE_ADD_REFUEL_REQUEST_INIT
});

// Set add refuel failed data into store
export const storeAddRefuelRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_REFUEL_REQUEST_FAILED
});

// Set add refuel succeeded data into store
export const storeAddRefuelRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_REFUEL_REQUEST_SUCCEEDED
});

// Set add refuel reset data into store
export const storeAddRefuelRequestReset = () => ({
    type: STORE_ADD_REFUEL_REQUEST_RESET
});
// ======================================================== Confirm refuel
// Set confirm refuel init data into store
export const storeConfirmRefuelRequestInit = () => ({
    type: STORE_CONFIRM_REFUEL_REQUEST_INIT
});

// Set confirm refuel failed data into store
export const storeConfirmRefuelRequestFailed = ({message}) => ({
    message,
    type: STORE_CONFIRM_REFUEL_REQUEST_FAILED
});

// Set confirm refuel succeeded data into store
export const storeConfirmRefuelRequestSucceed = ({message}) => ({
    message,
    type: STORE_CONFIRM_REFUEL_REQUEST_SUCCEEDED
});

// Set confirm refuel reset data into store
export const storeConfirmRefuelRequestReset = () => ({
    type: STORE_CONFIRM_REFUEL_REQUEST_RESET
});
// ======================================================== Add anonymous refuel
// Set add anonymous refuel init data into store
export const storeAddAnonymousRefuelRequestInit = () => ({
    type: STORE_ADD_ANONYMOUS_REFUEL_REQUEST_INIT
});

// Set add anonymous refuel failed data into store
export const storeAddAnonymousRefuelRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_ANONYMOUS_REFUEL_REQUEST_FAILED
});

// Set add anonymous refuel succeeded data into store
export const storeAddAnonymousRefuelRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_ANONYMOUS_REFUEL_REQUEST_SUCCEEDED
});

// Set add anonymous refuel reset data into store
export const storeAddAnonymousRefuelRequestReset = () => ({
    type: STORE_ADD_ANONYMOUS_REFUEL_REQUEST_RESET
});