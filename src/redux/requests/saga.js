import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {storeListingResponse} from './actions'
import {storeSetInfoToastData} from "../toast/actions";
import {apiPostRequest} from "../../helpers/functions";
import {storeSetDangerErrorData} from "../errors/actions";
import {LISTING_SCOPE, COMPARE_LISTING_API_PATH} from "../../helpers/constants";
import {EMIT_COMPARE_LISTING, storeRequestFailed, storeRequestInit, storeRequestSucceed} from "./actions";

// Compare listing
export function* emitCompareListing() {
    yield takeLatest(EMIT_COMPARE_LISTING, function*({document, sim}) {
        const scope = LISTING_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('id_puce', sim);
            data.append('entete', 1);
            data.append('fichier', document);
            const apiResponse = yield call(apiPostRequest, `${COMPARE_LISTING_API_PATH}`, data);
            const response = {
                message: apiResponse.rapport,
                severity: apiResponse.severite,
                importedLines: apiResponse.lignes_importes,
                importedBalance: apiResponse.solde_importe,
                internalLines: apiResponse.lignes_applications,
                internalBalance: apiResponse.solde_applications,
            };
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Listing inporté avec succès`
            }));
            // Fire event to redux
            yield put(storeListingResponse({response}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Combine to export all functions at once
export default function* sagaRequests() {
    yield all([
        fork(emitCompareListing),
    ]);
}
