import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {storeStopInfiniteScrollFleetData} from "../fleets/actions";
import {
    EMIT_CLEARANCES_FETCH,
    storeSetClearancesData,
    EMIT_ALL_CLEARANCES_FETCH,
    storeSetNextClearancesData,
    EMIT_NEXT_CLEARANCES_FETCH
} from "./actions";
import {
    storeClearancesRequestInit,
    storeClearancesRequestFailed,
    storeClearancesRequestSucceed,
    storeAllClearancesRequestInit,
    storeNextClearancesRequestInit,
    storeAllClearancesRequestFailed,
    storeNextClearancesRequestFailed,
    storeAllClearancesRequestSucceed,
    storeNextClearancesRequestSucceed
} from "../requests/clearances/actions";

// Fetch clearances from API
export function* emitClearancesFetch() {
    yield takeLatest(EMIT_CLEARANCES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeClearancesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.CLEARANCES_API_PATH}?page=1`);
            // Extract data
            const clearances = extractClearancesData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetClearancesData({clearances, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeClearancesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeClearancesRequestFailed({message}));
        }
    });
}

// Fetch next clearances from API
export function* emitNextClearancesFetch() {
    yield takeLatest(EMIT_NEXT_CLEARANCES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextClearancesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.CLEARANCES_API_PATH}?page=${page}`);
            // Extract data
            const clearances = extractClearancesData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetNextClearancesData({clearances, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextClearancesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextClearancesRequestFailed({message}));
            yield put(storeStopInfiniteScrollFleetData());
        }
    });
}

// Fetch all clearances from API
export function* emitAllClearancesFetch() {
    yield takeLatest(EMIT_ALL_CLEARANCES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllClearancesRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_CLEARANCES_API_PATH);
            // Extract data
            const clearances = extractClearancesData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetClearancesData({clearances, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllClearancesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllClearancesRequestFailed({message}));
        }
    });
}

// Extract clearance data
function extractClearanceData(apiSim, apiUser, apiAgent, apiClaimer, apiFleet, apiSupplies) {
    let fleet = {
        id: '', reference: '', amount: '', status: '', creation: '',

        sim: {id: '', name: '', number: ''},
        claimant: {id: '', name: '', phone: ''},
        agent: {id: '', name: '', reference: ''},

        supplies: []
    };

    if(apiAgent && apiUser) {
        fleet.agent = {
            name: apiUser.name,
            id: apiAgent.id.toString(),
            reference: apiAgent.reference,
        };
    }
    if(apiSim) {
        fleet.sim = {
            name: apiSim.nom,
            number: apiSim.numero,
            id: apiSim.id.toString()
        };
    }
    if(apiClaimer) {
        fleet.claimant = {
            name: apiClaimer.name,
            phone: apiClaimer.phone,
            id: apiClaimer.id.toString(),
        }
    }
    if(apiFleet) {
        fleet.actionLoader = false;
        fleet.status = apiFleet.statut;
        fleet.amount = apiFleet.montant;
        fleet.remaining = apiFleet.reste;
        fleet.id = apiFleet.id.toString();
        fleet.creation = apiFleet.created_at;
        fleet.reference = apiFleet.reference;
    }
    if(apiSupplies) {
        apiSupplies.forEach(data => {
            fleet.supplies.push({
                amount: data.montant,
                id: data.id.toString(),
                reference: data.reference,
                creation: data.created_at,
            })
        });
    }
    return fleet;
}

// Extract clearances data
function extractClearancesData(apiClearances) {
    const clearances = [];
    if(apiClearances) {
        apiClearances.forEach(data => {
            clearances.push(extractClearanceData(
                data.puce,
                data.user,
                data.agent,
                data.demandeur,
                data.demande
            ));
        });
    }
    return clearances;
}

// Combine to export all functions at once
export default function* sagaClearances() {
    yield all([
        fork(emitClearancesFetch),
        fork(emitAllClearancesFetch),
        fork(emitNextClearancesFetch),
    ]);
}