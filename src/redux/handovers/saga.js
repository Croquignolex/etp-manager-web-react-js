import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {EMIT_HANDOVERS_FETCH, EMIT_NEW_HANDOVER, storeSetHandoversData,} from "./actions";
import {apiGetRequest, apiPostRequest, sortByCreationDate} from "../../helpers/functions";
import {storeRequestFailed, storeRequestInit, storeRequestSucceed} from "../requests/actions";
import {
    HANDOVERS_SCOPE,
    HANDOVERS_API_PATH,
     HANDOVER_NEW_SCOPE,
    NEW_HANDOVER_API_PATH,
} from "../../helpers/constants";

// Fetch handovers from API
export function* emitHandoversFetch() {
    yield takeLatest(EMIT_HANDOVERS_FETCH, function*() {
        const scope = HANDOVERS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, HANDOVERS_API_PATH);
            const handovers = extractHandoversData(apiResponse.versements);
            // Fire event to redux
            yield put(storeSetHandoversData({handovers}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fleets new handover from API
export function* emitNewHandover() {
    yield takeLatest(EMIT_NEW_HANDOVER, function*({amount, manager}) {
        const scope = HANDOVER_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, NEW_HANDOVER_API_PATH,
                {
                    id_receveur: manager,
                    montant: amount,
                });
            const handovers = extractHandoversData(apiResponse.versements);
            // Fire event to redux
            yield put(storeSetHandoversData({handovers}));
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Passation de service éffectuée avec succès`
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

// Extract handover data
function extractHandoverData(apiSender, apiReceiver, apiHandover) {
    let handover = {
        id: '', reference: '', amount: '', creation: '', note: '',

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
        handover.note = apiHandover.note;
        handover.amount = apiHandover.montant;
        handover.id = apiHandover.id.toString();
        handover.creation = apiHandover.created_at;
        handover.reference = apiHandover.reference;
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
    sortByCreationDate(handovers);
    return handovers;
}

// Combine to export all functions at once
export default function* sagaHandovers() {
    yield all([
        fork(emitNewHandover),
        fork(emitHandoversFetch),
    ]);
}
