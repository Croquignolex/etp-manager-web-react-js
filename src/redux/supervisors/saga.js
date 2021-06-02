import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {storeSetSupervisorsData, EMIT_ALL_SUPERVISORS_FETCH} from "./actions";
import {
    storeAllSupervisorsRequestInit,
    storeAllSupervisorsRequestFailed,
    storeAllSupervisorsRequestSucceed,
} from "../requests/supervisors/actions";

// Fetch all supervisors from API
export function* emitAllSupervisorsFetch() {
    yield takeLatest(EMIT_ALL_SUPERVISORS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllSupervisorsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_SUPERVISORS_API_PATH);
            // Extract data
            const supervisors = extractSupervisorsData(apiResponse.data.superviseurs);
            // Fire event to redux
            yield put(storeSetSupervisorsData({supervisors, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllSupervisorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllSupervisorsRequestFailed({message}));
        }
    });
}

// Extract supervisor data
function extractSupervisorData(apiSupervisor) {
    let supervisor = {id: '', name: '', phone: ''};
    if(apiSupervisor) {
        supervisor.name = apiSupervisor.name;
        supervisor.phone = apiSupervisor.phone;
        supervisor.id = apiSupervisor.id.toString();
    }
    return supervisor;
}

// Extract supervisors data
function extractSupervisorsData(apiSupervisors) {
    const supervisors = [];
    if(apiSupervisors) {
        apiSupervisors.forEach(data => {
            supervisors.push(extractSupervisorData(data.superviseur));
        });
    }
    return supervisors;
}

// Combine to export all functions at once
export default function* sagaSupervisors() {
    yield all([
        fork(emitAllSupervisorsFetch)
    ]);
}