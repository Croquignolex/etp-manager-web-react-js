import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {DONE} from "../../constants/typeConstants";
import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_REVENUE,
    EMIT_REVENUES_FETCH,
    storeSetRevenuesData,
    storeSetNewRevenueData,
    storeSetNextRevenuesData,
    EMIT_NEXT_REVENUES_FETCH,
    storeStopInfiniteScrollRevenueData
} from "./actions";
import {
    storeRevenuesRequestInit,
    storeRevenuesRequestFailed,
    storeAddRevenueRequestInit,
    storeRevenuesRequestSucceed,
    storeAddRevenueRequestFailed,
    storeNextRevenuesRequestInit,
    storeAddRevenueRequestSucceed,
    storeNextRevenuesRequestFailed,
    storeNextRevenuesRequestSucceed
} from "../requests/revenues/actions";

// Fetch revenues from API
export function* emitRevenuesFetch() {
    yield takeLatest(EMIT_REVENUES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeRevenuesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.REVENUES_API_PATH}?page=1`);
            // Extract data
            const revenues = extractRevenuesData(apiResponse.data.treasuries);
            // Fire event to redux
            yield put(storeSetRevenuesData({revenues, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeRevenuesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeRevenuesRequestFailed({message}));
        }
    });
}

// Fetch next revenues from API
export function* emitNextRevenuesFetch() {
    yield takeLatest(EMIT_NEXT_REVENUES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextRevenuesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.REVENUES_API_PATH}?page=${page}`);
            // Extract data
            const revenues = extractRevenuesData(apiResponse.data.treasuries);
            // Fire event to redux
            yield put(storeSetNextRevenuesData({revenues, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextRevenuesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextRevenuesRequestFailed({message}));
            yield put(storeStopInfiniteScrollRevenueData());
        }
    });
}

// Fleets new revenue from API
export function* emitAddRevenue() {
    yield takeLatest(EMIT_ADD_REVENUE, function*({amount, name, reason, description, receipt}) {
        try {
            // Fire event for request
            yield put(storeAddRevenueRequestInit());
            const data = {nom: name, raison: reason, description: description, montant: amount};
            const apiResponse = yield call(apiPostRequest, api.NEW_REVENUE_API_PATH, data);
            // Extract data
            const revenue = extractRevenueData(
                apiResponse.data.treasury,
                apiResponse.data.manager,
            );
            // Fire event to redux
            yield put(storeSetNewRevenueData({revenue}))
            // Fire event for request
            yield put(storeAddRevenueRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddRevenueRequestFailed({message}));
        }
    });
}

// Extract revenue data
function extractRevenueData(apiRevenue, apiManager) {
    let revenue = {
        id: '',  name: '', mount: '', creation: '', receipt: '', reason: '', description: '', status: '',

        manager: {id: '', name: ''},
    };
    if(apiManager) {
        revenue.manager = {
            name: apiManager.name,
            id: apiManager.id.toString()
        };
    }
    if(apiRevenue) {
        revenue.status = DONE;
        revenue.name = apiRevenue.name;
        revenue.reason = apiRevenue.reason;
        revenue.amount = apiRevenue.amount;
        revenue.id = apiRevenue.id.toString();
        revenue.creation = apiRevenue.created_at;
        revenue.description = apiRevenue.description;
        revenue.receipt = getFileFromServer(apiRevenue.receipt);
    }
    return revenue;
}

// Extract revenues data
export function extractRevenuesData(apiRevenues) {
    const revenues = [];
    apiRevenues.forEach(data => {
        revenues.push(extractRevenueData(
            data.treasury,
            data.manager
        ));
    });
    return revenues;
}

// Combine to export all functions at once
export default function* sagaRevenues() {
    yield all([
        fork(emitAddRevenue),
        fork(emitRevenuesFetch),
        fork(emitNextRevenuesFetch),
    ]);
}
