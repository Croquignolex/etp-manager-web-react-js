import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {storeRequestFailed, storeRequestInit, storeRequestSucceed} from "../requests/actions";
import {
    apiGetRequest,
    apiPostRequest,
    extractFleetData,
    extractFleetsData
} from "../../helpers/functions";
import {
    storeSetClearanceData,
    storeSetClearancesData,
    storeSetClearanceActionData,
    EMIT_NEW_CLEARANCE_BY_AGENT,
    EMIT_CLEARANCE_FETCH_BY_AGENT,
    EMIT_UPDATE_CLEARANCE_BY_AGENT,
    EMIT_CLEARANCE_CANCEL_BY_AGENT,
    EMIT_CLEARANCES_FETCH_BY_AGENT,
    EMIT_NEW_CLEARANCE_BY_COLLECTOR,
    EMIT_CLEARANCE_FETCH_BY_COLLECTOR,
    EMIT_CLEARANCES_FETCH_BY_COLLECTOR,
    EMIT_CLEARANCE_CANCEL_BY_COLLECTOR,
    EMIT_UPDATE_CLEARANCE_BY_COLLECTOR,
    EMIT_CLEARANCE_PROCEED_BY_COLLECTOR,
} from './actions'
import {
    CLEARANCE_SCOPE,
    FLEET_EDIT_SCOPE,
    CLEARANCES_SCOPE,
    CLEARANCE_NEW_SCOPE,
    CLEARANCE_PROCEED_SCOPE,
    CLEARANCES_BY_AGENT_API_PATH,
    CLEARANCES_BY_COLLECTOR_API_PATH,
    EDIT_CLEARANCE_BY_AGENT_API_PATH,
    CANCEL_CLEARANCE_BY_AGENT_API_PATH,
    CREATE_CLEARANCE_BY_AGENT_API_PATH,
    CLEARANCES_DETAILS_BY_AGENT_API_PATH,
    EDIT_CLEARANCE_BY_COLLECTOR_API_PATH,
    CANCEL_CLEARANCE_BY_COLLECTOR_API_PATH,
    CREATE_CLEARANCE_BY_COLLECTOR_API_PATH,
    PROCEED_CLEARANCE_BY_COLLECTOR_API_PATH,
    CLEARANCES_DETAILS_BY_COLLECTOR_API_PATH,
} from "../../helpers/constants";

