// Reducer action types
export const STORE_SET_ANONYMOUS_DATA = 'STORE_SET_ANONYMOUS_DATA';
export const STORE_SET_NEW_ANONYMOUS_DATA = 'STORE_SET_NEW_ANONYMOUS_DATA';
export const STORE_SET_NEXT_ANONYMOUS_DATA = 'STORE_SET_NEXT_ANONYMOUS_DATA';
export const STORE_STOP_INFINITE_SCROLL_ANONYMOUS_DATA = 'STORE_STOP_INFINITE_SCROLL_ANONYMOUS_DATA';

// Middleware action types
export const EMIT_ADD_ANONYMOUS = 'EMIT_ADD_ANONYMOUS';
export const EMIT_ANONYMOUS_FETCH = 'EMIT_ANONYMOUS_FETCH';
export const EMIT_NEXT_ANONYMOUS_FETCH = 'EMIT_NEXT_ANONYMOUS_FETCH';

//====================== Reducer trigger actions
// Set anonymous data in store
export const storeSetAnonymousData = ({anonymous, hasMoreData, page}) => ({
    page,
    anonymous,
    hasMoreData,
    type: STORE_SET_ANONYMOUS_DATA
});

// Set new anonymous data in store
export const storeSetNewAnonymousData = ({anonymous}) => ({
    anonymous,
    type: STORE_SET_NEW_ANONYMOUS_DATA
});

// Set next anonymous data in store
export const storeSetNextAnonymousData = ({anonymous, hasMoreData, page}) => ({
    page,
    anonymous,
    hasMoreData,
    type: STORE_SET_NEXT_ANONYMOUS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollAnonymousData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_ANONYMOUS_DATA
});

//====================== Middleware trigger actions
// Emit anonymous fetch
export const emitAnonymousFetch = () => ({
    type: EMIT_ANONYMOUS_FETCH
});

// Emit next anonymous fetch
export const emitNextAnonymousFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_ANONYMOUS_FETCH
});

// Emit add anonymous
export const emitAddAnonymous = ({sim, amount, receiver, receiverSim}) => ({
    sim,
    amount,
    receiver,
    receiverSim,
    type: EMIT_ADD_ANONYMOUS
});
