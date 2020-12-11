import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {apiGetRequest, apiPostRequest, sortByCreationDate} from "../../helpers/functions";
import {storeRequestFailed, storeRequestInit, storeRequestSucceed} from "../requests/actions";
import {
    TRANSFERS_SCOPE,
    TRANSFER_NEW_SCOPE,
    TRANSFERS_API_PATH,
    NEW_TRANSFER_BY_MANAGER_API_PATH,
    NEW_TRANSFER_BY_COLLECTOR_API_PATH,
    NEW_TRANSFER_BY_SUPERVISOR_FOR_MANAGER_API_PATH,
    NEW_TRANSFER_BY_SUPERVISOR_FOR_COLLECTOR_API_PATH
} from "../../helpers/constants";
import {
    EMIT_TRANSFERS_FETCH,
    storeSetTransfersData,
    EMIT_NEW_TRANSFER_BY_MANAGER,
    EMIT_NEW_TRANSFER_BY_COLLECTOR,
    EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_MANAGER,
    EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_COLLECTOR
} from "./actions";

// Fetch transfers from API
export function* emitTransfersFetch() {
    yield takeLatest(EMIT_TRANSFERS_FETCH, function*() {
        const scope = TRANSFERS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, TRANSFERS_API_PATH);
            const transfers = extractTransfersData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetTransfersData({transfers}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fleets new transfer by supervisor from API
export function* emitNewTransferBySupervisorForManager() {
    yield takeLatest(EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_MANAGER, function*({amount, supervisorSim, managerSim}) {
        const scope = TRANSFER_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, NEW_TRANSFER_BY_SUPERVISOR_FOR_MANAGER_API_PATH,
                {
                    montant: amount,
                    id_puce_to: managerSim,
                    id_puce_from: supervisorSim,
                });
            const transfers = extractTransfersData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetTransfersData({transfers}));
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Transfert de flotte éffectué avec succès`
            }));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fleets new transfer by supervisor from API
export function* emitNewTransferBySupervisorForCollector() {
    yield takeLatest(EMIT_NEW_TRANSFER_BY_SUPERVISOR_FOR_COLLECTOR, function*({amount, supervisorSim, collectorSim}) {
        const scope = TRANSFER_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, NEW_TRANSFER_BY_SUPERVISOR_FOR_COLLECTOR_API_PATH,
                {
                    montant: amount,
                    id_puce_to: collectorSim,
                    id_puce_from: supervisorSim,
                });
            const transfers = extractTransfersData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetTransfersData({transfers}));
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Transfert de flotte éffectué avec succès`
            }));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fleets new transfer by manager from API
export function* emitNewTransferManager() {
    yield takeLatest(EMIT_NEW_TRANSFER_BY_MANAGER, function*({amount, collectorSim, managerSim}) {
        const scope = TRANSFER_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, NEW_TRANSFER_BY_MANAGER_API_PATH,
                {
                    montant: amount,
                    id_puce_to: collectorSim,
                    id_puce_from: managerSim,
                });
            const transfers = extractTransfersData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetTransfersData({transfers}));
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Transfert de flotte éffectué avec succès`
            }));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fleets new transfer by collector from API
export function* emitNewTransferCollector() {
    yield takeLatest(EMIT_NEW_TRANSFER_BY_COLLECTOR, function*({amount, managerOrSupervisorSim, collectorSim}) {
        const scope = TRANSFER_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, NEW_TRANSFER_BY_COLLECTOR_API_PATH,
                {
                    montant: amount,
                    id_puce_to: managerOrSupervisorSim,
                    id_puce_from: collectorSim,
                });
            const transfers = extractTransfersData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetTransfersData({transfers}));
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Transfert de flotte éffectué avec succès`
            }));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract transfer data
function extractTransferData(apiSimOutgoing, apiSimIncoming, apiSupervisor, apiTransfer) {
    let transfer = {
        id: '', reference: '', amount: '', creation: '',
        note: '', remaining: '', status: '',

        supervisor: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiSimOutgoing) {
        transfer.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        transfer.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiSupervisor) {
        transfer.supervisor = {
            name: apiSupervisor.name,
            id: apiSupervisor.id.toString()
        };
    }
    if(apiTransfer) {
        transfer.actionLoader = false;
        transfer.note = apiTransfer.note;
        transfer.status = apiTransfer.statut;
        transfer.amount = apiTransfer.montant;
        transfer.remaining = apiTransfer.reste;
        transfer.id = apiTransfer.id.toString();
        transfer.creation = apiTransfer.created_at;
        transfer.reference = apiTransfer.reference;
    }
    return transfer;
}

// Extract transfers data
export function extractTransfersData(apiTransfers) {
    const transfers = [];
    apiTransfers.forEach(data => {
        transfers.push(extractTransferData(
            data.puce_emetrice,
            data.puce_receptrice,
            data.superviseur,
            data.flottage,
        ));
    });
    sortByCreationDate(transfers);
    return transfers;
}

// Combine to export all functions at once
export default function* sagaTransfers() {
    yield all([
        fork(emitTransfersFetch),
        fork(emitNewTransferManager),
        fork(emitNewTransferCollector),
        fork(emitNewTransferBySupervisorForManager),
        fork(emitNewTransferBySupervisorForCollector),
    ]);
}
