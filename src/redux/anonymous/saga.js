import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_ANONYMOUS,
    EMIT_ANONYMOUS_FETCH,
    storeSetAnonymousData,
    storeSetNewAnonymousData,
    storeSetNextAnonymousData,
    EMIT_NEXT_ANONYMOUS_FETCH,
    storeStopInfiniteScrollAnonymousData
} from "./actions";
import {
    storeAnonymousRequestInit,
    storeAnonymousRequestFailed,
    storeAddAnonymousRequestInit,
    storeAnonymousRequestSucceed,
    storeNextAnonymousRequestInit,
    storeAddAnonymousRequestFailed,
    storeAddAnonymousRequestSucceed,
    storeNextAnonymousRequestFailed,
    storeNextAnonymousRequestSucceed
} from "../requests/anonymous/actions";

// Fetch anonymous from API
export function* emitAnonymousFetch() {
    yield takeLatest(EMIT_ANONYMOUS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAnonymousRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ANONYMOUS_FLEETS_API_PATH}?page=1`);
            // Extract data
            const anonymous = extractAnonymousData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetAnonymousData({anonymous, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAnonymousRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAnonymousRequestFailed({message}));
        }
    });
}

// Fetch next anonymous from API
export function* emitNextAnonymousFetch() {
    yield takeLatest(EMIT_NEXT_ANONYMOUS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextAnonymousRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ANONYMOUS_FLEETS_API_PATH}?page=${page}`);
            // Extract data
            const anonymous = extractAnonymousData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetNextAnonymousData({anonymous, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextAnonymousRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextAnonymousRequestFailed({message}));
            yield put(storeStopInfiniteScrollAnonymousData());
        }
    });
}

// Fleets new anonymous from API
export function* emitAddAnonymous() {
    yield takeLatest(EMIT_ADD_ANONYMOUS, function*({amount, managerSim, collectorSim}) {
        try {
            // Fire event for request
            yield put(storeAddAnonymousRequestInit());
            const data = {montant: amount, id_puce_to: collectorSim, id_puce_from: managerSim};
            const apiResponse = yield call(apiPostRequest, api.CREATE_ANONYMOUS_FLEET_API_PATH, data);
            // Extract data
            const anonymous = extractAnoData(
                apiResponse.data.puce_emetrice,
                apiResponse.data.puce_receptrice,
                apiResponse.data.utilisateur,
                apiResponse.data.flottage,
            );
            // Fire event to redux
            yield put(storeSetNewAnonymousData({anonymous, alsoInList: true}))
            // Fire event for request
            yield put(storeAddAnonymousRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddAnonymousRequestFailed({message}));
        }
    });
}

// Extract anonymous data
function extractAnoData(apiSimOutgoing, apiSimIncoming, apiUser, apiAnonymous) {
    let anonymous = {
        id: '', reference: '', amount: '', creation: '',
        note: '', remaining: '', status: '',

        user: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiSimOutgoing) {
        anonymous.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        anonymous.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiUser) {
        anonymous.user = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiAnonymous) {
        anonymous.actionLoader = false;
        anonymous.amount = apiAnonymous.montant;
        anonymous.id = apiAnonymous.id.toString();
        anonymous.creation = apiAnonymous.created_at;
    }
    return anonymous;
}

// Extract anonymous data
export function extractAnonymousData(apiAnonymous) {
    const anonymous = [];
    apiAnonymous.forEach(data => {
        anonymous.push(extractAnonymousData(
            data.puce_emetrice,
            data.puce_receptrice,
            data.utilisateur,
            data.flottage,
        ));
    });
    return anonymous;
}

// Combine to export all functions at once
export default function* sagaAnonymous() {
    yield all([
        fork(emitAddAnonymous),
        fork(emitAnonymousFetch),
        fork(emitNextAnonymousFetch),
    ]);
}
