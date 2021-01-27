import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {SUPPLY_BY_AGENT} from "../../constants/typeConstants";
import {apiGetRequest, apiPostRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_REFUEL,
    EMIT_REFUELS_FETCH,
    EMIT_CONFIRM_REFUEL,
    storeSetRefuelsData,
    storeSetNewRefuelData,
    storeUpdateRefuelData,
    storeSetNextRefuelsData,
    EMIT_NEXT_REFUELS_FETCH,
    storeSetRefuelActionData,
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
    storeConfirmRefuelRequestInit,
    storeNextRefuelsRequestSucceed,
    storeConfirmRefuelRequestFailed,
    storeConfirmRefuelRequestSucceed
} from "../requests/refuels/actions";

// Fetch refuels from API
export function* emitRefuelsFetch() {
    yield takeLatest(EMIT_REFUELS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeRefuelsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.REFUELS_API_PATH}?page=1`);
            // Extract data
            const refuels = extractRefuelsData(apiResponse.data.destockages);
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
            const refuels = extractRefuelsData(apiResponse.data.destockages);
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
    yield takeLatest(EMIT_ADD_REFUEL, function*({agent, amount, sim, receipt}) {
        try {
            // Fire event for request
            yield put(storeAddRefuelRequestInit());
            const data = new FormData();
            data.append('id_puce', sim);
            data.append('recu', receipt);
            data.append('id_agent', agent);
            data.append('montant', amount);
            data.append('type', SUPPLY_BY_AGENT);
            const apiResponse = yield call(apiPostRequest, api.NEW_REFUEL_API_PATH, data);
            // Extract dataF
            const refuel = extractRefuelData(apiResponse.data);
            // Fire event to redux
            yield put(storeSetNewRefuelData({refuel}))
            // Fire event for request
            yield put(storeAddRefuelRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddRefuelRequestFailed({message}));
        }
    });
}

// Confirm refuel from API
export function* emitConfirmRefuel() {
    yield takeLatest(EMIT_CONFIRM_REFUEL, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetRefuelActionData({id}));
            // Fire event for request
            yield put(storeConfirmRefuelRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CONFIRM_REFUEL_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeUpdateRefuelData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetRefuelActionData({id}));
            // Fire event for request
            yield put(storeConfirmRefuelRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetRefuelActionData({id}));
            yield put(storeConfirmRefuelRequestFailed({message}));
        }
    });
}

// Extract refuel data
function extractRefuelData(apiRefuel) {
    let refuel = {
        id: '', amount: '', creation: '', vendor: '', receipt: '', status: '',

        agent: {id: '', name: ''},
        collector: {id: '', name: ''},
        sim: {id: '', name: '', number: ''},
    };

    const apiSim = apiRefuel.puce;
    const apiUser = apiRefuel.user;
    const apiAgent = apiRefuel.agent;
    const apiCollector = apiRefuel.recouvreur;

    if(apiAgent && apiUser) {
        refuel.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiSim) {
        refuel.sim = {
            name: apiSim.nom,
            number: apiSim.numero,
            id: apiSim.id.toString()
        };
    }
    if(apiCollector) {
        refuel.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString()
        };
    }
    if(apiRefuel) {
        refuel.actionLoader = false;
        refuel.status = apiRefuel.statut;
        refuel.amount = apiRefuel.montant;
        refuel.id = apiRefuel.id.toString();
        refuel.vendor = apiRefuel.fournisseur;
        refuel.creation = apiRefuel.created_at;
        refuel.receipt = getFileFromServer(apiRefuel.recu);
    }
    return refuel;
}

// Extract refuels data
export function extractRefuelsData(apiRefuels) {
    const refuels = [];
    apiRefuels.forEach(data => {
        refuels.push(extractRefuelData(data));
    });
    return refuels;
}

// Combine to export all functions at once
export default function* sagaRefuels() {
    yield all([
        fork(emitAddRefuel),
        fork(emitRefuelsFetch),
        fork(emitConfirmRefuel),
        fork(emitNextRefuelsFetch),
    ]);
}
