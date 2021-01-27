import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_REFUEL,
    EMIT_REFUELS_FETCH,
    storeSetRefuelsData,
    storeSetNewRefuelData,
    storeSetNextRefuelsData,
    EMIT_NEXT_REFUELS_FETCH,
    storeStopInfiniteScrollRefuelData
} from "./actions";
import {
    storeRefuelsRequestInit,
    storeRefuelsRequestFailed,
    storeAddRefuelRequestInit,
    storeRefuelsRequestSucceed,
    storeAddRefuelRequestFailed,
    storeNextRefuelsRequestInit,
    storeAddRefuelRequestSucceed,
    storeNextRefuelsRequestFailed,
    storeNextRefuelsRequestSucceed
} from "../requests/refuels/actions";

// Fetch refuels from API
export function* emitRefuelsFetch() {
    yield takeLatest(EMIT_REFUELS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeRefuelsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.REFUELS_API_PATH}?page=1`);
            // Extract data
            const refuels = extractRefuelsData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeRefuelsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeRefuelsRequestFailed({message}));
        }
    });
}

// Fetch next refuels from API
export function* emitNextRefuelsFetch() {
    yield takeLatest(EMIT_NEXT_REFUELS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextRefuelsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.REFUELS_API_PATH}?page=${page}`);
            // Extract data
            const refuels = extractRefuelsData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetNextRefuelsData({refuels, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextRefuelsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextRefuelsRequestFailed({message}));
            yield put(storeStopInfiniteScrollRefuelData());
        }
    });
}

// Fleets new refuel from API
export function* emitAddRefuel() {
    yield takeLatest(EMIT_ADD_REFUEL, function*({amount, managerSim, agentSim, agent}) {
        try {
            // Fire event for request
            yield put(storeAddRefuelRequestInit());
            const data = {montant: amount, id_puce_flottage: managerSim, id_puce_agent: agentSim, id_agent: agent};
            const apiResponse = yield call(apiPostRequest, api.NEW_REFUEL_API_PATH, data);
            // Extract data
            const refuel = extractRefuelData(
                apiResponse.data.puce_emetrice,
                apiResponse.data.puce_receptrice,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.gestionnaire,
                apiResponse.data.approvisionnement
            );
            // Fire event to redux
            yield put(storeSetNewRefuelData({refuel, alsoInList: true}))
            // Fire event for request
            yield put(storeAddRefuelRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddRefuelRequestFailed({message}));
        }
    });
}

// Extract refuel data
function extractRefuelData(apiSimOutgoing, apiSimIncoming, apiUser, apiAgent, apiSupplier, apiRefuel) {
    let refuel = {
        id: '', amount: '', creation: '', remaining: '', status: '',

        request: {id: ''},
        agent: {id: '', name: ''},
        supplier: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiAgent && apiUser) {
        refuel.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiSimOutgoing) {
        refuel.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        refuel.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiSupplier) {
        refuel.supplier = {
            name: apiSupplier.name,
            id: apiSupplier.id.toString()
        };
    }
    if(apiRefuel) {
        refuel.actionLoader = false;
        refuel.status = apiRefuel.statut;
        refuel.amount = apiRefuel.montant;
        refuel.remaining = apiRefuel.reste;
        refuel.id = apiRefuel.id.toString();
        refuel.creation = apiRefuel.created_at;
    }
    return refuel;
}

// Extract refuels data
export function extractRefuelsData(apiRefuels) {
    const refuels = [];
    apiRefuels.forEach(data => {
        refuels.push(extractRefuelData(
            data.puce_emetrice,
            data.puce_receptrice,
            data.user,
            data.agent,
            data.gestionnaire,
            data.approvisionnement,
        ));
    });
    return refuels;
}

// Combine to export all functions at once
export default function* sagaRefuels() {
    yield all([
        fork(emitAddRefuel),
        fork(emitRefuelsFetch),
        fork(emitNextRefuelsFetch),
    ]);
}
