// Reducer action types
export const STORE_NOTIFICATIONS_REQUEST_INIT = 'STORE_NOTIFICATIONS_REQUEST_INIT';
export const STORE_NOTIFICATIONS_REQUEST_RESET = 'STORE_NOTIFICATIONS_REQUEST_RESET';
export const STORE_NOTIFICATIONS_REQUEST_FAILED = 'STORE_NOTIFICATIONS_REQUEST_FAILED';
export const STORE_NOTIFICATIONS_REQUEST_SUCCEEDED = 'STORE_NOTIFICATIONS_REQUEST_SUCCEEDED';

// Set notifications init data into store
export const storeNotificationsRequestInit = () => ({
    type: STORE_NOTIFICATIONS_REQUEST_INIT
});

// Set notifications failed data into store
export const storeNotificationsRequestFailed = ({message}) => ({
    message,
    type: STORE_NOTIFICATIONS_REQUEST_FAILED
});

// Set notifications succeeded data into store
export const storeNotificationsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NOTIFICATIONS_REQUEST_SUCCEEDED
});

// Set notifications reset data into store
export const storeNotificationsRequestReset = () => ({
    type: STORE_NOTIFICATIONS_REQUEST_RESET
});