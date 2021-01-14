import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {EMIT_ALL_COLLECTORS_FETCH, storeSetCollectorsData} from "./actions";
import {
    storeAllCollectorsRequestInit,
    storeAllCollectorsRequestFailed,
    storeAllCollectorsRequestSucceed
} from "../requests/collectors/actions";

// Fetch all collectors from API
export function* emitAllCollectorsFetch() {
    yield takeLatest(EMIT_ALL_COLLECTORS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllCollectorsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_COLLECTORS_API_PATH);
            // Extract data
            const collectors = extractCollectorsData(apiResponse.data.recouvreurs);
            // Fire event to redux
            yield put(storeSetCollectorsData({collectors, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllCollectorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllCollectorsRequestFailed({message}));
        }
    });
}

// Extract collector data
function extractCollectorData(apiCollector) {
    let collector = {id: '', name: '', phone: ''};
    if(apiCollector) {
        collector.name = apiCollector.name;
        collector.phone = apiCollector.phone;
        collector.id = apiCollector.id.toString();
    }
    return collector;
}

// Extract collectors data
function extractCollectorsData(apiCollectors) {
    const collectors = [];
    if(apiCollectors) {
        apiCollectors.forEach(data => {
            collectors.push(extractCollectorData(data.recouvreur));
        });
    }
    return collectors;
}

// Combine to export all functions at once
export default function* sagaCollectors() {
    yield all([
        fork(emitAllCollectorsFetch),
    ]);
}