// Reducer action types
export const STORE_VENDORS_REQUEST_INIT = 'STORE_VENDORS_REQUEST_INIT';
export const STORE_VENDORS_REQUEST_RESET = 'STORE_VENDORS_REQUEST_RESET';
export const STORE_VENDORS_REQUEST_FAILED = 'STORE_VENDORS_REQUEST_FAILED';
export const STORE_VENDORS_REQUEST_SUCCEEDED = 'STORE_VENDORS_REQUEST_SUCCEEDED';

export const STORE_NEXT_VENDORS_REQUEST_INIT = 'STORE_NEXT_VENDORS_REQUEST_INIT';
export const STORE_NEXT_VENDORS_REQUEST_RESET = 'STORE_NEXT_VENDORS_REQUEST_RESET';
export const STORE_NEXT_VENDORS_REQUEST_FAILED = 'STORE_NEXT_VENDORS_REQUEST_FAILED';
export const STORE_NEXT_VENDORS_REQUEST_SUCCEEDED = 'STORE_NEXT_VENDORS_REQUEST_SUCCEEDED';

export const STORE_ALL_VENDORS_REQUEST_INIT = 'STORE_ALL_VENDORS_REQUEST_INIT';
export const STORE_ALL_VENDORS_REQUEST_RESET = 'STORE_ALL_VENDORS_REQUEST_RESET';
export const STORE_ALL_VENDORS_REQUEST_FAILED = 'STORE_ALL_VENDORS_REQUEST_FAILED';
export const STORE_ALL_VENDORS_REQUEST_SUCCEEDED = 'STORE_ALL_VENDORS_REQUEST_SUCCEEDED';

export const STORE_SHOW_VENDOR_REQUEST_INIT = 'STORE_SHOW_VENDOR_REQUEST_INIT';
export const STORE_SHOW_VENDOR_REQUEST_RESET = 'STORE_SHOW_VENDOR_REQUEST_RESET';
export const STORE_SHOW_VENDOR_REQUEST_FAILED = 'STORE_SHOW_VENDOR_REQUEST_FAILED';
export const STORE_SHOW_VENDOR_REQUEST_SUCCEEDED = 'STORE_SHOW_VENDOR_REQUEST_SUCCEEDED';

// ======================================================== Vendors
// Set vendors init data into store
export const storeVendorsRequestInit = () => ({
    type: STORE_VENDORS_REQUEST_INIT
});

// Set vendors failed data into store
export const storeVendorsRequestFailed = ({message}) => ({
    message,
    type: STORE_VENDORS_REQUEST_FAILED
});

// Set vendors succeeded data into store
export const storeVendorsRequestSucceed = ({message}) => ({
    message,
    type: STORE_VENDORS_REQUEST_SUCCEEDED
});

// Set vendors reset data into store
export const storeVendorsRequestReset = () => ({
    type: STORE_VENDORS_REQUEST_RESET
});
// ======================================================== Next vendors
// Set next vendors init data into store
export const storeNextVendorsRequestInit = () => ({
    type: STORE_NEXT_VENDORS_REQUEST_INIT
});

// Set next vendors failed data into store
export const storeNextVendorsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_VENDORS_REQUEST_FAILED
});

// Set next vendors succeeded data into store
export const storeNextVendorsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_VENDORS_REQUEST_SUCCEEDED
});

// Set next vendors reset data into store
export const storeNextVendorsRequestReset = () => ({
    type: STORE_NEXT_VENDORS_REQUEST_RESET
});
// ======================================================== All vendors
// Set all vendors init data into store
export const storeAllVendorsRequestInit = () => ({
    type: STORE_ALL_VENDORS_REQUEST_INIT
});

// Set all vendors failed data into store
export const storeAllVendorsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_VENDORS_REQUEST_FAILED
});

// Set all vendors succeeded data into store
export const storeAllVendorsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_VENDORS_REQUEST_SUCCEEDED
});

// Set all vendors reset data into store
export const storeAllVendorsRequestReset = () => ({
    type: STORE_ALL_VENDORS_REQUEST_RESET
});
// ======================================================== Show vendor
// Set show vendor init data into store
export const storeShowVendorRequestInit = () => ({
    type: STORE_SHOW_VENDOR_REQUEST_INIT
});

// Set show vendor failed data into store
export const storeShowVendorRequestFailed = ({message}) => ({
    message,
    type: STORE_SHOW_VENDOR_REQUEST_FAILED
});

// Set show vendor succeeded data into store
export const storeShowVendorRequestSucceed = ({message}) => ({
    message,
    type: STORE_SHOW_VENDOR_REQUEST_SUCCEEDED
});

// Set show vendor reset data into store
export const storeShowVendorRequestReset = () => ({
    type: STORE_SHOW_VENDOR_REQUEST_RESET
});