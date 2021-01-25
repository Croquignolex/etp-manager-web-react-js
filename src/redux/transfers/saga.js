import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_TRANSFER,
    EMIT_TRANSFERS_FETCH,
    storeSetTransfersData,
    storeSetNewTransferData,
    storeSetNextTransfersData,
    EMIT_NEXT_TRANSFERS_FETCH,
    storeStopInfiniteScrollTransferData
} from "./actions";
import {
    storeTransfersRequestInit,
    storeTransfersRequestFailed,
    storeAddTransferRequestInit,
    storeTransfersRequestSucceed,
    storeAddTransferRequestFailed,
    storeNextTransfersRequestInit,
    storeAddTransferRequestSucceed,
    storeNextTransfersRequestFailed,
    storeNextTransfersRequestSucceed
} from "../requests/transfers/actions";

// Fetch transfers from API
export function* emitTransfersFetch() {
    yield takeLatest(EMIT_TRANSFERS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeTransfersRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.TRANSFERS_API_PATH}?page=1`);
            // Extract data
            const transfers = extractTransfersData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetTransfersData({transfers, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeTransfersRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeTransfersRequestFailed({message}));
        }
    });
}

// Fetch next transfers from API
export function* emitNextTransfersFetch() {
    yield takeLatest(EMIT_NEXT_TRANSFERS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextTransfersRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.TRANSFERS_API_PATH}?page=${page}`);
            // Extract data
            const transfers = extractTransfersData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetNextTransfersData({transfers, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextTransfersRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextTransfersRequestFailed({message}));
            yield put(storeStopInfiniteScrollTransferData());
        }
    });
}

// Fleets new transfer from API
export function* emitAddTransfer() {
    yield takeLatest(EMIT_ADD_TRANSFER, function*({amount, collector, receipt}) {
        try {
            // Fire event for request
            yield put(storeAddTransferRequestInit());
            const data = new FormData();
            data.append('id_donneur', collector);
            data.append('recu', receipt);
            data.append('montant', amount);
            const apiResponse = yield call(apiPostRequest, api.TRANSFERS_API_PATH, data);
            // Extract data
            const transfer = extractTransferData(
                apiResponse.data.gestionnaire,
                apiResponse.data.recouvreur,
                apiResponse.data.versement
            );
            // Fire event to redux
            yield put(storeSetNewTransferData({transfer, alsoInList: true}))
            // Fire event for request
            yield put(storeAddTransferRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddTransferRequestFailed({message}));
        }
    });
}

// Extract transfer data
function extractTransferData(apiSimOutgoing, apiSimIncoming, apiUser, apiTransfer) {
    let transfer = {
        id: '', reference: '', amount: '', creation: '',
        note: '', remaining: '', status: '',

        user: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiSimOutgoing) {
        transfer.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiUser) {
        transfer.user = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiTransfer) {
        transfer.actionLoader = false;
        transfer.amount = apiTransfer.montant;
        transfer.id = apiTransfer.id.toString();
        transfer.creation = apiTransfer.created_at;
    }
    return transfer;
}

// Extract transfers data
export function extractTransfersData(apiTransfers) {
    const transfers = [];
    apiTransfers.forEach(data => {
        transfers.push(extractTransferData(
            data.puce_emetrice,
            data.puce_receptrice,
            data.utilisateur,
            data.flottage,
        ));
    });
    return transfers;
}

// Combine to export all functions at once
export default function* sagaTransfers() {
    yield all([
        fork(emitAddTransfer),
        fork(emitTransfersFetch),
        fork(emitNextTransfersFetch),
    ]);
}
