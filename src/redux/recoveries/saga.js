import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_RECOVERIES_FETCH,
    storeSetRecoveriesData,
    EMIT_NEXT_RECOVERIES_FETCH,
    storeSetNextRecoveriesData,
    storeStopInfiniteScrollRecoveryData
} from "./actions";
import {
    storeRecoveriesRequestInit,
    storeRecoveriesRequestFailed,
    storeRecoveriesRequestSucceed,
    storeNextRecoveriesRequestInit,
    storeNextRecoveriesRequestFailed,
    storeNextRecoveriesRequestSucceed,
} from "../requests/recoveries/actions";

// Fetch recoveries from API
export function* emitRecoveriesFetch() {
    yield takeLatest(EMIT_RECOVERIES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeRecoveriesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.CASH_RECOVERIES_API_PATH}?page=1`);
            // Extract data
            const recoveries = extractRecoveriesData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetRecoveriesData({recoveries, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeRecoveriesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeRecoveriesRequestFailed({message}));
        }
    });
}

// Fetch next recoveries from API
export function* emitNextRecoveriesFetch() {
    yield takeLatest(EMIT_NEXT_RECOVERIES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextRecoveriesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.CASH_RECOVERIES_API_PATH}?page=${page}`);
            // Extract data
            const recoveries = extractRecoveriesData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetNextRecoveriesData({recoveries, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextRecoveriesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextRecoveriesRequestFailed({message}));
            yield put(storeStopInfiniteScrollRecoveryData());
        }
    });
}

// Recovery add supply from API
/*
export function* emitRecoveryAddSupply() {
    yield takeLatest(EMIT_RECOVERY_ADD_SUPPLY, function*({id, amount, sim}) {
        try {
            // Fire event for request
            yield put(storeRecoverySupplyRequestInit());
            const data = {id_puce: sim, montant: amount, id_demande_flotte: id};
            const apiResponse = yield call(apiPostRequest, RECOVERY_ADD_SUPPLY_API_PATH, data);
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
function extractRecoveryData(apiRecovery, apiUser, apiAgent, apiCollector) {
    let recovery = {
        id: '', amount: '', creation: '', receipt: '',

        agent: {id: '', name: ''},
        collector: {id: '', name: ''},
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
    if(apiRecovery) {
        recovery.actionLoader = false;
        recovery.amount = apiRecovery.montant;
        recovery.id = apiRecovery.id.toString();
        recovery.creation = apiRecovery.created_at;
        recovery.receipt = getFileFromServer(apiRecovery.recu);
    }
    return recovery;
}

// Extract recoveries data
function extractRecoveriesData(apiRecoveries) {
    const recoveries = [];
    if(apiRecoveries) {
        apiRecoveries.forEach(data => {
            recoveries.push(extractRecoveryData(
                data.recouvrement,
                data.user,
                data.agent,
                data.recouvreur,
            ));
        });
    }
    return recoveries;
}

// Combine to export all functions at once
export default function* sagaRecoveries() {
    yield all([
        fork(emitRecoveriesFetch),
        fork(emitNextRecoveriesFetch),
    ]);
}