// Fetch clearances from API
export function* emitClearancesFetchByAgent() {
    yield takeLatest(EMIT_CLEARANCES_FETCH_BY_AGENT, function*() {
        const scope = CLEARANCES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, CLEARANCES_BY_AGENT_API_PATH);
            const clearances = extractFleetsData(apiResponse.demandes);
            // Fire event to redux
            yield put(storeSetClearancesData({clearances}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch clearances by agent  from API
export function* emitClearancesFetchByCollector() {
    yield takeLatest(EMIT_CLEARANCES_FETCH_BY_COLLECTOR, function*() {
        const scope = CLEARANCES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, CLEARANCES_BY_COLLECTOR_API_PATH);
            const clearances = extractFleetsData(apiResponse.demandes);
            // Fire event to redux
            yield put(storeSetClearancesData({clearances}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch clearance from API
export function* emitClearanceFetchByAgent() {
    yield takeLatest(EMIT_CLEARANCE_FETCH_BY_AGENT, function*({id}) {
        const scope = CLEARANCE_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${CLEARANCES_DETAILS_BY_AGENT_API_PATH}/${id}`);
            const clearance = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande
            );
            // Fire event to redux
            yield put(storeSetClearanceData({clearance}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch clearance from API
export function* emitClearanceFetchByCollector() {
    yield takeLatest(EMIT_CLEARANCE_FETCH_BY_COLLECTOR, function*({id}) {
        const scope = CLEARANCE_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${CLEARANCES_DETAILS_BY_COLLECTOR_API_PATH}/${id}`);
            const clearance = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande
            );
            // Fire event to redux
            yield put(storeSetClearanceData({clearance}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New clearance into API
export function* emitNewClearanceByAgent() {
    yield takeLatest(EMIT_NEW_CLEARANCE_BY_AGENT, function*({amount, sim}) {
        const scope = CLEARANCE_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            yield call(apiPostRequest, CREATE_CLEARANCE_BY_AGENT_API_PATH, {id_puce: sim, montant: amount});
            // Fire event at redux for new clearance toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de déstockage éffectuée avec succès`
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

// New clearance by agent into API
export function* emitNewClearanceByCollector() {
    yield takeLatest(EMIT_NEW_CLEARANCE_BY_COLLECTOR, function*({amount, sim, agent}) {
        const scope = CLEARANCE_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            yield call(apiPostRequest, CREATE_CLEARANCE_BY_COLLECTOR_API_PATH, {
                id_puce: sim,
                id_agent: agent,
                montant: amount,
            });
            // Fire event at redux for new clearance toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de déstockage éffectuée avec succès`
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

// Update clearance into API
export function* emitUpdateClearanceByAgent() {
    yield takeLatest(EMIT_UPDATE_CLEARANCE_BY_AGENT, function*({id, sim, amount}) {
        const scope = FLEET_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_CLEARANCE_BY_AGENT_API_PATH}/${id}`, {montant: amount, id_puce: sim});
            const clearance = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande
            );
            // Fire event at redux for clearance update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de déstockage mise à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetClearanceData({clearance}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update clearance into API
export function* emitUpdateClearanceByCollector() {
    yield takeLatest(EMIT_UPDATE_CLEARANCE_BY_COLLECTOR, function*({id, sim, amount, agent}) {
        const scope = FLEET_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_CLEARANCE_BY_COLLECTOR_API_PATH}/${id}`,
                {
                    montant: amount,
                    id_puce: sim,
                    id_agent: agent,
                });
            const clearance = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande
            );
            // Fire event at redux for clearance update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de déstockage mise à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetClearanceData({clearance}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Cancel clearance from API
export function* emitClearanceCancelByAgent() {
    yield takeLatest(EMIT_CLEARANCE_CANCEL_BY_AGENT, function*({id}) {
        const scope = CLEARANCES_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetClearanceActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${CANCEL_CLEARANCE_BY_AGENT_API_PATH}/${id}`);
            const clearances = extractFleetsData(apiResponse.demandes);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de déstockage annulée avec succès`
            }));
            yield put(storeSetClearanceActionData({id}));
            // Fire event to redux
            yield put(storeSetClearancesData({clearances}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetClearanceActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Cancel clearance from API
export function* emitClearanceCancelByCollector() {
    yield takeLatest(EMIT_CLEARANCE_CANCEL_BY_COLLECTOR, function*({id}) {
        const scope = CLEARANCES_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetClearanceActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${CANCEL_CLEARANCE_BY_COLLECTOR_API_PATH}/${id}`);
            const clearances = extractFleetsData(apiResponse.demandes);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de déstockage annulée avec succès`
            }));
            yield put(storeSetClearanceActionData({id}));
            // Fire event to redux
            yield put(storeSetClearancesData({clearances}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetClearanceActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Proceed clearance from API
export function* emitClearanceProceedByCollector() {
    yield takeLatest(EMIT_CLEARANCE_PROCEED_BY_COLLECTOR, function*({id, amount}) {
        const scope = CLEARANCE_PROCEED_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            // Fire event at redux to toggle action loader
            yield put(storeSetClearanceActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${PROCEED_CLEARANCE_BY_COLLECTOR_API_PATH}/${id}`,
                {
                    montant: amount,
                });
            const clearances = extractFleetsData(apiResponse.demandes);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Réservation sur cette demande éffectué avec succès`
            }));
            yield put(storeSetClearanceActionData({id}));
            // Fire event to redux
            yield put(storeSetClearancesData({clearances}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetClearanceActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Combine to export all functions at once
export default function* sagaClearances() {
    yield all([
        fork(emitNewClearanceByAgent),
        fork(emitClearanceFetchByAgent),
        fork(emitClearancesFetchByAgent),
        fork(emitUpdateClearanceByAgent),
        fork(emitClearanceCancelByAgent),
        fork(emitNewClearanceByCollector),
        fork(emitClearanceFetchByCollector),
        fork(emitClearancesFetchByCollector),
        fork(emitUpdateClearanceByCollector),
        fork(emitClearanceCancelByCollector),
        fork(emitClearanceProceedByCollector),
    ]);
}