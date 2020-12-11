// Reducer action types
export const STORE_SET_TRANSFER_DATA = 'STORE_SET_TRANSFER_DATA';
export const STORE_SET_TRANSFERS_DATA = 'STORE_SET_TRANSFERS_DATA';

// Middleware action types
export const EMIT_TRANSFERS_FETCH = 'EMIT_TRANSFERS_FETCH';
export const EMIT_NEW_TRANSFER_BY_MANAGER = 'EMIT_NEW_TRANSFER_BY_MANAGER';
export const EMIT_NEW_TRANSFER_BY_COLLECTOR = 'EMIT_NEW_TRANSFER_BY_COLLECTOR';
export const EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_MANAGER = 'EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_MANAGER';
export const EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_COLLECTOR = 'EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_COLLECTOR';

//====================== Reducer trigger actions
// Set transfers data in store
export const storeSetTransfersData = ({transfers}) => ({
    transfers,
    type: STORE_SET_TRANSFERS_DATA
});

// Set transfer data in store
export const storeSetTransferData = ({transfer}) => ({
    transfer,
    type: STORE_SET_TRANSFER_DATA
});

//====================== Middleware trigger actions
// Emit transfers fetch
export const emitTransfersFetch = () => ({
    type: EMIT_TRANSFERS_FETCH
});

// Emit new transfer by supervisor
export const emitNewTransferBySupervisorForManager = ({amount, supervisorSim, managerSim}) => ({
    amount,
    managerSim,
    supervisorSim,
    type: EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_MANAGER
});

// Emit new transfer by supervisor
export const emitNewTransferBySupervisorForCollector = ({amount, supervisorSim, collectorSim}) => ({
    amount,
    collectorSim,
    supervisorSim,
    type: EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_COLLECTOR
});

// Emit new transfer by manager
export const emitNewTransferManager = ({amount, managerSim, collectorSim}) => ({
    amount,
    managerSim,
    collectorSim,
    type: EMIT_NEW_TRANSFER_BY_MANAGER
});

// Emit new transfer by collector
export const emitNewTransferCollector = ({amount, managerOrSupervisorSim, collectorSim}) => ({
    amount,
    collectorSim,
    managerOrSupervisorSim,
    type: EMIT_NEW_TRANSFER_BY_COLLECTOR
});
