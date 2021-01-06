// Reducer action types
export const STORE_AGENTS_REQUEST_INIT = 'STORE_AGENTS_REQUEST_INIT';
export const STORE_AGENTS_REQUEST_RESET = 'STORE_AGENTS_REQUEST_RESET';
export const STORE_AGENTS_REQUEST_FAILED = 'STORE_AGENTS_REQUEST_FAILED';
export const STORE_AGENTS_REQUEST_SUCCEEDED = 'STORE_AGENTS_REQUEST_SUCCEEDED';

export const STORE_NEXT_AGENTS_REQUEST_INIT = 'STORE_NEXT_AGENTS_REQUEST_INIT';
export const STORE_NEXT_AGENTS_REQUEST_RESET = 'STORE_NEXT_AGENTS_REQUEST_RESET';
export const STORE_NEXT_AGENTS_REQUEST_FAILED = 'STORE_NEXT_AGENTS_REQUEST_FAILED';
export const STORE_NEXT_AGENTS_REQUEST_SUCCEEDED = 'STORE_NEXT_AGENTS_REQUEST_SUCCEEDED';

export const STORE_ALL_AGENTS_REQUEST_INIT = 'STORE_ALL_AGENTS_REQUEST_INIT';
export const STORE_ALL_AGENTS_REQUEST_RESET = 'STORE_ALL_AGENTS_REQUEST_RESET';
export const STORE_ALL_AGENTS_REQUEST_FAILED = 'STORE_ALL_AGENTS_REQUEST_FAILED';
export const STORE_ALL_AGENTS_REQUEST_SUCCEEDED = 'STORE_ALL_AGENTS_REQUEST_SUCCEEDED';

// ======================================================== Agents
// Set agents init data into store
export const storeAgentsRequestInit = () => ({
    type: STORE_AGENTS_REQUEST_INIT
});

// Set agents failed data into store
export const storeAgentsRequestFailed = ({message}) => ({
    message,
    type: STORE_AGENTS_REQUEST_FAILED
});

// Set agents succeeded data into store
export const storeAgentsRequestSucceed = ({message}) => ({
    message,
    type: STORE_AGENTS_REQUEST_SUCCEEDED
});

// Set agents reset data into store
export const storeAgentsRequestReset = () => ({
    type: STORE_AGENTS_REQUEST_RESET
});
// ======================================================== Next agents
// Set next agents init data into store
export const storeNextAgentsRequestInit = () => ({
    type: STORE_NEXT_AGENTS_REQUEST_INIT
});

// Set next agents failed data into store
export const storeNextAgentsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_AGENTS_REQUEST_FAILED
});

// Set next agents succeeded data into store
export const storeNextAgentsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_AGENTS_REQUEST_SUCCEEDED
});

// Set next agents reset data into store
export const storeNextAgentsRequestReset = () => ({
    type: STORE_NEXT_AGENTS_REQUEST_RESET
});
// ======================================================== All agents
// Set all agents init data into store
export const storeAllAgentsRequestInit = () => ({
    type: STORE_ALL_AGENTS_REQUEST_INIT
});

// Set all agents failed data into store
export const storeAllAgentsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_AGENTS_REQUEST_FAILED
});

// Set all agents succeeded data into store
export const storeAllAgentsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_AGENTS_REQUEST_SUCCEEDED
});

// Set all agents reset data into store
export const storeAllAgentsRequestReset = () => ({
    type: STORE_ALL_AGENTS_REQUEST_RESET
});