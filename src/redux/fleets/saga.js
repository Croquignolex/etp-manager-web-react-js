import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {storeRequestFailed, storeRequestInit, storeRequestSucceed} from "../requests/actions";
import {
    apiGetRequest,
    apiPostRequest,
    extractFleetData,
    extractFleetsData,
} from "../../helpers/functions";
import {
    storeSetFleetData,
    storeSetFleetsData,
    EMIT_NEW_FLEET_BY_AGENT,
    storeSetFleetActionData,
    EMIT_FLEET_FETCH_BY_AGENT,
    EMIT_UPDATE_FLEET_BY_AGENT,
    EMIT_FLEET_CANCEL_BY_AGENT,
    EMIT_FLEETS_FETCH_BY_AGENT,
    EMIT_NEW_FLEET_BY_COLLECTOR,
    EMIT_UPDATE_FLEET_BY_MANAGER,
    EMIT_FLEETS_FETCH_BY_MANAGER,
    EMIT_FLEET_FETCH_BY_COLLECTOR,
    EMIT_FLEETS_FETCH_BY_COLLECTOR,
    EMIT_FLEET_CANCEL_BY_COLLECTOR,
    EMIT_UPDATE_FLEET_BY_COLLECTOR,
    EMIT_FLEET_ADD_SUPPLY_BY_MANAGER,
} from './actions'
import {
    FLEET_SCOPE,
    FLEETS_SCOPE,
    FLEET_NEW_SCOPE,
    FLEET_EDIT_SCOPE,
    FLEET_ADD_SUPPLY_SCOPE,
    FLEETS_BY_AGENT_API_PATH,
    FLEETS_BY_MANAGER_API_PATH,
    FLEETS_BY_COLLECTOR_API_PATH,
    EDIT_FLEET_BY_AGENT_API_PATH,
    CANCEL_FLEET_BY_AGENT_API_PATH,
    CREATE_FLEET_BY_AGENT_API_PATH,
    EDIT_FLEET_BY_MANAGER_API_PATH,
    FLEETS_DETAILS_BY_AGENT_API_PATH,
    EDIT_FLEET_BY_COLLECTOR_API_PATH,
    CREATE_FLEET_BY_COLLECTOR_API_PATH,
    CANCEL_FLEET_BY_COLLECTOR_API_PATH,
    FLEETS_DETAILS_BY_COLLECTOR_API_PATH,
    FLEET_ADD_SUPPLY_BY_MANAGER_API_PATH,
} from "../../helpers/constants";

