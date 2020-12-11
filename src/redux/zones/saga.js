import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {
    storeRequestInit,
    storeRequestFailed,
    storeRequestSucceed
} from "../requests/actions";
import {
    apiGetRequest,
    apiPostRequest,
    getImageFromServer,
    sortByCreationDate
} from "../../helpers/functions";
import {
    EMIT_NEW_ZONE,
    EMIT_ZONE_FETCH,
    EMIT_ZONE_DELETE,
    EMIT_UPDATE_ZONE,
    EMIT_ZONES_FETCH,
    storeSetZoneData,
    storeSetZonesData,
    EMIT_ADD_ZONE_AGENTS,
    storeSetZoneActionData,
    EMIT_REMOVE_ZONE_AGENTS,
    EMIT_ADD_ZONE_COLLECTORS,
    EMIT_REMOVE_ZONE_COLLECTORS,
    storeSetZoneAgentsActionData,
    storeSetZoneCollectorsActionData,
} from './actions'
import {
    APPROVE,
    ZONE_SCOPE,
    ZONES_SCOPE,
    PROFILE_SCOPE,
    ZONE_NEW_SCOPE,
    ZONES_API_PATH,
    ZONE_EDIT_SCOPE,
    EDIT_ZONE_API_PATH,
    ZONES_AGENTS_SCOPE,
    CREATE_ZONE_API_PATH,
    DELETE_ZONE_API_PATH,
    ZONES_DETAILS_API_PATH,
    ZONES_COLLECTORS_SCOPE,
    ZONES_ADD_AGENTS_SCOPE,
    ZONE_ADD_AGENT_API_PATH,
    ZONES_ADD_COLLECTORS_SCOPE,
    ZONE_REMOVE_AGENT_API_PATH,
    ZONE_ADD_COLLECTOR_API_PATH,
    ZONE_REMOVE_COLLECTOR_API_PATH,
} from "../../helpers/constants";

