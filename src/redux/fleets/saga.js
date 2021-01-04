import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {
    EMIT_FLEETS_FETCH,
    storeSetFleetsData,
    EMIT_NEXT_FLEETS_FETCH,
    storeSetNextFleetsData,
    storeStopInfiniteScrollFleetData
} from "./actions";
import {
    storeFleetsRequestInit,
    storeFleetsRequestFailed,
    storeFleetsRequestSucceed,
    storeNextFleetsRequestInit,
    storeNextFleetsRequestFailed,
    storeNextFleetsRequestSucceed
} from "../requests/fleets/actions";

// Fetch fleets from API
export function* emitFleetsFetch() {
    yield takeLatest(EMIT_FLEETS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeFleetsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEETS_API_PATH}?page=1`);
            // Extract data
            const fleets = extractFleetsData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetFleetsData({fleets, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeFleetsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeFleetsRequestFailed({message}));
        }
    });
}

// Fetch next fleets from API
export function* emitNextFleetsFetch() {
    yield takeLatest(EMIT_NEXT_FLEETS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextFleetsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEETS_API_PATH}?page=${page}`);
            // Extract data
            const fleets = extractFleetsData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetNextFleetsData({fleets, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextFleetsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextFleetsRequestFailed({message}));
            yield put(storeStopInfiniteScrollFleetData());
        }
    });
}

// Extract fleet data
function extractFleetData(apiSim, apiUser, apiAgent, apiClaimer, apiFleet, apiSupplies) {
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

// Extract fleets data
function extractFleetsData(apiFleets) {
    const fleets = [];
    if(apiFleets) {
        apiFleets.forEach(data => {
            fleets.push(extractFleetData(
                data.puce,
                data.user,
                data.agent,
                data.demandeur,
                data.demande
            ));
        });
    }
    return fleets;
}

// Combine to export all functions at once
export default function* sagaFleets() {
    yield all([
        fork(emitFleetsFetch),
        fork(emitNextFleetsFetch),
    ]);
}