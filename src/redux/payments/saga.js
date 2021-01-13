import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {EMIT_PAYMENTS_FETCH, storeSetPaymentsData} from "./actions";
import {apiGetRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    storePaymentsRequestInit,
    storePaymentsRequestFailed,
    storePaymentsRequestSucceed
} from "../requests/payments/actions";


// Fetch payments from API
export function* emitPaymentsFetch() {
    yield takeLatest(EMIT_PAYMENTS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storePaymentsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.PAYMENTS_API_PATH}?page=1`);
            // Extract data
            const payments = extractPaymentsData(apiResponse.data.versements);
            // Fire event to redux
            yield put(storeSetPaymentsData({payments, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storePaymentsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storePaymentsRequestFailed({message}));
        }
    });
}


// Fleets new payment from API
/*export function* emitNewPayment() {
    yield takeLatest(EMIT_NEW_PAYMENT, function*({amount, collector, receipt}) {
        const scope = PAYMENT_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('id_donneur', collector);
            data.append('recu', receipt);
            data.append('montant', amount);
            const apiResponse = yield call(apiPostRequest, NEW_PAYMENT_API_PATH, data);
            const payments = extractPaymentsData(apiResponse.versements);
            // Fire event to redux
            yield put(storeSetPaymentsData({payments}));
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
}*/

// Extract payment data
function extractPaymentData(apiManager, apiCollector, apiPayment) {
    let payment = {
        id: '', reference: '', amount: '', creation: '', note: '', receipt: '',

        manager: {id: '', name: ''},
        collector: {id: '', name: ''},
    };
    if(apiManager) {
        payment.manager = {
            name: apiManager.name,
            id: apiManager.id.toString()
        };
    }
    if(apiCollector) {
        payment.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString()
        };
    }
    if(apiPayment) {
        payment.actionLoader = false;
        payment.note = apiPayment.note;
        payment.amount = apiPayment.montant;
        payment.id = apiPayment.id.toString();
        payment.creation = apiPayment.created_at;
        payment.reference = apiPayment.reference;
        payment.receipt = getFileFromServer(apiPayment.recu);
    }
    return payment;
}

// Extract payments data
export function extractPaymentsData(apiPayments) {
    const payments = [];
    apiPayments.forEach(data => {
        payments.push(extractPaymentData(
            data.gestionnaire,
            data.recouvreur,
            data.versement,
        ));
    });
    return payments;
}

// Combine to export all functions at once
export default function* sagaPayments() {
    yield all([
        // fork(emitNewPayment),
        fork(emitPaymentsFetch),
    ]);
}
