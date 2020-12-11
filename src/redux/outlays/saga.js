import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {getFileFromServer} from "../agents/saga";
import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {EMIT_NEW_OUTLAY, EMIT_OUTLAYS_FETCH, storeSetOutlaysData} from "./actions";
import {apiGetRequest, apiPostRequest, sortByCreationDate} from "../../helpers/functions";
import {storeRequestFailed, storeRequestInit, storeRequestSucceed} from "../requests/actions";
import {
    OUTLAYS_SCOPE,
    OUTLAY_NEW_SCOPE,
    OUTLAYS_API_PATH,
    NEW_OUTLAY_API_PATH,
} from "../../helpers/constants";

// Fetch outlayss from API
export function* emitOutlaysFetch() {
    yield takeLatest(EMIT_OUTLAYS_FETCH, function*() {
        const scope = OUTLAYS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, OUTLAYS_API_PATH);
            const outlays = extractOutlaysData(apiResponse.versements);
            // Fire event to redux
            yield put(storeSetOutlaysData({outlays}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fleets new outlays from API
export function* emitNewOutlay() {
    yield takeLatest(EMIT_NEW_OUTLAY, function*({amount, collector, receipt}) {
        const scope = OUTLAY_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('id_receveur', collector);
            data.append('recu', receipt);
            data.append('montant', amount);
            const apiResponse = yield call(apiPostRequest, NEW_OUTLAY_API_PATH, data);
            const outlays = extractOutlaysData(apiResponse.versements);
            // Fire event to redux
            yield put(storeSetOutlaysData({outlays}));
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Versement éffectué avec succès`
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

// Extract outlays data
function extractOutlayData(apiManager, apiCollector, apiOutlay) {
    let outlays = {
        id: '', reference: '', amount: '', creation: '', note: '', receipt: '',

        manager: {id: '', name: ''},
        collector: {id: '', name: ''},
    };
    if(apiManager) {
        outlays.manager = {
            name: apiManager.name,
            id: apiManager.id.toString()
        };
    }
    if(apiCollector) {
        outlays.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString()
        };
    }
    if(apiOutlay) {
        outlays.actionLoader = false;
        outlays.note = apiOutlay.note;
        outlays.amount = apiOutlay.montant;
        outlays.id = apiOutlay.id.toString();
        outlays.creation = apiOutlay.created_at;
        outlays.reference = apiOutlay.reference;
        outlays.receipt = getFileFromServer(apiOutlay.recu);
    }
    return outlays;
}

// Extract outlays data
export function extractOutlaysData(apiOutlays) {
    const outlays = [];
    apiOutlays.forEach(data => {
        outlays.push(extractOutlayData(
            data.gestionnaire,
            data.recouvreur,
            data.versement,
        ));
    });
    sortByCreationDate(outlays);
    return outlays;
}

// Combine to export all functions at once
export default function* sagaOutlays() {
    yield all([
        fork(emitNewOutlay),
        fork(emitOutlaysFetch),
    ]);
}
