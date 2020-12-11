// Reducer action types
export const STORE_REQUEST_INIT = 'STORE_REQUEST_INIT';
export const STORE_CURRENT_PATH = 'STORE_CURRENT_PATH';
export const STORE_REQUEST_FAILED = 'STORE_REQUEST_FAILED';
export const STORE_LISTING_RESPONSE = 'STORE_LISTING_RESPONSE';
export const STORE_REQUEST_SUCCEEDED = 'STORE_REQUEST_SUCCEEDED';

// Middleware action types
export const EMIT_COMPARE_LISTING = 'EMIT_COMPARE_LISTING';

//====================== Reducer trigger actions
// Set init data into store
export const storeRequestInit = ({scope}) => ({
    scope,
    type: STORE_REQUEST_INIT
});

// Set failed data into store
export const storeRequestFailed = ({scope}) => ({
    scope,
    type: STORE_REQUEST_FAILED
});

// Set succeeded data into store
export const storeRequestSucceed = ({scope}) => ({
    scope,
    type: STORE_REQUEST_SUCCEEDED
});

// Set current path data into store
export const storeCurrentPath = ({path}) => ({
    path,
    type: STORE_CURRENT_PATH
});

// Set listing response into store
export const storeListingResponse = ({response}) => ({
    response,
    type: STORE_LISTING_RESPONSE
});

//====================== Middleware trigger actions
// Emit compare listing
export const emitCompareListing = ({document, sim}) => ({
    sim,
    document,
    type: EMIT_COMPARE_LISTING
});


