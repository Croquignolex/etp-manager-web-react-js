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
    sortByCreationDate,
} from "../../helpers/functions";
import {
    EMIT_NEW_AGENT,
    EMIT_AGENT_FETCH,
    EMIT_AGENT_DELETE,
    EMIT_UPDATE_AGENT,
    EMIT_AGENTS_FETCH,
    storeSetAgentData,
    storeSetAgentsData,
    EMIT_ADD_AGENT_SIMS,
    EMIT_UPDATE_AGENT_CNI,
    EMIT_UPDATE_AGENT_ZONE,
    EMIT_UPDATE_AGENT_FILE,
    EMIT_REMOVE_AGENT_SIMS,
    storeSetAgentToggleData,
    storeSetAgentActionData,
    EMIT_TOGGLE_AGENT_STATUS,
    storeSetAgentSimsActionData,
} from './actions'
import {
    APPROVE,
    AGENT_SCOPE,
    AGENTS_SCOPE,
    PROFILE_SCOPE,
    AGENT_ADD_SIM,
    API_SERVER_URL,
    SIMS_LIST_SCOPE,
    AGENT_NEW_SCOPE,
    AGENTS_API_PATH,
    AGENT_REMOVE_SIM,
    AGENT_EDIT_SCOPE,
    EDIT_AGENT_API_PATH,
    USER_ZONE_EDIT_SCOPE,
    AGENT_ADD_SIMS_SCOPE,
    AGENT_CNI_EDIT_SCOPE,
    CREATE_AGENT_API_PATH,
    AGENT_FILE_EDIT_SCOPE,
    DELETE_AGENT_API_PATH,
    AGENTS_DETAILS_API_PATH,
    EDIT_AGENT_CNI_API_PATH,
    EDIT_AGENT_FILE_API_PATH,
    EDIT_STATUS_AGENT_API_PATH,
    AGENT_ZONE_UPDATE_API_PATH,
} from "../../helpers/constants";

