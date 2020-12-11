// Reducer action types
export const STORE_RESET_TOAST = 'STORE_RESET_TOAST';
export const STORE_SET_INFO_TOAST_DATA = 'STORE_SET_INFO_TOAST_DATA';
export const STORE_SET_DANGER_TOAST_DATA = 'STORE_SET_DANGER_TOAST_DATA';
export const STORE_SET_WARNING_TOAST_DATA = 'STORE_SET_WARNING_TOAST_DATA';
export const STORE_SET_SUCCESS_TOAST_DATA = 'STORE_SET_SUCCESS_TOAST_DATA';

//====================== Reducer trigger actions
// Empty toast data into store
export const storeResetToastData = () => ({
    type: STORE_RESET_TOAST
});

// Set danger toast data in store
export const storeSetDangerToastData = ({title, body}) => ({
    body,
    title,
    type: STORE_SET_DANGER_TOAST_DATA
});

// Set warning toast data in store
export const storeSetWarningToastData = ({title, body}) => ({
    body,
    title,
    type: STORE_SET_WARNING_TOAST_DATA
});

// Set info toast data in store
export const storeSetInfoToastData = ({title, body}) => ({
    body,
    title,
    type: STORE_SET_INFO_TOAST_DATA
});

// Set success toast data in store
export const storeSetSuccessToastData = ({title, body}) => ({
    body,
    title,
    type: STORE_SET_SUCCESS_TOAST_DATA
});
