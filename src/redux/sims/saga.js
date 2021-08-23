import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {dateToString, shortDateToString} from "../../functions/generalFunctions";
import {
    EMIT_SIM_FETCH,
    storeSetSimData,
    storeSetSimsData,
    EMIT_ALL_SIMS_FETCH,
    storeSetNextSimsData,
    EMIT_AGENTS_SIMS_FETCH,
    EMIT_FLEETS_SIMS_FETCH,
    EMIT_UPDATE_SIM_OPERATOR,
    EMIT_INTERNAL_SIMS_FETCH,
    EMIT_RESOURCES_SIMS_FETCH,
    EMIT_ALL_FLEETS_SIMS_FETCH,
    EMIT_COLLECTORS_SIMS_FETCH,
    EMIT_SIM_TRANSACTIONS_FETCH,
    storeSetSimTransactionsData,
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
    storeEditSimOperatorRequestInit,
    storeSimTransactionsRequestInit,
    storeEditSimOperatorRequestFailed,
    storeAllInternalSimsRequestFailed,
    storeSimTransactionsRequestFailed,
    storeEditSimOperatorRequestSucceed,
    storeAllInternalSimsRequestSucceed,
    storeSimTransactionsRequestSucceed,
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
export function* emitAllFleetSimsFetch() {
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

// Update sim operator
export function* emitUpdateSimOperator() {
    yield takeLatest(EMIT_UPDATE_SIM_OPERATOR, function*({id, operator}) {
        try {
            // Fire event for request
            yield put(storeEditSimOperatorRequestInit());
            const data = {id_flotte: operator};
            const apiResponse = yield call(apiPostRequest, `${api.EDIT_SIM_OPERATOR_API_PATH}/${id}`, data);
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
            yield put(storeSetSimData({sim, alsoInList: true}));
            // Fire event for request
            yield put(storeEditSimOperatorRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeEditSimOperatorRequestFailed({message}));
        }
    });
}

// Fetch sim transactions from API
export function* emitSimTransactionsFetch() {
    yield takeLatest(EMIT_SIM_TRANSACTIONS_FETCH, function*({id, selectedStartDay, selectedEndDay}) {
        try {
            // Fire event for request
            yield put(storeSimTransactionsRequestInit());
            const data = {
                debut: shortDateToString(selectedStartDay),
                fin: shortDateToString(selectedEndDay),
            };
            const apiResponse = yield call(apiPostRequest, `${api.SIM_TRANSACTIONS_API_PATH}/${id}`, data);
            // Extract data
            const transactions = extractSimTransactionsData(
                apiResponse.data.transactions
            );
            // Fire event to redux
            yield put(storeSetSimTransactionsData({transactions}));
            // Fire event for request
            yield put(storeSimTransactionsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSimTransactionsRequestFailed({message}));
        }
    });
}

// Extract sim transactions data
function extractSimTransactionsData(apiTransactions) {
    let transactions = [];

    apiTransactions.forEach(transaction => {
        transactions.push({
            in: transaction.in,
            out: transaction.out,
            type: transaction.type,
            user: transaction.user,
            balance: transaction.balance,
            operator: transaction.operator,
            right_account: transaction.right,
            creation: dateToString(transaction.created_at),
        });
    });

    return transactions;
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
        fork(emitUpdateSimOperator),
        fork(emitAllFleetSimsFetch),
        fork(emitResourcesSimsFetch),
        fork(emitNextFleetsSimsFetch),
        fork(emitCollectorsSimsFetch),
        fork(emitNextAgentsSimsFetch),
        fork(emitSimTransactionsFetch),
        fork(emitAllInternalSimsFetch),
        fork(emitNextResourcesSimsFetch),
        fork(emitNextCollectorsSimsFetch),
    ]);
}