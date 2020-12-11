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
    EMIT_NEW_COLLECTOR,
    EMIT_COLLECTOR_FETCH,
    storeSetCollectorData,
    EMIT_COLLECTOR_DELETE,
    EMIT_UPDATE_COLLECTOR,
    EMIT_COLLECTORS_FETCH,
    storeSetCollectorsData,
    EMIT_ADD_COLLECTOR_SIMS,
    EMIT_UPDATE_COLLECTOR_ZONE,
    EMIT_REMOVE_COLLECTOR_SIMS,
    storeSetCollectorActionData,
    storeSetCollectorToggleData,
    EMIT_TOGGLE_COLLECTOR_STATUS,
    storeSetCollectorSimsActionData,
} from './actions'
import {
    APPROVE,
    COLLECTOR,
    PROFILE_SCOPE,
    USERS_API_PATH,
    COLLECTOR_SCOPE,
    SIMS_LIST_SCOPE,
    COLLECTORS_SCOPE,
    COLLECTOR_ADD_SIM,
    EDIT_USER_API_PATH,
    COLLECTOR_NEW_SCOPE,
    COLLECTOR_EDIT_SCOPE,
    DELETE_USER_API_PATH,
    USER_ZONE_EDIT_SCOPE,
    COLLECTOR_REMOVE_SIM,
    USERS_DETAILS_API_PATH,
    COLLECTOR_ADD_SIMS_SCOPE,
    EDIT_STATUS_USER_API_PATH,
    CREATE_COLLECTOR_API_PATH,
    USER_ZONE_UPDATE_API_PATH,
} from "../../helpers/constants";

