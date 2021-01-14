import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_HANDOVERS_FETCH,
    EMIT_IMPROVE_HANDOVER,
    storeSetHandoversData,
    storeSetNewHandoverData,
    storeSetNextHandoversData,
    EMIT_NEXT_HANDOVERS_FETCH,
    storeStopInfiniteScrollHandoverData
} from "./actions";
import {
    storeHandoversRequestInit,
    storeHandoversRequestFailed,
    storeHandoversRequestSucceed,
    storeNextHandoversRequestInit,
    storeImproveHandoverRequestInit,
    storeNextHandoversRequestFailed,
    storeNextHandoversRequestSucceed,
    storeImproveHandoverRequestFailed,
    storeImproveHandoverRequestSucceed
} from "../requests/handovers/actions";

// Fetch handovers from API
export function* emitHandoversFetch() {
    yield takeLatest(EMIT_HANDOVERS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeHandoversRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.HANDOVERS_API_PATH}?page=1`);
            // Extract data
            const handovers = extractHandoversData(apiResponse.data.versements);
            // Fire event to redux
            yield put(storeSetHandoversData({handovers, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeHandoversRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeHandoversRequestFailed({message}));
        }
    });
}

// Fetch next handovers from API
export function* emitNextHandoversFetch() {
    yield takeLatest(EMIT_NEXT_HANDOVERS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextHandoversRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.HANDOVERS_API_PATH}?page=${page}`);
            // Extract data
            const handovers = extractHandoversData(apiResponse.data.versements);
            // Fire event to redux
            yield put(storeSetNextHandoversData({handovers, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextHandoversRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextHandoversRequestFailed({message}));
            yield put(storeStopInfiniteScrollHandoverData());
        }
    });
}

// Fleets improve handover from API
export function* emitImproveHandover() {
    yield takeLatest(EMIT_IMPROVE_HANDOVER, function*({amount, collector, receipt}) {
        try {
            // Fire event for request
            yield put(storeImproveHandoverRequestInit());
            const data = new FormData();
            data.append('id_donneur', collector);
            data.append('montant', amount);
            const apiResponse = yield call(apiPostRequest, api.NEW_HANDOVER_API_PATH, data);
            // Extract data
            const handover = extractHandoverData(
                apiResponse.data.gestionnaire,
                apiResponse.data.recouvreur,
                apiResponse.data.versement
            );
            // Fire event to redux
            yield put(storeSetNewHandoverData({handover, alsoInList: true}))
            // Fire event for request
            yield put(storeImproveHandoverRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeImproveHandoverRequestFailed({message}));
        }
    });
}

// Extract handover data
function extractHandoverData(apiManager, apiCollector, apiHandover) {
    let handover = {
        id: '', amount: '', creation: '',

        manager: {id: '', name: ''},
        collector: {id: '', name: ''},
    };
    if(apiManager) {
        handover.manager = {
            name: apiManager.name,
            id: apiManager.id.toString()
        };
    }
    if(apiCollector) {
        handover.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString()
        };
    }
    if(apiHandover) {
        handover.amount = apiHandover.montant;
        handover.id = apiHandover.id.toString();
        handover.creation = apiHandover.created_at;
    }
    return handover;
}

// Extract handovers data
export function extractHandoversData(apiHandovers) {
    const handovers = [];
    apiHandovers.forEach(data => {
        handovers.push(extractHandoverData(
            data.gestionnaire,
            data.recouvreur,
            data.versement,
        ));
    });
    return handovers;
}

// Combine to export all functions at once
export default function* sagaHandovers() {
    yield all([
        fork(emitHandoversFetch),
        fork(emitImproveHandover),
        fork(emitNextHandoversFetch),
    ]);
}
