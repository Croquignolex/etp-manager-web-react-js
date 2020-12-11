import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import {apiGetRequest} from "../../helpers/functions";
import {storeSetDangerErrorData} from "../errors/actions";
import {EMIT_SIMS_TYPES_FETCH, storeSetSimsTypesData} from './actions'
import {
    storeRequestInit,
    storeRequestFailed,
    storeRequestSucceed
} from "../requests/actions";
import {
    AGENT_TYPE,
    ETP_AGENT_TYPE,
    CORPORATE_TYPE,
    COLLECTOR_TYPE,
    SIMS_TYPES_SCOPE,
    SIMS_TYPES_API_PATH
} from "../../helpers/constants";

// Fetch users roles from API
export function* emitSimsTypesFetch() {
    yield takeLatest(EMIT_SIMS_TYPES_FETCH, function*() {
        const scope = SIMS_TYPES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, SIMS_TYPES_API_PATH);
            const simsTypes = extractSimsTypesData(apiResponse.types);
            // Fire event to redux
            yield put(storeSetSimsTypesData({simsTypes}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract roles data
function extractSimsTypesData(apiSimsTypes) {
    const simsTypes = [];
    if(apiSimsTypes) {
        apiSimsTypes.forEach(data => {
            const {id, name} = data;
            const needCompany = (name === CORPORATE_TYPE);
            const needAgent = (name === AGENT_TYPE || name === ETP_AGENT_TYPE);
            const needCollector = (name === COLLECTOR_TYPE);
            simsTypes.push({
                id: id.toString(),
                name, needAgent, needCompany, needCollector
            });
        });
    }
    return simsTypes;
}

// Combine to export all functions at once
export default function* sagaSimsTypes() {
    yield all([
        fork(emitSimsTypesFetch)
    ]);
}
