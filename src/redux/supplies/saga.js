import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {storeRequestFailed, storeRequestInit, storeRequestSucceed} from "../requests/actions";
import {
    apiGetRequest,
    apiPostRequest,
    sortByCreationDate,
} from "../../helpers/functions";
import {
    EMIT_NEW_SUPPLY,
    storeSetSuppliesData,
    EMIT_NEW_NETWORK_SUPPLY,
    EMIT_NETWORK_SUPPLIES_FETCH,
    EMIT_SUPPLIES_FETCH_BY_AGENT,
    EMIT_COLLECTORS_FLEETS_FETCH,
    EMIT_SUPPLIES_FETCH_BY_MANAGER,
    EMIT_SUPPLIES_FETCH_BY_COLLECTOR,
} from './actions'
import {
    SUPPLIES_SCOPE,
    SUPPLY_NEW_SCOPE,
    NETWORK_SUPPLIES_API_PATH,
    SUPPLIES_BY_AGENT_API_PATH,
    NETWORK_NEW_SUPPLY_API_PATH,
    SUPPLIES_BY_MANAGER_API_PATH,
    SUPPLIES_BY_COLLECTOR_API_PATH,
    FLEET_NEW_SUPPLY_BY_MANAGER_API_PATH,
    NETWORK_COLLECTORS_SUPPLIES_API_PATH,
} from "../../helpers/constants";

// Fetch supplies by manager from API
export function* emitSuppliesFetchByManager() {
    yield takeLatest(EMIT_SUPPLIES_FETCH_BY_MANAGER, function*() {
        const scope = SUPPLIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, SUPPLIES_BY_MANAGER_API_PATH);
            const supplies = extractSuppliesData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch supplies by collector from API
export function* emitSuppliesFetchByCollector() {
    yield takeLatest(EMIT_SUPPLIES_FETCH_BY_COLLECTOR, function*() {
        const scope = SUPPLIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, SUPPLIES_BY_COLLECTOR_API_PATH);
            const supplies = extractSuppliesData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch supplies by agent from API
export function* emitSuppliesFetchByAgent() {
    yield takeLatest(EMIT_SUPPLIES_FETCH_BY_AGENT, function*({id}) {
        const scope = SUPPLIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${SUPPLIES_BY_AGENT_API_PATH}/${id}`);
            const supplies = extractSuppliesData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fleets new supply from API
export function* emitNewSupply() {
    yield takeLatest(EMIT_NEW_SUPPLY, function*({agent, amount, agentSim, managerSim}) {
        const scope = SUPPLY_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, FLEET_NEW_SUPPLY_BY_MANAGER_API_PATH,
                {
                    montant: amount,
                    id_agent: agent,
                    id_puce_agent: agentSim,
                    id_puce_flottage: managerSim,
                });
            const supplies = extractSuppliesData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies}));
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Flottage éffectué avec succès`
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

// *********************************** Network ***********************************

// Fetch network supplies from API
export function* emitNetworkSuppliesFetch() {
    yield takeLatest(EMIT_NETWORK_SUPPLIES_FETCH, function*({id}) {
        const scope = SUPPLIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${NETWORK_SUPPLIES_API_PATH}/${id}`);
            const supplies = extractSuppliesData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Network new supply from API
export function* emitNetworkNewSupply() {
    yield takeLatest(EMIT_NEW_NETWORK_SUPPLY, function*({agent, amount, agentSim, collectorSim}) {
        const scope = SUPPLY_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, NETWORK_NEW_SUPPLY_API_PATH,
                {
                    montant: amount,
                    id_agent: agent,
                    id_sim_agent: agentSim,
                    id_sim_rz: collectorSim,
                });
            const supplies = extractSuppliesData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies}));
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Flottage éffectué avec succès`
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

// Collectors supplies from API
export function* emitCollectorsFleetsFetch() {
    yield takeLatest(EMIT_COLLECTORS_FLEETS_FETCH, function*() {
        const scope = SUPPLIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, NETWORK_COLLECTORS_SUPPLIES_API_PATH);
            const supplies = extractSuppliesData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract supply data
function extractSupplyData(apiSimOutgoing, apiSimIncoming, apiUser, apiAgent, apiSupplier, apiRequest, apiSupply) {
    let supply = {
        id: '', reference: '', amount: '', creation: '',
        note: '', remaining: '', status: '',

        request: {id: ''},
        supplier: {id: '', name: ''},
        agent: {id: '', name: '', reference: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiRequest) {
        supply.request = {
            id: apiRequest.id.toString(),
        }
    }
    if(apiAgent && apiUser) {
        supply.agent = {
            name: apiUser.name,
            id: apiAgent.id.toString(),
            reference: apiAgent.reference,
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
    if(apiSupply) {
        supply.actionLoader = false;
        supply.note = apiSupply.note;
        supply.status = apiSupply.statut;
        supply.amount = apiSupply.montant;
        supply.remaining = apiSupply.reste;
        supply.id = apiSupply.id.toString();
        supply.creation = apiSupply.created_at;
        supply.reference = apiSupply.reference;
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
            data.demande,
            data.approvisionnement,
        ));
    });
    sortByCreationDate(supplies);
    return supplies;
}


// Combine to export all functions at once
export default function* sagaSupplies() {
    yield all([
        fork(emitNewSupply),
        fork(emitNetworkNewSupply),
        fork(emitNetworkSuppliesFetch),
        fork(emitSuppliesFetchByAgent),
        fork(emitCollectorsFleetsFetch),
        fork(emitSuppliesFetchByManager),
        fork(emitSuppliesFetchByCollector),
    ]);
}
