import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {getFileFromServer} from "../agents/saga";
import {extractSuppliesData} from "../supplies/saga";
import {storeSetInfoToastData} from "../toast/actions";
import {storeSetSuppliesData} from "../supplies/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {
    storeRequestInit,
    storeRequestFailed,
    storeRequestSucceed,
} from "../requests/actions";
import {
    EMIT_NEW_CASH_RECOVERY,
    storeSetRecoveriesData,
    EMIT_NEW_FLEET_RECOVERY,
    EMIT_CONFIRM_CASH_RECOVERY,
    EMIT_CONFIRM_FLEET_RECOVERY,
    storeSetRecoveriesActionData,
    EMIT_CASH_RECOVERIES_FETCH_BY_AGENT,
    EMIT_FLEET_RECOVERIES_FETCH_BY_AGENT,
    EMIT_CASH_RECOVERIES_FETCH_BY_MANAGER,
    EMIT_FLEET_RECOVERIES_FETCH_BY_MANAGER,
    EMIT_CASH_RECOVERIES_FETCH_BY_COLLECTOR,
    EMIT_FLEET_RECOVERIES_FETCH_BY_COLLECTOR
} from "./actions";
import {
    apiGetRequest,
    apiPostRequest,
    sortByCreationDate,
} from "../../helpers/functions";
import {
    CASH_RECOVERIES_SCOPE,
    FLEETS_RECOVERIES_SCOPE,
    CASH_RECOVERY_NEW_SCOPE,
    FLEETS_RECOVERY_NEW_SCOPE,
    NEW_CASH_RECOVERIES_API_PATH,
    NEW_FLEET_RECOVERIES_API_PATH,
    CONFIRM_CASH_RECOVERIES_API_PATH,
    CONFIRM_FLEET_RECOVERIES_API_PATH,
    CASH_RECOVERIES_BY_AGENT_API_PATH,
    FLEET_RECOVERIES_BY_AGENT_API_PATH,
    CASH_RECOVERIES_BY_MANAGER_API_PATH,
    FLEET_RECOVERIES_BY_MANAGER_API_PATH,
    CASH_RECOVERIES_BY_COLLECTOR_API_PATH,
    FLEET_RECOVERIES_BY_COLLECTOR_API_PATH,
} from "../../helpers/constants";

