import Lodash from "lodash";
import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_CANCEL_HANDOVER,
    EMIT_HANDOVERS_FETCH,
    storeSetHandoversData,
    EMIT_IMPROVE_HANDOVER,
    EMIT_CONFIRM_HANDOVER,
    storeSetNewHandoverData,
    storeCancelHandoverData,
    storeUpdateHandoverData,
    storeSetNextHandoversData,
    EMIT_NEXT_HANDOVERS_FETCH,
    storeSetGroupHandoversData,
    storeSetHandoverActionData,
    EMIT_GROUP_HANDOVERS_FETCH,
    EMIT_GROUP_CONFIRM_HANDOVER,
    storeStopInfiniteScrollHandoverData
} from "./actions";
import {
    storeHandoversRequestInit,
    storeHandoversRequestFailed,
    storeHandoversRequestSucceed,
    storeNextHandoversRequestInit,
    storeCancelHandoverRequestInit,
    storeImproveHandoverRequestInit,
    storeConfirmHandoverRequestInit,
    storeNextHandoversRequestFailed,
    storeCancelHandoverRequestFailed,
    storeNextHandoversRequestSucceed,
    storeImproveHandoverRequestFailed,
    storeCancelHandoverRequestSucceed,
    storeConfirmHandoverRequestFailed,
    storeImproveHandoverRequestSucceed,
    storeConfirmHandoverRequestSucceed
} from "../requests/handovers/actions";

// Fetch handovers from API
export function* emitHandoversFetch() {
    yield takeLatest(EMIT_HANDOVERS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeHandoversRequestInit());
            yield put(storeSetHandoversData({handovers: [], hasMoreData: false, page: 0}));
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

// Fetch group handovers from API
export function* emitGroupHandoversFetch() {
    yield takeLatest(EMIT_GROUP_HANDOVERS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeHandoversRequestInit());
            yield put(storeSetHandoversData({handovers: [], hasMoreData: false, page: 0}));
            const apiResponse = yield call(apiGetRequest, api.GROUP_HANDOVERS_API_PATH);
            // Extract data
            const handovers = extractHandoversData(apiResponse.data.versements);
            const groupedHandover = Object.values(Lodash.groupBy(handovers, transfer => transfer.sender.id));
            // Fire event to redux
            yield put(storeSetGroupHandoversData({handovers: groupedHandover}));
            // Fire event for request
            yield put(storeHandoversRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeHandoversRequestFailed({message}));
        }
    });
}

// Confirm group transfer from API
export function* emitGroupConfirmHandover() {
    yield takeLatest(EMIT_GROUP_CONFIRM_HANDOVER, function*({ids}) {
        try {
            // Fire event for request
            yield put(storeConfirmHandoverRequestInit());
            const apiResponse = yield call(apiPostRequest, api.GROUP_CONFIRM_HANDOVER_API_PATH, {ids});
            const apiResponse2 = yield call(apiGetRequest, api.GROUP_HANDOVERS_API_PATH);
            // Extract data
            const handovers = extractHandoversData(apiResponse2.data.versements);
            const groupedHandover = Object.values(Lodash.groupBy(handovers, transfer => transfer.sender.id));
            // Fire event to redux
            yield put(storeSetGroupHandoversData({handovers: groupedHandover}));
            // Fire event for request
            yield put(storeConfirmHandoverRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeConfirmHandoverRequestFailed({message}));
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
    yield takeLatest(EMIT_IMPROVE_HANDOVER, function*({amount, receiver}) {
        try {
            // Fire event for request
            yield put(storeImproveHandoverRequestInit());
            const data = {id_receveur: receiver, montant: amount};
            const apiResponse = yield call(apiPostRequest, api.NEW_HANDOVER_API_PATH, data);
            // Extract data
            const handover = extractHandoverData(
                apiResponse.data.emetteur,
                apiResponse.data.recepteur,
                apiResponse.data.versement
            );
            // Fire event to redux
            yield put(storeSetNewHandoverData({handover}))
            // Fire event for request
            yield put(storeImproveHandoverRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeImproveHandoverRequestFailed({message}));
        }
    });
}

// Confirm handover from API
export function* emitConfirmHandover() {
    yield takeLatest(EMIT_CONFIRM_HANDOVER, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetHandoverActionData({id}));
            // Fire event for request
            yield put(storeConfirmHandoverRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CONFIRM_HANDOVER_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeUpdateHandoverData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetHandoverActionData({id}));
            // Fire event for request
            yield put(storeConfirmHandoverRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetHandoverActionData({id}));
            yield put(storeConfirmHandoverRequestFailed({message}));
        }
    });
}

// Cancel transfer from API
export function* emitCancelHandover() {
    yield takeLatest(EMIT_CANCEL_HANDOVER, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetHandoverActionData({id}));
            // Fire event for request
            yield put(storeCancelHandoverRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CANCEL_HANDOVER_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeCancelHandoverData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetHandoverActionData({id}));
            // Fire event for request
            yield put(storeCancelHandoverRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetHandoverActionData({id}));
            yield put(storeCancelHandoverRequestFailed({message}));
        }
    });
}

// Extract handover data
function extractHandoverData(apiSender, apiReceiver, apiHandover) {
    let handover = {
        id: '', amount: '', creation: '', status: '',

        sender: {id: '', name: ''},
        receiver: {id: '', name: ''},
    };
    if(apiSender) {
        handover.sender = {
            name: apiSender.name,
            id: apiSender.id.toString()
        };
    }
    if(apiReceiver) {
        handover.receiver = {
            name: apiReceiver.name,
            id: apiReceiver.id.toString()
        };
    }
    if(apiHandover) {
        handover.actionLoader = false;
        handover.status = apiHandover.statut;
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
            data.emetteur,
            data.recepteur,
            data.versement,
        ));
    });
    return handovers;
}

// Combine to export all functions at once
export default function* sagaHandovers() {
    yield all([
        fork(emitCancelHandover),
        fork(emitHandoversFetch),
        fork(emitImproveHandover),
        fork(emitConfirmHandover),
        fork(emitNextHandoversFetch),
        fork(emitGroupHandoversFetch),
        fork(emitGroupConfirmHandover),
    ]);
}