// Fetch collectors from API
export function* emitCollectorsFetch() {
    yield takeLatest(EMIT_COLLECTORS_FETCH, function*() {
        const scope = COLLECTORS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, USERS_API_PATH);
            const collectors = extractCollectorsData(apiResponse.users);
            // Fire event to redux
            yield put(storeSetCollectorsData({collectors}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch collector from API
export function* emitCollectorFetch() {
    yield takeLatest(EMIT_COLLECTOR_FETCH, function*({id}) {
        const scope = COLLECTOR_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${USERS_DETAILS_API_PATH}/${id}`);
            const collector = extractCollectorData(apiResponse.user, apiResponse.zone, apiResponse.caisse, apiResponse.puces);
            // Fire event to redux
            yield put(storeSetCollectorData({collector}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New collector into API
export function* emitNewCollector() {
    yield takeLatest(EMIT_NEW_COLLECTOR, function*({name, post, address, phone,
                                                  email, zone, password, description}) {
        const scope = COLLECTOR_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            yield call(apiPostRequest, CREATE_COLLECTOR_API_PATH,
                {
                    name,
                    phone,
                    email,
                    password,
                    poste: post,
                    description,
                    id_zone: zone,
                    adresse: address,
                });
            // Fire event at redux for new collector toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Responsable de zone ajouté avec succès`
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

// Update collector into API
export function* emitUpdateCollector() {
    yield takeLatest(EMIT_UPDATE_COLLECTOR, function*({id, name, address,
                                                          email, description}) {
        const scope = COLLECTOR_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_USER_API_PATH}/${id}`,
                {
                    name,
                    email,
                    description,
                    adresse: address,
                });
            const collector = extractCollectorData(apiResponse.user, apiResponse.zone, apiResponse.caisse, apiResponse.puces);
            // Fire event at redux for collector update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Responsable de zone mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCollectorData({collector}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Add collector sims into API
export function* emitAddCollectorSims() {
    yield takeLatest(EMIT_ADD_COLLECTOR_SIMS, function*({id, name, reference, number, description, operator}) {
        const scope = COLLECTOR_ADD_SIMS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${COLLECTOR_ADD_SIM}/${id}`,
                {
                    reference,
                    nom: name,
                    description,
                    numero: number,
                    id_flotte: operator,
                });
            const collector = extractCollectorData(apiResponse.user, apiResponse.zone, apiResponse.caisse, apiResponse.puces);
            // Fire event at redux for operator update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce de responsable ajoutée au responsable de zone`
            }));
            // Fire event to redux
            yield put(storeSetCollectorData({collector}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Remove collector sims into API
export function* emitRemoveCollectorSims() {
    yield takeLatest(EMIT_REMOVE_COLLECTOR_SIMS, function*({id, sim}) {
        const scope = SIMS_LIST_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetCollectorSimsActionData({sim}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${COLLECTOR_REMOVE_SIM}/${id}`, {id_puce: sim});
            const collector = extractCollectorData(apiResponse.user, apiResponse.zone, apiResponse.caisse, apiResponse.puces);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce de responsable supprimée avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCollectorData({collector}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetCollectorSimsActionData({sim}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update collector role into API
export function* emitUpdateCollectorZone() {
    yield takeLatest(EMIT_UPDATE_COLLECTOR_ZONE, function*({id, zone}) {
        const scope = USER_ZONE_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${USER_ZONE_UPDATE_API_PATH}/${id}`, {id_zone: zone});
            const collector = extractCollectorData(apiResponse.user, apiResponse.zone, apiResponse.caisse, apiResponse.puces);
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Zone du responsable de zone mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCollectorData({collector}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Toggle collector status into API
export function* emitToggleCollectorStatus() {
    yield takeLatest(EMIT_TOGGLE_COLLECTOR_STATUS, function*({id}) {
        const scope = COLLECTORS_SCOPE;
        try {
            // Fire event for request
            yield put(storeSetCollectorToggleData({id}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_STATUS_USER_API_PATH}/${id}`);
            const collectors = extractCollectorsData(apiResponse.users);
            // Fire event at redux for new collector toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Status du responsable de zone changé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCollectorsData({collectors}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetCollectorToggleData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Delete collector from API
export function* emitCollectorDelete() {
    yield takeLatest(EMIT_COLLECTOR_DELETE, function*({id}) {
        const scope = COLLECTORS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetCollectorActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${DELETE_USER_API_PATH}/${id}`);
            const collectors = extractCollectorsData(apiResponse.users);
            // Fire event at redux for collector delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Responsable de zone supprimé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCollectorsData({collectors}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetCollectorActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract collector data
function extractCollectorData(apiCollector, apiZone, apiAccount, apiSims) {
    let collector = {
        id: '', name: '', phone: '', email: '', avatar: '', address: '', creation: '', description: '',

        account: {id: '', balance: ''},
        role: {id: '', name: COLLECTOR},
        zone: {id: '', name: '', reference: '', map: ''},

        sims: [],
    };
    if(apiSims) {
        apiSims.forEach(data => {
            collector.sims.push({
                name: data.nom,
                number: data.numero,
                actionLoader: false,
                balance: data.solde,
                id: data.id.toString(),
                reference: data.reference,
                creation: data.created_at
            })
        });
        sortByCreationDate(collector.sims);
    }
    if(apiZone) {
        collector.zone = {
            map: apiZone.map,
            name: apiZone.nom,
            id: apiZone.id.toString(),
            reference: apiZone.reference,
        }
    }
    if(apiAccount) {
        collector.account = {
            balance: apiAccount.solde,
            id: apiAccount.id.toString(),
        }
    }
    if(apiCollector) {
        collector.actionLoader = false;
        collector.toggleLoader = false;
        collector.name = apiCollector.name;
        collector.phone = apiCollector.phone;
        collector.email = apiCollector.email;
        collector.address = apiCollector.adresse;
        collector.id = apiCollector.id.toString();
        collector.creation = apiCollector.created_at;
        collector.description = apiCollector.description;
        collector.status = apiCollector.statut === APPROVE;
        collector.avatar = getImageFromServer(apiCollector.avatar, PROFILE_SCOPE);
    }
    return collector;
}

// Extract collectors data
function extractCollectorsData(apiCollectors) {
    const collectors = [];
    if(apiCollectors) {
        apiCollectors.forEach(data => {
            const {name} = data.role;
            (name === COLLECTOR)
            && collectors.push(extractCollectorData(data.user, data.zone, data.caisse, data.puces));
        });
    }
    sortByCreationDate(collectors);
    return collectors;
}

// Combine to export all functions at once
export default function* sagaCollector() {
    yield all([
        fork(emitNewCollector),
        fork(emitCollectorFetch),
        fork(emitCollectorDelete),
        fork(emitCollectorsFetch),
        fork(emitUpdateCollector),
        fork(emitAddCollectorSims),
        fork(emitRemoveCollectorSims),
        fork(emitUpdateCollectorZone),
        fork(emitToggleCollectorStatus),
    ]);
}