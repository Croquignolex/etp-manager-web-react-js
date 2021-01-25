// Reducer action types
export const STORE_SET_TRANSFERS_DATA = 'STORE_SET_TRANSFERS_DATA';
export const STORE_SET_NEW_TRANSFER_DATA = 'STORE_SET_NEW_TRANSFER_DATA';
export const STORE_SET_NEXT_TRANSFERS_DATA = 'STORE_SET_NEXT_TRANSFERS_DATA';
export const STORE_STOP_INFINITE_SCROLL_TRANSFER_DATA = 'STORE_STOP_INFINITE_SCROLL_TRANSFER_DATA';

// Middleware action types
export const EMIT_ADD_TRANSFER = 'EMIT_ADD_TRANSFER';
export const EMIT_TRANSFERS_FETCH = 'EMIT_TRANSFERS_FETCH';
export const EMIT_NEXT_TRANSFERS_FETCH = 'EMIT_NEXT_TRANSFERS_FETCH';

//====================== Reducer trigger actions
// Set transfers data in store
export const storeSetTransfersData = ({transfers, hasMoreData, page}) => ({
    page,
    transfers,
    hasMoreData,
    type: STORE_SET_TRANSFERS_DATA
});

// Set new transfer data in store
export const storeSetNewTransferData = ({transfer}) => ({
    transfer,
    type: STORE_SET_NEW_TRANSFER_DATA
});

// Set next transfers data in store
export const storeSetNextTransfersData = ({transfers, hasMoreData, page}) => ({
    page,
    transfers,
    hasMoreData,
    type: STORE_SET_NEXT_TRANSFERS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollTransferData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_TRANSFER_DATA
});

//====================== Middleware trigger actions
// Emit transfers fetch
export const emitTransfersFetch = () => ({
    type: EMIT_TRANSFERS_FETCH
});

// Emit next transfers fetch
export const emitNextTransfersFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_TRANSFERS_FETCH
});

// Emit add transfer
export const emitAddTransfer = ({amount, managerSim, collectorSim}) => ({
    amount,
    managerSim,
    collectorSim,
    type: EMIT_ADD_TRANSFER
});
