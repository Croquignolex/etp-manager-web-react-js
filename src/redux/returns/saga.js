import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_RETURNS_FETCH,
    storeSetReturnsData,
    EMIT_NEXT_RETURNS_FETCH,
    storeSetNextReturnsData,
    storeStopInfiniteScrollReturnData
} from "./actions";
import {
    storeReturnsRequestInit,
    storeReturnsRequestFailed,
    storeReturnsRequestSucceed,
    storeNextReturnsRequestInit,
    storeNextReturnsRequestFailed,
    storeNextReturnsRequestSucceed,
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

// Recovery add supply from API
/*
export function* emitRecoveryAddSupply() {
    yield takeLatest(EMIT_RETURN_ADD_SUPPLY, function*({id, amount, sim}) {
        try {
            // Fire event for request
            yield put(storeRecoverySupplyRequestInit());
            const data = {id_puce: sim, montant: amount, id_demande_flotte: id};
            const apiResponse = yield call(apiPostRequest, RETURN_ADD_SUPPLY_API_PATH, data);
            // Fire event to redux
            yield put(storeUpdateRecoveryData({id, amount}));
            // Fire event for request
            yield put(storeRecoverySupplyRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeRecoverySupplyRequestFailed({message}));
        }
    });
}
*/

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
        fork(emitReturnsFetch),
        fork(emitNextReturnsFetch),
    ]);
}