// Fetch zones from API
export function* emitZonesFetch() {
    yield takeLatest(EMIT_ZONES_FETCH, function*() {
        const scope = ZONES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, ZONES_API_PATH);
            const zones = extractZonesData(apiResponse.zones);
            // Fire event to redux
            yield put(storeSetZonesData({zones}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch zone from API
export function* emitZoneFetch() {
    yield takeLatest(EMIT_ZONE_FETCH, function*({id}) {
        const scope = ZONE_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));

            const apiResponse = yield call(apiGetRequest, `${ZONES_DETAILS_API_PATH}/${id}`);
            const zone = extractZoneData(apiResponse.zone, apiResponse.agents, apiResponse.recouvreur);
            // Fire event to redux
            yield put(storeSetZoneData({zone}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New operator into API
export function* emitNewZone() {
    yield takeLatest(EMIT_NEW_ZONE, function*({name, map, reference, description}) {
        const scope = ZONE_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, CREATE_ZONE_API_PATH, {name, map, reference, description});
            const zone = extractZoneData(apiResponse.zone, apiResponse.agents, apiResponse.recouvreur);
            // Fire event to redux
            yield put(storeSetZoneData({zone}));
            // Fire event at redux for new zone toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Zone de recouvrement ajoutée avec succès`
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

// Update operator into API
export function* emitUpdateZone() {
    yield takeLatest(EMIT_UPDATE_ZONE, function*({id, name, map, reference, description}) {
        const scope = ZONE_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_ZONE_API_PATH}/${id}`, {name, map, reference, description});
            const zone = extractZoneData(apiResponse.zone, apiResponse.agents, apiResponse.recouvreur);
            // Fire event at redux for zone update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Zone de recouvrement mise à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetZoneData({zone}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Add zone agent into API
export function* emitAddZoneAgents() {
    yield takeLatest(EMIT_ADD_ZONE_AGENTS, function*({id, name, address, phone, reference, email,
                                                         town, country, password, description,
                                                         backIDCard, frontIDCard, document}) {
        const scope = ZONES_ADD_AGENTS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('name', name);
            data.append('ville', town);
            data.append('phone', phone);
            data.append('email', email);
            data.append('pays', country);
            data.append('adresse', address);
            data.append('password', password);
            data.append('document', document);
            data.append('reference', reference);
            data.append('description', description);
            frontIDCard && data.append('base_64_image', frontIDCard);
            backIDCard && data.append('base_64_image_back', backIDCard);
            const apiResponse = yield call(apiPostRequest, `${ZONE_ADD_AGENT_API_PATH}/${id}`, data);
            const zone = extractZoneData(apiResponse.zone, apiResponse.agents, apiResponse.recouvreur);
            // Fire event at redux for operator update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Agent ajouté à la zone avec succès`
            }));
            // Fire event to redux
            yield put(storeSetZoneData({zone}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Remove zone agents into API
export function* emitRemoveZoneAgents() {
    yield takeLatest(EMIT_REMOVE_ZONE_AGENTS, function*({id, agent}) {
        const scope = ZONES_AGENTS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetZoneAgentsActionData({agent}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${ZONE_REMOVE_AGENT_API_PATH}/${id}`, {id_agent: agent});
            const zone = extractZoneData(apiResponse.zone, apiResponse.agents, apiResponse.recouvreur);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Agent supprimé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetZoneData({zone}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetZoneAgentsActionData({agent}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Add zone collector into API
export function* emitAddZoneCollectors() {
    yield takeLatest(EMIT_ADD_ZONE_COLLECTORS, function*({id, name, address, phone,
                                                             email, password,  description}) {
        const scope = ZONES_ADD_COLLECTORS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${ZONE_ADD_COLLECTOR_API_PATH}/${id}`,
                {
                    name: name,
                    phone: phone,
                    email: email,
                    adresse: address,
                    password: password,
                    description: description,
                });
            const zone = extractZoneData(apiResponse.zone, apiResponse.agents, apiResponse.recouvreur);
            // Fire event at redux for operator update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Responsable de zone ajouté à la zone avec succès`
            }));
            // Fire event to redux
            yield put(storeSetZoneData({zone}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Remove zone collectors into API
export function* emitRemoveZoneCollectors() {
    yield takeLatest(EMIT_REMOVE_ZONE_COLLECTORS, function*({id, collector}) {
        const scope = ZONES_COLLECTORS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetZoneCollectorsActionData({collector}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${ZONE_REMOVE_COLLECTOR_API_PATH}/${id}`, {id_user: collector});
            const zone = extractZoneData(apiResponse.zone, apiResponse.agents, apiResponse.recouvreur);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Agent de recouvrement supprimé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetZoneData({zone}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetZoneCollectorsActionData({collector}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Delete operator from API
export function* emitZoneDelete() {
    yield takeLatest(EMIT_ZONE_DELETE, function*({id}) {
        const scope = ZONES_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetZoneActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${DELETE_ZONE_API_PATH}/${id}`);
            const zones = extractZonesData(apiResponse.zones);
            // Fire event to redux
            yield put(storeSetZonesData({zones}));
            // Fire event at redux for zone delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Zone de recouvrement supprimée avec succès`
            }));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetZoneActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract operator data
function extractZoneData(apiZone, apiAgents, apiCollector) {
    let zone = {
        id: '', name: '', reference: '', map: '', description: '', creation: '',

        agents: [],
        collector: {id: '', name: '', phone: ''},
    };
    if(apiAgents) {
        apiAgents.forEach(data => {
            const userData = data.user;
            const agentData = data.agent;
            zone.agents.push({
                actionLoader: false,
                name: userData.name,
                phone: userData.phone,
                town: agentData.ville,
                id: agentData.id.toString(),
                creation: userData.created_at,
                reference: agentData.reference,
                status: userData.statut === APPROVE,
                avatar: getImageFromServer(userData.avatar, PROFILE_SCOPE),
            })
        });
        sortByCreationDate(zone.agents);
    }
    if(apiCollector) {
        zone.collector = {
            name: apiCollector.name,
            phone: apiCollector.phone,
            id: apiCollector.id.toString()
        }
    }
    if(apiZone) {
        zone.map = apiZone.map;
        zone.name = apiZone.nom;
        zone.actionLoader = false;
        zone.id = apiZone.id.toString();
        zone.reference = apiZone.reference;
        zone.creation = apiZone.created_at;
        zone.description = apiZone.description;
    }
    return zone;
}

// Extract operators data
function extractZonesData(apiZones) {
    const zones = [];
    if(apiZones) {
        apiZones.forEach(data => {
            zones.push(extractZoneData(data.zone, data.agents, data.recouvreur));
        });
    }
    sortByCreationDate(zones);
    return zones;
}

// Combine to export all functions at once
export default function* sagaZones() {
    yield all([
        fork(emitNewZone),
        fork(emitZoneFetch),
        fork(emitUpdateZone),
        fork(emitZonesFetch),
        fork(emitZoneDelete),
        fork(emitAddZoneAgents),
        fork(emitRemoveZoneAgents),
        fork(emitAddZoneCollectors),
        fork(emitRemoveZoneCollectors),
    ]);
}
