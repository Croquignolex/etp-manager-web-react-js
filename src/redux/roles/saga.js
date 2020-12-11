import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import {apiGetRequest} from "../../helpers/functions";
import {storeSetDangerErrorData} from "../errors/actions";
import {EMIT_ROLES_FETCH, storeSetRolesData} from './actions'
import {AGENT, COLLECTOR, ROLES_API_PATH, ROLES_SCOPE} from "../../helpers/constants";
import {storeRequestInit, storeRequestFailed, storeRequestSucceed} from "../requests/actions";

// Fetch users roles from API
export function* emitRolesFetch() {
    yield takeLatest(EMIT_ROLES_FETCH, function*() {
        const scope = ROLES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, ROLES_API_PATH);
            const roles = extractRolesData(apiResponse.roles);
            // Fire event to redux
            yield put(storeSetRolesData({roles}));
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
function extractRolesData(apiRoles) {
    const roles = [];
    if(apiRoles) {
        apiRoles.forEach(data => {
            const {id, name} = data;
            (name !== AGENT && name !== COLLECTOR) && roles.push({id, name});
        });
    }
    return roles;
}

// Combine to export all functions at once
export default function* sagaRoles() {
    yield all([
        fork(emitRolesFetch)
    ]);
}