// Fetch agents from API
export function* emitAgentsFetch() {
    yield takeLatest(EMIT_AGENTS_FETCH, function*() {
        const scope = AGENTS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, AGENTS_API_PATH);
            const agents = extractAgentsData(apiResponse.agents);
            // Fire event to redux
            yield put(storeSetAgentsData({agents}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch agent from API
export function* emitAgentFetch() {
    yield takeLatest(EMIT_AGENT_FETCH, function*({id}) {
        const scope = AGENT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${AGENTS_DETAILS_API_PATH}/${id}`);
             const agent = extractAgentData(apiResponse.agent, apiResponse.user, apiResponse.zone, apiResponse.puces, apiResponse.caisse);
            // Fire event to redux
            yield put(storeSetAgentData({agent}));
            // Fire event to redux
            yield put(storeSetAgentData({agent}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New agent into API
export function* emitNewAgent() {
    yield takeLatest(EMIT_NEW_AGENT, function*({name, address, phone, zone, reference,
                                                   town, country, email, password,  description,
                                                   frontIDCard, backIDCard, document}) {
        const scope = AGENT_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('name', name);
            data.append('ville', town);
            data.append('phone', phone);
            data.append('email', email);
            data.append('pays', country);
            data.append('id_zone', zone);
            data.append('adresse', address);
            data.append('document', document);
            data.append('password', password);
            data.append('reference', reference);
            data.append('description', description);
            data.append('base_64_image', frontIDCard);
            data.append('base_64_image_back', backIDCard);
            yield call(apiPostRequest, CREATE_AGENT_API_PATH, data);
            // Fire event at redux for new agent toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Agent ajouté avec succès`
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

// // Update agent into API
export function* emitUpdateAgent() {
    yield takeLatest(EMIT_UPDATE_AGENT, function*({id, town, country, reference,
                                                      name, address, description, email}) {
        const scope = AGENT_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_AGENT_API_PATH}/${id}`,
                {
                    name,
                    email,
                    reference,
                    ville: town,
                    description,
                    pays: country,
                    adresse: address
                });
            const agent = extractAgentData(apiResponse.agent, apiResponse.user, apiResponse.zone, apiResponse.puces, apiResponse.caisse);
            // Fire event at redux for agent update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Agent mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetAgentData({agent}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Add agent sims into API
export function* emitAddAgentSims() {
    yield takeLatest(EMIT_ADD_AGENT_SIMS, function*({id, simType, name, reference,
                                                        number, description, operator}) {
        const scope = AGENT_ADD_SIMS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${AGENT_ADD_SIM}/${id}`,
                {
                    reference,
                    nom: name,
                    description,
                    type: simType,
                    numero: number,
                    id_flotte: operator,
                });
            const agent = extractAgentData(apiResponse.agent, apiResponse.user, apiResponse.zone, apiResponse.puces, apiResponse.caisse);
            // Fire event at redux for operator update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce commerciale ajoutée à l'agent avec succès`
            }));
            // Fire event to redux
            yield put(storeSetAgentData({agent}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Remove agent sims into API
export function* emitRemoveAgentSims() {
    yield takeLatest(EMIT_REMOVE_AGENT_SIMS, function*({id, sim}) {
        const scope = SIMS_LIST_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetAgentSimsActionData({sim}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${AGENT_REMOVE_SIM}/${id}`, {id_puce: sim});
            const agent = extractAgentData(apiResponse.agent, apiResponse.user, apiResponse.zone, apiResponse.puces, apiResponse.caisse);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce commerciale supprimée avec succès`
            }));
            // Fire event to redux
            yield put(storeSetAgentData({agent}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetAgentSimsActionData({sim}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update collector role into API
export function* emitUpdateAgentZone() {
    yield takeLatest(EMIT_UPDATE_AGENT_ZONE, function*({id, zone}) {
        const scope = USER_ZONE_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${AGENT_ZONE_UPDATE_API_PATH}/${id}`, {id_zone: zone});
            const agent = extractAgentData(apiResponse.agent, apiResponse.user, apiResponse.zone, apiResponse.puces, apiResponse.caisse);
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Zone de l'agent mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetAgentData({agent}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update agent CNI into API
export function* emitUpdateAgentCNI() {
    yield takeLatest(EMIT_UPDATE_AGENT_CNI, function*({id, frontIDCard, backIDCard}) {
        const scope = AGENT_CNI_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('base_64_image', frontIDCard);
            data.append('base_64_image_back', backIDCard);
            const apiResponse = yield call(apiPostRequest, `${EDIT_AGENT_CNI_API_PATH}/${id}`, data);
            const agent = extractAgentData(apiResponse.agent, apiResponse.user, apiResponse.zone, apiResponse.puces, apiResponse.caisse);
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `CNI de l'agent mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetAgentData({agent}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update agent file into API
export function* emitUpdateAgentFile() {
    yield takeLatest(EMIT_UPDATE_AGENT_FILE, function*({id, document}) {
        const scope = AGENT_FILE_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('document', document);
            const apiResponse = yield call(apiPostRequest, `${EDIT_AGENT_FILE_API_PATH}/${id}`, data);
            const agent = extractAgentData(apiResponse.agent, apiResponse.user, apiResponse.zone, apiResponse.puces, apiResponse.caisse);
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Document de l'agent mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetAgentData({agent}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Toggle agent status into API
export function* emitToggleAgentStatus() {
    yield takeLatest(EMIT_TOGGLE_AGENT_STATUS, function*({id}) {
        const scope = AGENTS_SCOPE;
        try {
            // Fire event for request
            yield put(storeSetAgentToggleData({id}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_STATUS_AGENT_API_PATH}/${id}`);
            const agents = extractAgentsData(apiResponse.agents);
            // Fire event at redux for new collector toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Status de l'agent changé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetAgentsData({agents}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetAgentToggleData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// // Delete agent from API
export function* emitAgentDelete() {
    yield takeLatest(EMIT_AGENT_DELETE, function*({id}) {
        const scope = AGENTS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetAgentActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${DELETE_AGENT_API_PATH}/${id}`);
            const agents = extractAgentsData(apiResponse.agents);
            // Fire event at redux for agent delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Agent supprimé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetAgentsData({agents}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetAgentActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract agent data
function extractAgentData(apiAgent, apiUser, apiZone, apiSims, apiAccount, apiCreator) {
    let agent = {
        id: '', name: '', address: '',
        salePoint: '', frontIDCard: '', backIDCard: '',
        description: '', phone: '', email: '', creation: '',
        avatar: '', status: '', reference: '', town: '', country: '',

        role: {id: '', name: ''},
        creator: {id: '', name: ''},
        account: {id: '', balance: ''},
        zone: {id: '', name: '', reference: '', map: ''},

        sims: [],
    };
    if(apiSims) {
        apiSims.forEach(data => {
            agent.sims.push({
                name: data.nom,
                number: data.numero,
                actionLoader: false,
                balance: data.solde,
                id: data.id.toString(),
                reference: data.reference,
                creation: data.created_at
            })
        });
        sortByCreationDate(agent.sims);
    }
    if(apiZone) {
        agent.zone = {
            map: apiZone.map,
            name: apiZone.nom,
            id: apiZone.id.toString(),
            reference: apiZone.reference,
        }
    }
    if(apiAccount) {
        agent.account = {
            balance: apiAccount.solde,
            id: apiAccount.id.toString(),
        }
    }
    if(apiCreator) {
        agent.creator = {
            name: apiCreator.name,
            id: apiCreator.id.toString(),
        }
    }
    if(apiAgent && apiUser) {
        agent.name = apiUser.name;
        agent.actionLoader = false;
        agent.toggleLoader = false;
        agent.phone = apiUser.phone;
        agent.email = apiUser.email;
        agent.town = apiAgent.ville;
        agent.country = apiAgent.pays;
        agent.address = apiUser.adresse;
        agent.id = apiAgent.id.toString();
        agent.creation = apiUser.created_at;
        agent.reference = apiAgent.reference;
        agent.description = apiUser.description;
        agent.status = apiUser.statut === APPROVE;
        agent.document = getFileFromServer(apiAgent.dossier);
        agent.avatar = getImageFromServer(apiUser.avatar, PROFILE_SCOPE);
        agent.frontIDCard = getImageFromServer(apiAgent.img_cni, AGENT_SCOPE);
        agent.backIDCard = getImageFromServer(apiAgent.img_cni_back, AGENT_SCOPE);
    }
    return agent;
}

export function getFileFromServer(file) {
    return (file === null)
        ? false
        : `${API_SERVER_URL}/storage/${file}`;
}

// Extract agents data
function extractAgentsData(apiAgents) {
    const agents = [];
    if(apiAgents) {
        apiAgents.forEach(data => {
            agents.push(extractAgentData(data.agent, data.user, data.zone, data.puces, data.caisse, data.createur));
        });
    }
    sortByCreationDate(agents);
    return agents;
}

// Combine to export all functions at once
export default function* sagaAgents() {
    yield all([
        fork(emitNewAgent),
        fork(emitAgentFetch),
        fork(emitUpdateAgent),
        fork(emitAgentsFetch),
        fork(emitAgentDelete),
        fork(emitAddAgentSims),
        fork(emitUpdateAgentCNI),
        fork(emitUpdateAgentFile),
        fork(emitRemoveAgentSims),
        fork(emitUpdateAgentZone),
        fork(emitToggleAgentStatus),
    ]);
}
