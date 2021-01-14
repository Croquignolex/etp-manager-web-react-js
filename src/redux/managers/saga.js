import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {EMIT_ALL_MANAGERS_FETCH, storeSetManagersData} from "./actions";
import {
    storeAllManagersRequestInit,
    storeAllManagersRequestFailed,
    storeAllManagersRequestSucceed
} from "../requests/managers/actions";

// Fetch all managers from API
export function* emitAllManagersFetch() {
    yield takeLatest(EMIT_ALL_MANAGERS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllManagersRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_MANAGERS_API_PATH);
            // Extract data
            const managers = extractManagersData(apiResponse.data.gestionnaires);
            // Fire event to redux
            yield put(storeSetManagersData({managers, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllManagersRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllManagersRequestFailed({message}));
        }
    });
}

// Extract manager data
function extractManagerData(apiManager) {
    let manager = {id: '', name: '', phone: ''};
    if(apiManager) {
        manager.name = apiManager.name;
        manager.phone = apiManager.phone;
        manager.id = apiManager.id.toString();
    }
    return manager;
}

// Extract managers data
function extractManagersData(apiManagers) {
    const managers = [];
    if(apiManagers) {
        apiManagers.forEach(data => {
            managers.push(extractManagerData(data.gestionnaire));
        });
    }
    return managers;
}

// Combine to export all functions at once
export default function* sagaManagers() {
    yield all([
        fork(emitAllManagersFetch),
    ]);
}