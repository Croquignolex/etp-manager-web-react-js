import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {EMIT_ALL_OPERATORS_FETCH, storeSetOperatorsData} from "./actions";
import {
    storeAllOperatorsRequestInit,
    storeAllOperatorsRequestFailed,
    storeAllOperatorsRequestSucceed
} from "../requests/operators/actions";

// Fetch all operators from API
export function* emitAllOperatorsFetch() {
    yield takeLatest(EMIT_ALL_OPERATORS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllOperatorsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.All_OPERATORS_API_PATH);
            // Extract data
            const operators = extractOperatorsData(apiResponse.data.flotes);
            // Fire event to redux
            yield put(storeSetOperatorsData({operators, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllOperatorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllOperatorsRequestFailed({message}));
        }
    });
}

// Extract zone data
function extractOperatorData(apiOperator) {
    let operator = {
        id: '', name: '', description: '', creation: '',
    };
    if(apiOperator) {
        operator.actionLoader = false;
        operator.name = apiOperator.nom;
        operator.id = apiOperator.id.toString();
        operator.creation = apiOperator.created_at;
        operator.description = apiOperator.description;
    }
    return operator;
}

// Extract zones data
function extractOperatorsData(apiOperators) {
    const operators = [];
    if(apiOperators) {
        apiOperators.forEach(data => {
            operators.push(extractOperatorData(data.flote));
        });
    }
    return operators;
}

// Combine to export all functions at once
export default function* sagaZones() {
    yield all([
        fork(emitAllOperatorsFetch),
    ]);
}