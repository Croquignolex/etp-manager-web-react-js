import Lodash from "lodash";
import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_FLEETS_FETCH,
    storeSetFleetsData,
    storeUpdateFleetData,
    EMIT_ALL_FLEETS_FETCH,
    EMIT_FLEET_ADD_SUPPLY,
    EMIT_NEXT_FLEETS_FETCH,
    storeSetNextFleetsData,
    EMIT_GROUP_FLEETS_FETCH,
    storeSetGroupFleetsData,
    EMIT_GROUP_FLEET_ADD_SUPPLY,
    storeStopInfiniteScrollFleetData
} from "./actions";
import {
    storeFleetsRequestInit,
    storeFleetsRequestFailed,
    storeFleetsRequestSucceed,
    storeAllFleetsRequestInit,
    storeNextFleetsRequestInit,
    storeFleetSupplyRequestInit,
    storeAllFleetsRequestFailed,
    storeNextFleetsRequestFailed,
    storeAllFleetsRequestSucceed,
    storeFleetSupplyRequestFailed,
    storeNextFleetsRequestSucceed,
    storeFleetSupplyRequestSucceed
} from "../requests/fleets/actions";

// Fetch fleets from API
export function* emitFleetsFetch() {
    yield takeLatest(EMIT_FLEETS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeFleetsRequestInit());
            yield put(storeSetFleetsData({fleets: [], hasMoreData: false, page: 0}));
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

// Fetch group fleets from API
export function* emitGroupFleetsFetch() {
    yield takeLatest(EMIT_GROUP_FLEETS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeFleetsRequestInit());
            yield put(storeSetFleetsData({fleets: [], hasMoreData: false, page: 0}));
            const apiResponse = yield call(apiGetRequest, api.GROUP_FLEETS_API_PATH);
            // Extract data
            const fleets = extractFleetsData(apiResponse.data.demandes);
            const groupedFleet = Object.values(Lodash.groupBy(fleets, fleet => [fleet.agent.id, fleet.operator.id]));
            // Fire event to redux
            yield put(storeSetGroupFleetsData({fleets: groupedFleet}));
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

// Fetch all fleets from API
export function* emitAllFleetsFetch() {
    yield takeLatest(EMIT_ALL_FLEETS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllFleetsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_FLEETS_API_PATH);
            // Extract data
            const fleets = extractFleetsData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetFleetsData({fleets, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllFleetsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllFleetsRequestFailed({message}));
        }
    });
}

// Fleet add supply from API
export function* emitFleetAddSupply() {
    yield takeLatest(EMIT_FLEET_ADD_SUPPLY, function*({id, amount, sim}) {
        try {
            // Fire event for request
            yield put(storeFleetSupplyRequestInit());
            const data = {id_puce: sim, montant: amount, id_demande_flotte: id};
            const apiResponse = yield call(apiPostRequest, api.FLEET_ADD_SUPPLY_API_PATH, data);
            // Fire event to redux
            yield put(storeUpdateFleetData({id, amount}));
            // Fire event for request
            yield put(storeFleetSupplyRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeFleetSupplyRequestFailed({message}));
        }
    });
}

// Fleet add group supply from API
export function* emitGroupFleetAddSupply() {
    yield takeLatest(EMIT_GROUP_FLEET_ADD_SUPPLY, function*({ids, amount, sim}) {
        try {
            // Fire event for request
            yield put(storeFleetSupplyRequestInit());
            const data = {id_puce: sim, montant: amount, ids_demande_flotte: ids};
            const apiResponse = yield call(apiPostRequest, api.GROUP_FLEET_ADD_SUPPLY_API_PATH, data);
            const apiResponse2 = yield call(apiGetRequest, api.GROUP_FLEETS_API_PATH);
            // Extract data
            const fleets = extractFleetsData(apiResponse2.data.demandes);
            const groupedFleet = Object.values(Lodash.groupBy(fleets, fleet => [fleet.agent.id, fleet.operator.id]));
            // Fire event to redux
            yield put(storeSetGroupFleetsData({fleets: groupedFleet}));
            // Fire event for request
            yield put(storeFleetSupplyRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeFleetSupplyRequestFailed({message}));
        }
    });
}

// Extract fleet data
function extractFleetData(apiSim, apiUser, apiAgent, apiClaimer, apiFleet, apiOperator) {
    let fleet = {
        id: '', amount: '', status: '', creation: '',

        agent: {id: '', name: ''},
        operator: {id: '', name: ''},
        sim: {id: '', name: '', number: ''},
        claimant: {id: '', name: '', phone: ''},
    };

    if(apiAgent && apiUser) {
        fleet.agent = {
            name: apiUser.name,
            id: apiUser.id.toString(),
            reference: apiAgent.reference
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
    if(apiOperator) {
        fleet.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString(),
        }
    }
    if(apiFleet) {
        fleet.actionLoader = false;
        fleet.status = apiFleet.statut;
        fleet.amount = apiFleet.montant;
        fleet.remaining = apiFleet.reste;
        fleet.id = apiFleet.id.toString();
        fleet.creation = apiFleet.created_at;
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
                data.demande,
                data.operateur,
            ));
        });
    }
    return fleets;
}

// Combine to export all functions at once
export default function* sagaFleets() {
    yield all([
        fork(emitFleetsFetch),
        fork(emitAllFleetsFetch),
        fork(emitFleetAddSupply),
        fork(emitNextFleetsFetch),
        fork(emitGroupFleetsFetch),
        fork(emitGroupFleetAddSupply),
    ]);
}
