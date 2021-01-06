import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {APPROVE} from "../../constants/typeConstants";
import {EMIT_ALL_AGENTS_FETCH, storeSetAgentsData} from "./actions";
import {AGENT_SCOPE, PROFILE_SCOPE} from "../../constants/defaultConstants";
import {apiGetRequest, getFileFromServer, getImageFromServer} from "../../functions/axiosFunctions";
import {
    storeAllAgentsRequestInit,
    storeAllAgentsRequestFailed,
    storeAllAgentsRequestSucceed
} from "../requests/agents/actions";

// Fetch all agents from API
export function* emitAllAgentsFetch() {
    yield takeLatest(EMIT_ALL_AGENTS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllAgentsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_AGENTS_API_PATH);
            // Extract data
            const agents = extractAgentsData(apiResponse.data.agents);
            // Fire event to redux
            yield put(storeSetAgentsData({agents, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllAgentsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllAgentsRequestFailed({message}));
        }
    });
}

// Fetch agents from API
/*export function* emitAgentsFetch() {
    yield takeLatest(EMIT_AGENTS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAgentsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.AGENTS_API_PATH}?page=1`);
            // Extract data
            const agents = extractAgentsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetAgentsData({agents, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAgentsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAgentsRequestFailed({message}));
        }
    });
}*/

// Fetch next agents from API
/*export function* emitNextAgentsFetch() {
    yield takeLatest(EMIT_NEXT_AGENTS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextAgentsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.AGENTS_API_PATH}?page=${page}`);
            // Extract data
            const agents = extractAgentsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetNextAgentsData({agents, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextAgentsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextAgentsRequestFailed({message}));
            yield put(storeStopInfiniteScrollAgentData());
        }
    });
}*/

// Extract sim data
function extractAgentData(apiAgent, apiUser, apiZone, apiSims, apiAccount, apiCreator) {
    let agent = {
        id: '', name: '', address: '',
        salePoint: '', frontIDCard: '', backIDCard: '',
        description: '', phone: '', email: '', creation: '',
        avatar: '', status: '', reference: '', town: '', country: '',

        creator: {id: '', name: ''},
        account: {id: '', balance: ''},
        zone: {id: '', name: '', map: ''},
    };
    if(apiZone) {
        agent.zone = {
            map: apiZone.map,
            name: apiZone.nom,
            id: apiZone.id.toString()
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

// Extract agents data
function extractAgentsData(apiAgents) {
    const agents = [];
    if(apiAgents) {
        apiAgents.forEach(data => {
            agents.push(extractAgentData(
                data.agent,
                data.user,
                data.zone,
                data.puces,
                data.caisse,
                data.createur
            ));
        });
    }
    return agents;
}

// Combine to export all functions at once
export default function* sagaAgents() {
    yield all([
        // fork(emitAgentsFetch),
        fork(emitAllAgentsFetch),
        // fork(emitNextAgentsFetch),
    ]);
}