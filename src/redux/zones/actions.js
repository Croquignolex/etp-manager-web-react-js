// Reducer action types
export const STORE_SET_ZONES_DATA = 'STORE_SET_ZONES_DATA';

// Middleware action types
export const EMIT_ALL_ZONES_FETCH = 'EMIT_ALL_ZONES_FETCH';

//====================== Reducer trigger actions
// Set zones data in store
export const storeSetZonesData = ({zones, hasMoreData, page}) => ({
    page,
    zones,
    hasMoreData,
    type: STORE_SET_ZONES_DATA
});

//====================== Middleware trigger actions
// Emit all zones fetch
export const emitAllZonesFetch = () => ({
    type: EMIT_ALL_ZONES_FETCH
});