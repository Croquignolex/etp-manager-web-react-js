import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {EMIT_ALL_ZONES_FETCH, storeSetZonesData} from "./actions";
import {
    storeAllZonesRequestInit,
    storeAllZonesRequestFailed,
    storeAllZonesRequestSucceed
} from "../requests/zones/actions";

// Fetch all zones from API
export function* emitAllZonesFetch() {
    yield takeLatest(EMIT_ALL_ZONES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllZonesRequestInit());
            const apiResponse = yield call(apiGetRequest, api.All_ZONES_API_PATH);
            // Extract data
            const zones = extractZonesData(apiResponse.data.zones);
            // Fire event to redux
            yield put(storeSetZonesData({zones, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllZonesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllZonesRequestFailed({message}));
        }
    });
}

// Extract zone data
function extractZoneData(apiZone) {
    let zone = {id: '', name: '', reference: ''};
    if(apiZone) {
        zone.name = apiZone.nom;
        zone.id = apiZone.id.toString();
        zone.reference = apiZone.reference;
    }
    return zone;
}

// Extract zones data
function extractZonesData(apiZones) {
    const zones = [];
    if(apiZones) {
        apiZones.forEach(data => {
            zones.push(extractZoneData(data.zone));
        });
    }
    return zones;
}

// Combine to export all functions at once
export default function* sagaZones() {
    yield all([
        fork(emitAllZonesFetch),
    ]);
}