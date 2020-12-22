// Reducer action types
export const STORE_SET_USER_CHECK_ERROR_DATA = 'STORE_SET_USER_CHECK_ERROR_DATA';
export const STORE_RESET_USER_CHECK_ERROR_DATA = 'STORE_RESET_USER_CHECK_ERROR_DATA';

export const STORE_SET_USER_PASSWORD_EDIT_ERROR_DATA = 'STORE_SET_USER_PASSWORD_EDIT_ERROR_DATA';
export const STORE_RESET_USER_PASSWORD_EDIT_ERROR_DATA = 'STORE_RESET_USER_PASSWORD_EDIT_ERROR_DATA';

export const STORE_SET_USER_PROFILE_EDIT_ERROR_DATA = 'STORE_SET_USER_PROFILE_EDIT_ERROR_DATA';
export const STORE_RESET_USER_PROFILE_EDIT_ERROR_DATA = 'STORE_RESET_USER_PROFILE_EDIT_ERROR_DATA';

// ======================================================== User check
// Empty user check error data into store
export const storeResetUserCheckErrorData = () => ({
    type: STORE_RESET_USER_CHECK_ERROR_DATA
});

// Set user check error data in store
export const storeSetUserCheckErrorData = ({message}) => ({
    message,
    type: STORE_SET_USER_CHECK_ERROR_DATA
});
// ======================================================== Password edit
// Empty user password edit error data into store
export const storeResetUserPasswordEditErrorData = () => ({
    type: STORE_RESET_USER_PASSWORD_EDIT_ERROR_DATA
});

// Set user password edit error data in store
export const storeSetUserPasswordEditErrorData = ({message}) => ({
    message,
    type: STORE_SET_USER_PASSWORD_EDIT_ERROR_DATA
});
// ======================================================== Profile edit
// Empty user profile edit error data into store
export const storeResetUserProfileEditErrorData = () => ({
    type: STORE_RESET_USER_PROFILE_EDIT_ERROR_DATA
});

// Set user profile edit error data in store
export const storeSetUserProfileEditErrorData = ({message}) => ({
    message,
    type: STORE_SET_USER_PROFILE_EDIT_ERROR_DATA
});