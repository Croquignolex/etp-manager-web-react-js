// Reducer action types
export const STORE_SET_TRANSFERS_DATA = 'STORE_SET_TRANSFERS_DATA';
export const STORE_UPDATE_TRANSFER_DATA = 'STORE_UPDATE_TRANSFER_DATA';
export const STORE_CANCEL_TRANSFER_DATA = 'STORE_CANCEL_TRANSFER_DATA';
export const STORE_SET_NEW_TRANSFER_DATA = 'STORE_SET_NEW_TRANSFER_DATA';
export const STORE_SET_NEXT_TRANSFERS_DATA = 'STORE_SET_NEXT_TRANSFERS_DATA';
export const STORE_SET_GROUP_TRANSFERS_DATA = 'STORE_SET_GROUP_TRANSFERS_DATA';
export const STORE_SET_TRANSFER_ACTION_DATA = 'STORE_SET_TRANSFER_ACTION_DATA';
export const STORE_STOP_INFINITE_SCROLL_TRANSFER_DATA = 'STORE_STOP_INFINITE_SCROLL_TRANSFER_DATA';

// Middleware action types
export const EMIT_ADD_TRANSFER = 'EMIT_ADD_TRANSFER';
export const EMIT_TRANSFERS_FETCH = 'EMIT_TRANSFERS_FETCH';
export const EMIT_CANCEL_TRANSFER = 'EMIT_CANCEL_TRANSFER';
export const EMIT_CONFIRM_TRANSFER = 'EMIT_CONFIRM_TRANSFER';
export const EMIT_NEXT_TRANSFERS_FETCH = 'EMIT_NEXT_TRANSFERS_FETCH';
export const EMIT_GROUP_TRANSFERS_FETCH = 'EMIT_GROUP_TRANSFERS_FETCH';
export const EMIT_GROUP_CONFIRM_TRANSFER = 'EMIT_GROUP_CONFIRM_TRANSFER';

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

// Set transfer action data in store
export const storeSetTransferActionData = ({id}) => ({
    id,
    type: STORE_SET_TRANSFER_ACTION_DATA
});

// Set update transfer data in store
export const storeUpdateTransferData = ({id}) => ({
    id,
    type: STORE_UPDATE_TRANSFER_DATA
});

// Set cancel transfer data in store
export const storeCancelTransferData = ({id}) => ({
    id,
    type: STORE_CANCEL_TRANSFER_DATA
});

// Set group transfers data in store
export const storeSetGroupTransfersData = ({transfers}) => ({
    transfers,
    type: STORE_SET_GROUP_TRANSFERS_DATA
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

// Emit confirm transfer
export const emitConfirmTransfer = ({id}) => ({
    id,
    type: EMIT_CONFIRM_TRANSFER
});

// Emit cancel transfer
export const emitCancelTransfer = ({id}) => ({
    id,
    type: EMIT_CANCEL_TRANSFER
});

// Emit group transfers fetch
export const emitGroupTransfersFetch = () => ({
    type: EMIT_GROUP_TRANSFERS_FETCH
});

// Emit group confirm transfer
export const emitGroupConfirmTransfer = ({ids}) => ({
    ids,
    type: EMIT_GROUP_CONFIRM_TRANSFER
});
