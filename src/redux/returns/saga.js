import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {storeUpdateSupplyData} from "../supplies/actions";
import {apiGetRequest, apiPostRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_NEW_RETURN,
    EMIT_RETURNS_FETCH,
    EMIT_CONFIRM_RETURN,
    storeSetReturnsData,
    EMIT_NEXT_RETURNS_FETCH,
    storeUpdateReturnData,
    EMIT_SUPPLY_RETURNS_FETCH,
    storeSetNextReturnsData,
    storeSetReturnActionData,
    storeStopInfiniteScrollReturnData
} from "./actions";
import {
    storeReturnRequestInit,
    storeReturnsRequestInit,
    storeReturnRequestFailed,
    storeReturnsRequestFailed,
    storeReturnRequestSucceed,
    storeReturnsRequestSucceed,
    storeNextReturnsRequestInit,
    storeNextReturnsRequestFailed,
    storeConfirmReturnRequestInit,
    storeNextReturnsRequestSucceed,
    storeConfirmReturnRequestFailed,
    storeConfirmReturnRequestSucceed,
} from "../requests/returns/actions";

// Fetch returns from API
export function* emitReturnsFetch() {
    yield takeLatest(EMIT_RETURNS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeReturnsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEET_RECOVERIES_API_PATH}?page=1`);
            // Extract data
            const returns = extractReturnsData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetReturnsData({returns, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeReturnsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReturnsRequestFailed({message}));
        }
    });
}

// Fetch next returns from API
export function* emitNextReturnsFetch() {
    yield takeLatest(EMIT_NEXT_RETURNS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextReturnsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEET_RECOVERIES_API_PATH}?page=${page}`);
            // Extract data
            const returns = extractReturnsData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetNextReturnsData({returns, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextReturnsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextReturnsRequestFailed({message}));
            yield put(storeStopInfiniteScrollReturnData());
        }
    });
}

// Confirm return from API
export function* emitConfirmReturn() {
    yield takeLatest(EMIT_CONFIRM_RETURN, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetReturnActionData({id}));
            // Fire event for request
            yield put(storeConfirmReturnRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CONFIRM_FLEET_RECOVERIES_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeUpdateReturnData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetReturnActionData({id}));
            // Fire event for request
            yield put(storeConfirmReturnRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetReturnActionData({id}));
            yield put(storeConfirmReturnRequestFailed({message}));
        }
    });
}

// New return from API
export function* emitNewReturn() {
    yield takeLatest(EMIT_NEW_RETURN, function*({supply, amount, agentSim, managerSim}) {
        try {
            // Fire event for request
            yield put(storeReturnRequestInit());
            const data = {id_flottage: supply, montant: amount, puce_agent: agentSim, puce_flottage: managerSim};
            const apiResponse = yield call(apiPostRequest, api.NEW_FLEET_RECOVERIES_API_PATH, data);
            // Fire event to redux
            yield put(storeUpdateSupplyData({id: supply, amount}));
            // Fire event for request
            yield put(storeReturnRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReturnRequestFailed({message}));
        }
    });
}

// Fetch supply returns from API
export function* emitSupplyReturnsFetch() {
    yield takeLatest(EMIT_SUPPLY_RETURNS_FETCH, function*({id}) {
        try {
            // Fire event for request
            yield put(storeReturnsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SUPPLY_FLEET_RECOVERIES_API_PATH}/${id}`);
            // Extract data
            const returns = extractReturnsData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetReturnsData({returns, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeReturnsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReturnsRequestFailed({message}));
        }
    });
}

// Extract recovery data
function extractRecoveryData(apiRecovery, apiUser, apiAgent, apiCollector, apiSimOutgoing, apiSimIncoming) {
    let recovery = {
        id: '', amount: '', creation: '', receipt: '', status: '',

        agent: {id: '', name: ''},
        collector: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiAgent && apiUser) {
        recovery.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiCollector) {
        recovery.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString(),
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
        recovery.receipt = getFileFromServer(apiRecovery.recu);
    }
    return recovery;
}

// Extract returns data
function extractReturnsData(apiReturns) {
    const returns = [];
    if(apiReturns) {
        apiReturns.forEach(data => {
            returns.push(extractRecoveryData(
                data.recouvrement,
                data.user,
                data.agent,
                data.recouvreur,
                data.puce_agent,
                data.puce_flottage,
            ));
        });
    }
    return returns;
}

// Combine to export all functions at once
export default function* sagaReturns() {
    yield all([
        fork(emitNewReturn),
        fork(emitReturnsFetch),
        fork(emitConfirmReturn),
        fork(emitNextReturnsFetch),
        fork(emitSupplyReturnsFetch),
    ]);
}