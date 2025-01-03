// Reducer action types
export const STORE_SET_HANDOVERS_DATA = 'STORE_SET_HANDOVERS_DATA';
export const STORE_UPDATE_HANDOVER_DATA = 'STORE_UPDATE_HANDOVER_DATA';
export const STORE_CANCEL_HANDOVER_DATA = 'STORE_CANCEL_HANDOVER_DATA';
export const STORE_SET_NEW_HANDOVER_DATA = 'STORE_SET_NEW_HANDOVER_DATA';
export const STORE_SET_NEXT_HANDOVERS_DATA = 'STORE_SET_NEXT_HANDOVERS_DATA';
export const STORE_SET_GROUP_HANDOVERS_DATA = 'STORE_SET_GROUP_HANDOVERS_DATA';
export const STORE_SET_HANDOVER_ACTION_DATA = 'STORE_SET_HANDOVER_ACTION_DATA';
export const STORE_STOP_INFINITE_SCROLL_HANDOVER_DATA = 'STORE_STOP_INFINITE_SCROLL_HANDOVER_DATA';

// Middleware action types
export const EMIT_HANDOVERS_FETCH = 'EMIT_HANDOVERS_FETCH';
export const EMIT_CANCEL_HANDOVER = 'EMIT_CANCEL_HANDOVER';
export const EMIT_IMPROVE_HANDOVER = 'EMIT_IMPROVE_HANDOVER';
export const EMIT_CONFIRM_HANDOVER = 'EMIT_CONFIRM_HANDOVER';
export const EMIT_NEXT_HANDOVERS_FETCH = 'EMIT_NEXT_HANDOVERS_FETCH';
export const EMIT_GROUP_CONFIRM_HANDOVER = 'EMIT_GROUP_CONFIRM_HANDOVER';
export const EMIT_GROUP_HANDOVERS_FETCH = 'EMIT_GROUP_HANDOVERS_FETCH';

//====================== Reducer trigger actions
// Set handovers data in store
export const storeSetHandoversData = ({handovers, hasMoreData, page}) => ({
    page,
    handovers,
    hasMoreData,
    type: STORE_SET_HANDOVERS_DATA
});

// Set new handover data in store
export const storeSetNewHandoverData = ({handover}) => ({
    handover,
    type: STORE_SET_NEW_HANDOVER_DATA
});

// Set next handovers data in store
export const storeSetNextHandoversData = ({handovers, hasMoreData, page}) => ({
    page,
    handovers,
    hasMoreData,
    type: STORE_SET_NEXT_HANDOVERS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollHandoverData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_HANDOVER_DATA
});

// Set handover action data in store
export const storeSetHandoverActionData = ({id}) => ({
    id,
    type: STORE_SET_HANDOVER_ACTION_DATA
});

// Set update handover data in store
export const storeUpdateHandoverData = ({id}) => ({
    id,
    type: STORE_UPDATE_HANDOVER_DATA
});

// Set cancel handover data in store
export const storeCancelHandoverData = ({id}) => ({
    id,
    type: STORE_CANCEL_HANDOVER_DATA
});

// Set group handovers data in store
export const storeSetGroupHandoversData = ({handovers}) => ({
    handovers,
    type: STORE_SET_GROUP_HANDOVERS_DATA
});

//====================== Middleware trigger actions
// Emit handovers fetch
export const emitHandoversFetch = () => ({
    type: EMIT_HANDOVERS_FETCH
});

// Emit next handovers fetch
export const emitNextHandoversFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_HANDOVERS_FETCH
});

// Emit improve handover
export const emitImproveHandover = ({amount, receiver}) => ({
    amount,
    receiver,
    type: EMIT_IMPROVE_HANDOVER
});

// Emit confirm handover
export const emitConfirmHandover = ({id}) => ({
    id,
    type: EMIT_CONFIRM_HANDOVER
});

// Emit cancel handover
export const emitCancelHandover = ({id}) => ({
    id,
    type: EMIT_CANCEL_HANDOVER
});

// Emit group handovers fetch
export const emitGroupHandoversFetch = () => ({
    type: EMIT_GROUP_HANDOVERS_FETCH
});

// Emit group confirm handover
export const emitGroupConfirmHandover = ({ids}) => ({
    ids,
    type: EMIT_GROUP_CONFIRM_HANDOVER
});
