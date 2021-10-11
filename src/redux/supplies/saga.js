import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {DONE} from "../../constants/typeConstants";
import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_SUPPLY,
    EMIT_CANCEL_SUPPLY,
    EMIT_SUPPLIES_FETCH,
    storeSetSuppliesData,
    storeCancelSupplyData,
    storeSetNewSupplyData,
    storeSetNextSuppliesData,
    storeSetSupplyActionData,
    EMIT_NEXT_SUPPLIES_FETCH,
    EMIT_ADD_ANONYMOUS_SUPPLY,
    EMIT_SEARCH_SUPPLIES_FETCH,
    storeStopInfiniteScrollSupplyData
} from "./actions";
import {
    storeSuppliesRequestInit,
    storeAddSupplyRequestInit,
    storeSuppliesRequestFailed,
    storeSuppliesRequestSucceed,
    storeAddSupplyRequestFailed,
    storeNextSuppliesRequestInit,
    storeAddSupplyRequestSucceed,
    storeCancelSupplyRequestInit,
    storeCancelSupplyRequestFailed,
    storeNextSuppliesRequestFailed,
    storeNextSuppliesRequestSucceed,
    storeCancelSupplyRequestSucceed,
    storeAddAnonymousSupplyRequestInit,
    storeAddAnonymousSupplyRequestFailed,
    storeAddAnonymousSupplyRequestSucceed
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
    yield takeLatest(EMIT_ADD_SUPPLY, function*({amount, managerSim, agentSim, agent, pay}) {
        try {
            // Fire event for request
            yield put(storeAddSupplyRequestInit());
            const data = {
                montant: amount,
                id_agent: agent,
                id_puce_agent: agentSim,
                id_puce_flottage: managerSim,
                direct_pay: pay ? DONE : null
            };
            const apiResponse = yield call(apiPostRequest, api.NEW_SUPPLY_API_PATH, data);
            // Extract data
            const supply = extractSupplyData(
                apiResponse.data.puce_emetrice,
                apiResponse.data.puce_receptrice,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.gestionnaire,
                apiResponse.data.approvisionnement,
                apiResponse.data.operateur,
            );
            // Fire event to redux
            yield put(storeSetNewSupplyData({supply}))
            // Fire event for request
            yield put(storeAddSupplyRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddSupplyRequestFailed({message}));
        }
    });
}

// Fleets new anonymous supply from API
export function* emitAddAnonymousSupply() {
    yield takeLatest(EMIT_ADD_ANONYMOUS_SUPPLY, function*({sim, amount, receiver, receiverSim, pay, zone}) {
        try {
            // Fire event for request
            yield put(storeAddAnonymousSupplyRequestInit());
            const data = {
                id_zone: zone,
                montant: amount,
                id_puce_from: sim,
                nom_agent: receiver,
                nro_puce_to: receiverSim,
                direct_pay: pay ? DONE : null
            };
            const apiResponse = yield call(apiPostRequest, api.NEW_ANONYMOUS_SUPPLY_API_PATH, data);
            // Extract data
            const supply = extractSupplyData(
                apiResponse.data.puce_emetrice,
                apiResponse.data.puce_receptrice,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.gestionnaire,
                apiResponse.data.approvisionnement,
                apiResponse.data.operateur,
            );
            // Fire event to redux
            yield put(storeSetNewSupplyData({supply}))
            // Fire event for request
            yield put(storeAddAnonymousSupplyRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddAnonymousSupplyRequestFailed({message}));
        }
    });
}

// Emit search supplies fetch
export function* emitSearchSuppliesFetch() {
    yield takeLatest(EMIT_SEARCH_SUPPLIES_FETCH, function*({needle}) {
        try {
            // Fire event for request
            yield put(storeSuppliesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SEARCH_SUPPLIES_API_PATH}?needle=${needle}`);
            // Extract data
            const supplies = extractSuppliesData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeSuppliesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSuppliesRequestFailed({message}));
        }
    });
}

// Cancel supply from API
export function* emitCancelSupply() {
    yield takeLatest(EMIT_CANCEL_SUPPLY, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetSupplyActionData({id}));
            // Fire event for request
            yield put(storeCancelSupplyRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CANCEL_SUPPLY_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeCancelSupplyData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetSupplyActionData({id}));
            // Fire event for request
            yield put(storeCancelSupplyRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetSupplyActionData({id}));
            yield put(storeCancelSupplyRequestFailed({message}));
        }
    });
}

// Extract supply data
function extractSupplyData(apiSimOutgoing, apiSimIncoming, apiUser, apiAgent, apiSupplier, apiSupply, apiOperator) {
    let supply = {
        id: '', amount: '', creation: '', remaining: '', status: '',

        request: {id: ''},
        agent: {id: '', name: ''},
        operator: {id: '', name: ''},
        supplier: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiAgent && apiUser) {
        supply.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
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
    if(apiSupplier) {
        supply.supplier = {
            name: apiSupplier.name,
            id: apiSupplier.id.toString()
        };
    }
    if(apiOperator) {
        supply.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString(),
        }
    }
    if(apiSupply) {
        supply.actionLoader = false;
        supply.status = apiSupply.statut;
        supply.amount = apiSupply.montant;
        supply.remaining = apiSupply.reste;
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
            data.user,
            data.agent,
            data.gestionnaire,
            data.approvisionnement,
            data.operateur,
        ));
    });
    return supplies;
}

// Combine to export all functions at once
export default function* sagaSupplies() {
    yield all([
        fork(emitAddSupply),
        fork(emitCancelSupply),
        fork(emitSuppliesFetch),
        fork(emitNextSuppliesFetch),
        fork(emitAddAnonymousSupply),
        fork(emitSearchSuppliesFetch),
    ]);
}
