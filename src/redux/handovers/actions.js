// Reducer action types
export const STORE_SET_HANDOVER_DATA = 'STORE_SET_HANDOVER_DATA';
export const STORE_SET_HANDOVERS_DATA = 'STORE_SET_HANDOVERS_DATA';

// Middleware action types
export const EMIT_NEW_HANDOVER = 'EMIT_NEW_HANDOVER';
export const EMIT_HANDOVERS_FETCH = 'EMIT_HANDOVERS_FETCH';

//====================== Reducer trigger actions
// Set handovers data in store
export const storeSetHandoversData = ({handovers}) => ({
    handovers,
    type: STORE_SET_HANDOVERS_DATA
});

// Set handover data in store
export const storeSetHandoverData = ({handover}) => ({
    handover,
    type: STORE_SET_HANDOVER_DATA
});

//====================== Middleware trigger actions
// Emit handovers fetch
export const emitHandoversFetch = () => ({
    type: EMIT_HANDOVERS_FETCH
});

// Emit new handover
export const emitNewHandover = ({amount, manager}) => ({
    amount,
    manager,
    type: EMIT_NEW_HANDOVER
});
