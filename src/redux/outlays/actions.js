// Reducer action types
export const STORE_SET_OUTLAY_DATA = 'STORE_SET_OUTLAY_DATA';
export const STORE_SET_OUTLAYS_DATA = 'STORE_SET_OUTLAYS_DATA';

// Middleware action types
export const EMIT_NEW_OUTLAY = 'EMIT_NEW_OUTLAY';
export const EMIT_OUTLAYS_FETCH = 'EMIT_OUTLAYS_FETCH';

//====================== Reducer trigger actions
// Set outlays data in store
export const storeSetOutlaysData = ({outlays}) => ({
    outlays,
    type: STORE_SET_OUTLAYS_DATA
});

// Set outlay data in store
export const storeSetOutlayData = ({outlay}) => ({
    outlay,
    type: STORE_SET_OUTLAY_DATA
});

//====================== Middleware trigger actions
// Emit outlays fetch
export const emitOutlaysFetch = () => ({
    type: EMIT_OUTLAYS_FETCH
});

// Emit new outlay
export const emitNewOutlay = ({amount, collector, receipt}) => ({
    amount,
    receipt,
    collector,
    type: EMIT_NEW_OUTLAY
});
