import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {
    EMIT_SIM_FETCH,
    storeSetSimData,
    storeSetSimsData,
    EMIT_ALL_SIMS_FETCH,
    storeSetNextSimsData,
    EMIT_AGENTS_SIMS_FETCH,
    EMIT_FLEETS_SIMS_FETCH,
    EMIT_INTERNAL_SIMS_FETCH,
    EMIT_RESOURCES_SIMS_FETCH,
    EMIT_ALL_FLEETS_SIMS_FETCH,
    EMIT_COLLECTORS_SIMS_FETCH,
    EMIT_NEXT_AGENTS_SIMS_FETCH,
    EMIT_NEXT_FLEETS_SIMS_FETCH,
    storeStopInfiniteScrollSimData,
    EMIT_NEXT_RESOURCES_SIMS_FETCH,
    EMIT_NEXT_COLLECTORS_SIMS_FETCH,
} from "./actions";
import {
    storeSimRequestInit,
    storeSimsRequestInit,
    storeSimRequestFailed,
    storeSimRequestSucceed,
    storeSimsRequestFailed,
    storeAllSimsRequestInit,
    storeSimsRequestSucceed,
    storeNextSimsRequestInit,
    storeAllSimsRequestFailed,
    storeNextSimsRequestFailed,
    storeAllSimsRequestSucceed,
    storeNextSimsRequestSucceed,
    storeAllFleetSimsRequestInit,
    storeAllFleetSimsRequestFailed,
    storeAllFleetSimsRequestSucceed,
    storeAllInternalSimsRequestInit,
    storeAllInternalSimsRequestFailed,
    storeAllInternalSimsRequestSucceed,
} from "../requests/sims/actions";

// Fetch all sims from API
export function* emitAllSimsFetch() {
    yield takeLatest(EMIT_ALL_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.All_SIMS_API_PATH);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllSimsRequestFailed({message}));
        }
    });
}

// Fetch fleets sims from API
export function* emitFleetsSimsFetch() {
    yield takeLatest(EMIT_FLEETS_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEETS_SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSimsRequestFailed({message}));
        }
    });
}

// Fetch internal sims from API
export function* emitAllInternalSimsFetch() {
    yield takeLatest(EMIT_INTERNAL_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllInternalSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.All_INTERNAL_SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAllInternalSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllInternalSimsRequestFailed({message}));
        }
    });
}

// Fetch all fleets sims from API
export function* emitAllFleetsSimsFetch() {
    yield takeLatest(EMIT_ALL_FLEETS_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllFleetSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ALL_FLEETS_SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAllFleetSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllFleetSimsRequestFailed({message}));
        }
    });
}

// Fetch next fleets sims from API
export function* emitNextFleetsSimsFetch() {
    yield takeLatest(EMIT_NEXT_FLEETS_SIMS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEETS_SIMS_API_PATH}?page=${page}`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetNextSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextSimsRequestFailed({message}));
            yield put(storeStopInfiniteScrollSimData());
        }
    });
}

// Fetch collectors sims from API
export function* emitCollectorsSimsFetch() {
    yield takeLatest(EMIT_COLLECTORS_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.COLLECTORS_SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSimsRequestFailed({message}));
        }
    });
}

// Fetch next collectors sims from API
export function* emitNextCollectorsSimsFetch() {
    yield takeLatest(EMIT_NEXT_COLLECTORS_SIMS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.COLLECTORS_SIMS_API_PATH}?page=${page}`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetNextSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextSimsRequestFailed({message}));
            yield put(storeStopInfiniteScrollSimData());
        }
    });
}

// Fetch agents sims from API
export function* emitAgentsSimsFetch() {
    yield takeLatest(EMIT_AGENTS_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.AGENTS_SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSimsRequestFailed({message}));
        }
    });
}

// Fetch next agents sims from API
export function* emitNextAgentsSimsFetch() {
    yield takeLatest(EMIT_NEXT_AGENTS_SIMS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.AGENTS_SIMS_API_PATH}?page=${page}`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetNextSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextSimsRequestFailed({message}));
            yield put(storeStopInfiniteScrollSimData());
        }
    });
}

// Fetch resources sims from API
export function* emitResourcesSimsFetch() {
    yield takeLatest(EMIT_RESOURCES_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.RESOURCES_SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSimsRequestFailed({message}));
        }
    });
}

// Fetch next resources sims from API
export function* emitNextResourcesSimsFetch() {
    yield takeLatest(EMIT_NEXT_RESOURCES_SIMS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.RESOURCES_SIMS_API_PATH}?page=${page}`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetNextSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextSimsRequestFailed({message}));
            yield put(storeStopInfiniteScrollSimData());
        }
    });
}

// Fetch sim from API
export function* emitSimFetch() {
    yield takeLatest(EMIT_SIM_FETCH, function*({id}) {
        try {
            // Fire event for request
            yield put(storeSimRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SIM_API_PATH}/${id}`);
            // Extract data
            const sim = extractSimData(
                apiResponse.data.puce,
                apiResponse.data.type,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.corporate,
                apiResponse.data.flote,
                apiResponse.data.recouvreur
            );
            // Fire event to redux
            yield put(storeSetSimData({sim}));
            // Fire event for request
            yield put(storeSimRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSimRequestFailed({message}));
        }
    });
}

// Extract sim data
function extractSimData(apiSim, apiType, apiUser, apiAgent, apiCompany, apiOperator, apiCollector) {
    let sim = {
        id: '', name: '', reference: '', number: '', balance: '', description: '', creation: '',

        type: {id: '', name: ''},
        agent: {id: '', name: ''},
        company: {id: '', name: ''},
        operator: {id: '', name: ''},
        collector: {id: '', name: ''}
    };
    if(apiAgent && apiUser) {
        sim.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiCollector) {
        sim.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString(),
        };
    }
    if(apiCompany) {
        sim.company = {
            name: apiCompany.nom,
            id: apiCompany.id.toString()
        };
    }
    if(apiOperator) {
        sim.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString()
        };
    }
    if(apiType) {
        sim.type = {
            name: apiType.name,
            id: apiType.id.toString()
        };
    }
    if(apiSim) {
        sim.name = apiSim.nom;
        sim.actionLoader = false;
        sim.number = apiSim.numero;
        sim.balance = apiSim.solde;
        sim.id = apiSim.id.toString();
        sim.creation = apiSim.created_at;
        sim.reference = apiSim.reference;
        sim.description = apiSim.description;
    }
    return sim;
}

// Extract sims data
function extractSimsData(apiSims) {
    const sims = [];
    apiSims.forEach(data => {
        sims.push(extractSimData(
            data.puce,
            data.type,
            data.user,
            data.agent,
            data.corporate,
            data.flote,
            data.recouvreur
        ))
    });
    return sims;
}

// Combine to export all functions at once
export default function* sagaSims() {
    yield all([
        fork(emitSimFetch),
        fork(emitAllSimsFetch),
        fork(emitFleetsSimsFetch),
        fork(emitAgentsSimsFetch),
        fork(emitAllFleetsSimsFetch),
        fork(emitResourcesSimsFetch),
        fork(emitNextFleetsSimsFetch),
        fork(emitCollectorsSimsFetch),
        fork(emitNextAgentsSimsFetch),
        fork(emitAllInternalSimsFetch),
        fork(emitNextResourcesSimsFetch),
        fork(emitNextCollectorsSimsFetch),
    ]);
}