// Fetch fleets from API
export function* emitFleetsFetchByAgent() {
    yield takeLatest(EMIT_FLEETS_FETCH_BY_AGENT, function*() {
        const scope = FLEETS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, FLEETS_BY_AGENT_API_PATH);
            const fleets = extractFleetsData(apiResponse.demandes);
            // Fire event to redux
            yield put(storeSetFleetsData({fleets}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch fleets from API
export function* emitFleetsFetchByManager() {
    yield takeLatest(EMIT_FLEETS_FETCH_BY_MANAGER, function*() {
        const scope = FLEETS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, FLEETS_BY_MANAGER_API_PATH);
            const fleets = extractFleetsData(apiResponse.demandes);
            // Fire event to redux
            yield put(storeSetFleetsData({fleets}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));

        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch fleets by agent  from API
export function* emitFleetsFetchByCollector() {
    yield takeLatest(EMIT_FLEETS_FETCH_BY_COLLECTOR, function*() {
        const scope = FLEETS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, FLEETS_BY_COLLECTOR_API_PATH);
            const fleets = extractFleetsData(apiResponse.demandes);
            // Fire event to redux
            yield put(storeSetFleetsData({fleets}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch fleet from API
export function* emitFleetFetchByAgent() {
    yield takeLatest(EMIT_FLEET_FETCH_BY_AGENT, function*({id}) {
        const scope = FLEET_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${FLEETS_DETAILS_BY_AGENT_API_PATH}/${id}`);
            const fleet = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande,
                apiResponse.approvisionnements,
            );
            // Fire event to redux
            yield put(storeSetFleetData({fleet}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch fleet from API
export function* emitFleetFetchByCollector() {
    yield takeLatest(EMIT_FLEET_FETCH_BY_COLLECTOR, function*({id}) {
        const scope = FLEET_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${FLEETS_DETAILS_BY_COLLECTOR_API_PATH}/${id}`);
            const fleet = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande,
                apiResponse.approvisionnements,
            );
            // Fire event to redux
            yield put(storeSetFleetData({fleet}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New fleet into API
export function* emitNewFleetByAgent() {
    yield takeLatest(EMIT_NEW_FLEET_BY_AGENT, function*({amount, sim}) {
        const scope = FLEET_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            yield call(apiPostRequest, CREATE_FLEET_BY_AGENT_API_PATH, {id_puce: sim, montant: amount});
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de flotte éffectuée avec succès`
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

// New fleet by agent into API
export function* emitNewFleetByCollector() {
    yield takeLatest(EMIT_NEW_FLEET_BY_COLLECTOR, function*({amount, sim, agent}) {
        const scope = FLEET_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            yield call(apiPostRequest, CREATE_FLEET_BY_COLLECTOR_API_PATH, {
                id_puce: sim,
                id_agent: agent,
                montant: amount,
            });
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de flotte éffectuée avec succès`
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

// Update fleet into API
export function* emitUpdateFleetByAgent() {
    yield takeLatest(EMIT_UPDATE_FLEET_BY_AGENT, function*({id, sim, amount}) {
        const scope = FLEET_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_FLEET_BY_AGENT_API_PATH}/${id}`, {montant: amount, id_puce: sim});
            const fleet = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande,
                apiResponse.approvisionnements,
            );
            // Fire event at redux for fleet update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de flotte mise à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetFleetData({fleet}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update fleet into API
export function* emitUpdateFleetByManager() {
    yield takeLatest(EMIT_UPDATE_FLEET_BY_MANAGER, function*({id, reference}) {
        const scope = FLEET_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_FLEET_BY_MANAGER_API_PATH}/${id}`, {reference});
            const fleet = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande,
                apiResponse.approvisionnements,
            );
            // Fire event at redux for fleet update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de flotte mise à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetFleetData({fleet}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update fleet into API
export function* emitUpdateFleetByCollector() {
    yield takeLatest(EMIT_UPDATE_FLEET_BY_COLLECTOR, function*({id, sim, amount, agent}) {
        const scope = FLEET_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_FLEET_BY_COLLECTOR_API_PATH}/${id}`,
                {
                    montant: amount,
                    id_puce: sim,
                    id_agent: agent,
                });
            const fleet = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande,
                apiResponse.approvisionnements,
            );
            // Fire event at redux for fleet update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de flotte mise à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetFleetData({fleet}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Cancel fleet from API
export function* emitFleetCancelByAgent() {
    yield takeLatest(EMIT_FLEET_CANCEL_BY_AGENT, function*({id}) {
        const scope = FLEETS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetFleetActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${CANCEL_FLEET_BY_AGENT_API_PATH}/${id}`);
            const fleets = extractFleetsData(apiResponse.demandes);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de flotte annulée avec succès`
            }));
            yield put(storeSetFleetActionData({id}));
            // Fire event to redux
            yield put(storeSetFleetsData({fleets}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetFleetActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Cancel fleet from API
export function* emitFleetCancelByCollector() {
    yield takeLatest(EMIT_FLEET_CANCEL_BY_COLLECTOR, function*({id}) {
        const scope = FLEETS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetFleetActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${CANCEL_FLEET_BY_COLLECTOR_API_PATH}/${id}`);
            const fleets = extractFleetsData(apiResponse.demandes);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Demande de flotte annulée avec succès`
            }));
            yield put(storeSetFleetActionData({id}));
            // Fire event to redux
            yield put(storeSetFleetsData({fleets}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetFleetActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fleet add supply from API
export function* emitFleetAddSupplyByManager() {
    yield takeLatest(EMIT_FLEET_ADD_SUPPLY_BY_MANAGER, function*({id, amount, sim}) {
        const scope = FLEET_ADD_SUPPLY_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, FLEET_ADD_SUPPLY_BY_MANAGER_API_PATH,
                {
                    id_puce: sim,
                    montant: amount,
                    id_demande_flotte: id,
                });
            const fleet = extractFleetData(
                apiResponse.puce,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.demandeur,
                apiResponse.demande,
                apiResponse.approvisionnements,
            );
            // Fire event at redux for fleet update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Flottage éffectué avec succès`
            }));
            // Fire event to redux
            yield put(storeSetFleetData({fleet}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Combine to export all functions at once
export default function* sagaFleets() {
    yield all([
        fork(emitNewFleetByAgent),
        fork(emitFleetFetchByAgent),
        fork(emitFleetCancelByAgent),
        fork(emitUpdateFleetByAgent),
        fork(emitFleetsFetchByAgent),
        fork(emitNewFleetByCollector),
        fork(emitUpdateFleetByManager),
        fork(emitFleetsFetchByManager),
        fork(emitFleetFetchByCollector),
        fork(emitFleetsFetchByCollector),
        fork(emitUpdateFleetByCollector),
        fork(emitFleetCancelByCollector),
        fork(emitFleetAddSupplyByManager),
    ]);
}
