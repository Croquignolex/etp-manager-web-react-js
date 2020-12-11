// Reducer action types
export const STORE_SET_RECOVERY_DATA = 'STORE_SET_RECOVERY_DATA';
export const STORE_SET_RECOVERIES_DATA = 'STORE_SET_RECOVERIES_DATA';
export const STORE_SET_RECOVERIES_ACTION_DATA = 'STORE_SET_RECOVERIES_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_CASH_RECOVERY = 'EMIT_NEW_CASH_RECOVERY';
export const EMIT_NEW_FLEET_RECOVERY = 'EMIT_NEW_FLEET_RECOVERY';
export const EMIT_CONFIRM_CASH_RECOVERY = 'EMIT_CONFIRM_CASH_RECOVERY';
export const EMIT_CONFIRM_FLEET_RECOVERY = 'EMIT_CONFIRM_FLEET_RECOVERY';
export const EMIT_CASH_RECOVERIES_FETCH_BY_AGENT = 'EMIT_CASH_RECOVERIES_FETCH_BY_AGENT';
export const EMIT_FLEET_RECOVERIES_FETCH_BY_AGENT = 'EMIT_FLEET_RECOVERIES_FETCH_BY_AGENT';
export const EMIT_CASH_RECOVERIES_FETCH_BY_MANAGER = 'EMIT_CASH_RECOVERIES_FETCH_BY_MANAGER';
export const EMIT_FLEET_RECOVERIES_FETCH_BY_MANAGER = 'EMIT_FLEET_RECOVERIES_FETCH_BY_MANAGER';
export const EMIT_CASH_RECOVERIES_FETCH_BY_COLLECTOR = 'EMIT_CASH_RECOVERIES_FETCH_BY_COLLECTOR';
export const EMIT_FLEET_RECOVERIES_FETCH_BY_COLLECTOR = 'EMIT_FLEET_RECOVERIES_FETCH_BY_COLLECTOR';

//====================== Reducer trigger actions
// Set recoveries data in store
export const storeSetRecoveriesData = ({recoveries}) => ({
    recoveries,
    type: STORE_SET_RECOVERIES_DATA
});

// Set recovery data in store
export const storeSetRecoveryData = ({recovery}) => ({
    recovery,
    type: STORE_SET_RECOVERY_DATA
});

// Set recoveries action data in store
export const storeSetRecoveriesActionData = ({id}) => ({
    id,
    type: STORE_SET_RECOVERIES_ACTION_DATA
});
//====================== Middleware trigger actions
// Emit cash recoveries fetch by agent
export const emitCashRecoveriesFetchByAgent = ({id}) => ({
    id,
    type: EMIT_CASH_RECOVERIES_FETCH_BY_AGENT
});

// Emit cash recoveries fetch by collector
export const emitCashRecoveriesFetchByCollector = ({id}) => ({
    id,
    type: EMIT_CASH_RECOVERIES_FETCH_BY_COLLECTOR
});

// Emit cash recoveries fetch by manager
export const emitCashRecoveriesFetchByManager = () => ({
    type: EMIT_CASH_RECOVERIES_FETCH_BY_MANAGER
});

// Emit fleet recoveries fetch by agent
export const emitFleetRecoveriesFetchByAgent = ({id}) => ({
    id,
    type: EMIT_FLEET_RECOVERIES_FETCH_BY_AGENT
});

// Emit fleet recoveries fetch by collector
export const emitFleetRecoveriesFetchByCollector = ({id}) => ({
    id,
    type: EMIT_FLEET_RECOVERIES_FETCH_BY_COLLECTOR
});

// Emit fleet recoveries fetch by manager
export const emitFleetRecoveriesFetchByManager = () => ({
    type: EMIT_FLEET_RECOVERIES_FETCH_BY_MANAGER
});

// Emit confirm cash recovery
export const emitConfirmCashRecovery = ({id}) => ({
    id,
    type: EMIT_CONFIRM_CASH_RECOVERY
});

// Emit confirm fleet recovery
export const emitConfirmFleetRecovery = ({id}) => ({
    id,
    type: EMIT_CONFIRM_FLEET_RECOVERY
});

// Emit new cash recovery
export const emitNewCashRecovery = ({supply, amount, receipt}) => ({
    supply,
    amount,
    receipt,
    type: EMIT_NEW_CASH_RECOVERY
});

// Emit new fleet recovery
export const emitNewFleetRecovery = ({supply, amount, agentSim, managerSim}) => ({
    supply,
    amount,
    agentSim,
    managerSim,
    type: EMIT_NEW_FLEET_RECOVERY
});
