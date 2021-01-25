import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_SUPPLY,
    EMIT_SUPPLIES_FETCH,
    storeSetSuppliesData,
    storeSetNewSupplyData,
    storeSetNextSuppliesData,
    EMIT_NEXT_SUPPLIES_FETCH,
    storeStopInfiniteScrollSupplyData
} from "./actions";
import {
    storeSuppliesRequestInit,
    storeSuppliesRequestFailed,
    storeAddSupplyRequestInit,
    storeSuppliesRequestSucceed,
    storeAddSupplyRequestFailed,
    storeNextSuppliesRequestInit,
    storeAddSupplyRequestSucceed,
    storeNextSuppliesRequestFailed,
    storeNextSuppliesRequestSucceed
} from "../requests/supplies/actions";

// Fetch supplies from API
export function* emitSuppliesFetch() {
    yield takeLatest(EMIT_SUPPLIES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeSuppliesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SUPPLIES_API_PATH}?page=1`);
            // Extract data
            const supplies = extractSuppliesData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeSuppliesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSuppliesRequestFailed({message}));
        }
    });
}

// Fetch next supplies from API
export function* emitNextSuppliesFetch() {
    yield takeLatest(EMIT_NEXT_SUPPLIES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextSuppliesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SUPPLIES_API_PATH}?page=${page}`);
            // Extract data
            const supplies = extractSuppliesData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetNextSuppliesData({supplies, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextSuppliesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextSuppliesRequestFailed({message}));
            yield put(storeStopInfiniteScrollSupplyData());
        }
    });
}

// Fleets new supply from API
export function* emitAddSupply() {
    yield takeLatest(EMIT_ADD_SUPPLY, function*({amount, managerSim, collectorSim}) {
        try {
            // Fire event for request
            yield put(storeAddSupplyRequestInit());
            const data = {montant: amount, id_puce_to: collectorSim, id_puce_from: managerSim};
            const apiResponse = yield call(apiPostRequest, api.NEW_SUPPLY_API_PATH, data);
            // Extract data
            const supply = extractSupplyData(
                apiResponse.data.puce_emetrice,
                apiResponse.data.puce_receptrice,
                apiResponse.data.utilisateur,
                apiResponse.data.flottage,
            );
            // Fire event to redux
            yield put(storeSetNewSupplyData({supply, alsoInList: true}))
            // Fire event for request
            yield put(storeAddSupplyRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddSupplyRequestFailed({message}));
        }
    });
}

// Extract supply data
function extractSupplyData(apiSimOutgoing, apiSimIncoming, apiUser, apiSupply) {
    let supply = {
        id: '', reference: '', amount: '', creation: '',
        note: '', remaining: '', status: '',

        user: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiSimOutgoing) {
        supply.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        supply.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiUser) {
        supply.user = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiSupply) {
        supply.actionLoader = false;
        supply.amount = apiSupply.montant;
        supply.id = apiSupply.id.toString();
        supply.creation = apiSupply.created_at;
    }
    return supply;
}

// Extract supplies data
export function extractSuppliesData(apiSupplies) {
    const supplies = [];
    apiSupplies.forEach(data => {
        supplies.push(extractSupplyData(
            data.puce_emetrice,
            data.puce_receptrice,
            data.utilisateur,
            data.flottage,
        ));
    });
    return supplies;
}

// Combine to export all functions at once
export default function* sagaSupplies() {
    yield all([
        fork(emitAddSupply),
        fork(emitSuppliesFetch),
        fork(emitNextSuppliesFetch),
    ]);
}