// Fetch cash recoveries by manager from API
export function* emitCashRecoveriesFetchByManager() {
    yield takeLatest(EMIT_CASH_RECOVERIES_FETCH_BY_MANAGER, function*() {
        const scope = CASH_RECOVERIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, CASH_RECOVERIES_BY_MANAGER_API_PATH);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch cash recoveries by agent from API
export function* emitCashRecoveriesFetchByAgent() {
    yield takeLatest(EMIT_CASH_RECOVERIES_FETCH_BY_AGENT, function*({id}) {
        const scope = CASH_RECOVERIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${CASH_RECOVERIES_BY_AGENT_API_PATH}/${id}`);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch cash recoveries by collector from API
export function* emitCashRecoveriesFetchByCollector() {
    yield takeLatest(EMIT_CASH_RECOVERIES_FETCH_BY_COLLECTOR, function*({id}) {
        const scope = CASH_RECOVERIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${CASH_RECOVERIES_BY_COLLECTOR_API_PATH}/${id}`);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch cash recoveries by manager from API
export function* emitFleetRecoveriesFetchByManager() {
    yield takeLatest(EMIT_FLEET_RECOVERIES_FETCH_BY_MANAGER, function*() {
        const scope = FLEETS_RECOVERIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, FLEET_RECOVERIES_BY_MANAGER_API_PATH);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch fleet recoveries by agent from API
export function* emitFleetRecoveriesFetchByAgent() {
    yield takeLatest(EMIT_FLEET_RECOVERIES_FETCH_BY_AGENT, function*({id}) {
        const scope = FLEETS_RECOVERIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${FLEET_RECOVERIES_BY_AGENT_API_PATH}/${id}`);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch fleet recoveries by collector from API
export function* emitFleetRecoveriesFetchByCollector() {
    yield takeLatest(EMIT_FLEET_RECOVERIES_FETCH_BY_COLLECTOR, function*({id}) {
        const scope = FLEETS_RECOVERIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${FLEET_RECOVERIES_BY_COLLECTOR_API_PATH}/${id}`);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Confirm recoveries
export function* emitConfirmCashRecovery() {
    yield takeLatest(EMIT_CONFIRM_CASH_RECOVERY, function*({id}) {
        const scope = CASH_RECOVERIES_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetRecoveriesActionData({id}));
            const apiResponse = yield call(apiPostRequest, `${CONFIRM_CASH_RECOVERIES_API_PATH}/${id}`);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            // Fire event at redux for sim delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Recouvrement en espèces confirmé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetRecoveriesActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Confirm recoveries
export function* emitConfirmFleetRecovery() {
    yield takeLatest(EMIT_CONFIRM_FLEET_RECOVERY, function*({id}) {
        const scope = FLEETS_RECOVERIES_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetRecoveriesActionData({id}));
            const apiResponse = yield call(apiPostRequest, `${CONFIRM_FLEET_RECOVERIES_API_PATH}/${id}`);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            // Fire event at redux for sim delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Retour flotte confirmé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetRecoveriesActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// // New cash recovery into API
export function* emitNewCashRecovery() {
    yield takeLatest(EMIT_NEW_CASH_RECOVERY, function*({supply, amount, receipt}) {
        const scope = CASH_RECOVERY_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('recu', receipt);
            data.append('montant', amount);
            data.append('id_flottage', supply);
            const apiResponse = yield call(apiPostRequest, NEW_CASH_RECOVERIES_API_PATH, data);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            const supplies = extractSuppliesData(apiResponse.flottages);
            // Fire event at redux for new agent toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Recouvrement en espèces éffectué avec succès`
            }));
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            yield put(storeSetSuppliesData({supplies}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// // New fleet recovery into API
export function* emitNewFleetRecovery() {
    yield takeLatest(EMIT_NEW_FLEET_RECOVERY, function*({supply, amount, agentSim, managerSim}) {
        const scope = FLEETS_RECOVERY_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('montant', amount);
            data.append('id_flottage', supply);
            data.append('puce_agent', agentSim);
            data.append('puce_flottage', managerSim);
            const apiResponse = yield call(apiPostRequest, NEW_FLEET_RECOVERIES_API_PATH, data);
            const recoveries = extractRecoveriesData(apiResponse.recouvrements);
            const supplies = extractSuppliesData(apiResponse.flottages);
            // Fire event at redux for new agent toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Retour flotte éffectué avec succès`
            }));
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries}));
            yield put(storeSetSuppliesData({supplies}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract recovery data
function extractRecoveryData(apiRecovery, apiFleet, apiTransaction, apiPayment, apiUser, apiAgent, apiCollector, apiSimOutgoing, apiSimIncoming) {
    let recovery = {
        id: '', reference: '', amount: '', creation: '', type: '',
        receipt: '', status: '',

        collector: {id: '', name: ''},
        fleet: {id: '', name: '', reference: ''},
        agent: {id: '', name: '', reference: ''},
        payment: {id: '', name: '', reference: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
        transaction: {id: '', name: '', reference: ''},
    };
    if(apiAgent && apiUser) {
        recovery.agent = {
            name: apiUser.name,
            id: apiAgent.id.toString(),
            reference: apiAgent.reference,
        };
    }
    if(apiCollector) {
        recovery.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString(),
        };
    }
    if(apiFleet) {
        recovery.fleet = {
            name: apiFleet.name,
            id: apiFleet.id.toString(),
            reference: apiFleet.reference
        };
    }
    if(apiTransaction) {
        recovery.transaction = {
            name: apiTransaction.name,
            id: apiTransaction.id.toString(),
            reference: apiTransaction.reference
        };
    }
    if(apiPayment) {
        recovery.payment = {
            name: apiPayment.name,
            id: apiPayment.id.toString(),
            reference: apiPayment.reference
        };
    }
    if(apiSimOutgoing) {
        recovery.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        recovery.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiRecovery) {
        recovery.actionLoader = false;
        recovery.status = apiRecovery.statut;
        recovery.amount = apiRecovery.montant;
        recovery.id = apiRecovery.id.toString();
        recovery.creation = apiRecovery.created_at;
        recovery.reference = apiRecovery.reference;
        recovery.type = apiRecovery.type_transaction;
        recovery.receipt = getFileFromServer(apiRecovery.recu);
    }
    return recovery;
}

// Extract recoveries data
function extractRecoveriesData(apiRecoveries) {
    const recoveries = [];
    apiRecoveries.forEach(data => {
        recoveries.push(extractRecoveryData(
            data.recouvrement,
            data.flottage,
            data.transaction,
            data.versement,
            data.user,
            data.agent,
            data.recouvreur,
            data.puce_agent,
            data.puce_flottage,
        ));
    });
    sortByCreationDate(recoveries);
    return recoveries;
}

// Combine to export all functions at once
export default function* sagaRecoveries() {
    yield all([
        fork(emitNewCashRecovery),
        fork(emitNewFleetRecovery),
        fork(emitConfirmCashRecovery),
        fork(emitConfirmFleetRecovery),
        fork(emitCashRecoveriesFetchByAgent),
        fork(emitFleetRecoveriesFetchByAgent),
        fork(emitCashRecoveriesFetchByManager),
        fork(emitFleetRecoveriesFetchByManager),
        fork(emitCashRecoveriesFetchByCollector),
        fork(emitFleetRecoveriesFetchByCollector),
    ]);
}
