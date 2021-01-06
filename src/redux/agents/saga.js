import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";

// Fetch all agents from API
// export function* emitAllAgentsFetch() {
//     yield takeLatest(EMIT_ALL_AGENTS_FETCH, function*() {
//         try {
//             // Fire event for request
//             yield put(storeAllAgentsRequestInit());
//             const apiResponse = yield call(apiGetRequest, api.All_AGENTS_API_PATH);
//             // Extract data
//             const agents = extractAgentsData(apiResponse.data.puces);
//             // Fire event to redux
//             yield put(storeSetAgentsData({agents, hasMoreData: false, page: 0}));
//             // Fire event for request
//             yield put(storeAllAgentsRequestSucceed({message: apiResponse.message}));
//         } catch (message) {
//             // Fire event for request
//             yield put(storeAllAgentsRequestFailed({message}));
//         }
//     });
// }

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
function extractAgentData(apiAgent, apiType, apiUser, apiCompany, apiOperator, apiCollector) {
    let sim = {
        id: '', name: '', reference: '', number: '', balance: '', description: '', creation: '',

        type: {id: '', name: ''},
        company: {id: '', name: ''},
        operator: {id: '', name: ''},
        collector: {id: '', name: ''},
        agent: {id: '', name: '', reference: ''}
    };
    if(apiAgent && apiUser) {
        sim.agent = {
            name: apiUser.name,
            id: apiUser.id.toString(),
            reference: apiAgent.reference
        };
    }
    if(apiCollector) {
        sim.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString(),
        };
    }
    if(apiCompany) {
        sim.company = {
            name: apiCompany.nom,
            id: apiCompany.id.toString()
        };
    }
    if(apiOperator) {
        sim.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString()
        };
    }
    if(apiType) {
        sim.type = {
            name: apiType.name,
            id: apiType.id.toString()
        };
    }
    if(apiAgent) {
        sim.name = apiAgent.nom;
        sim.actionLoader = false;
        sim.number = apiAgent.numero;
        sim.balance = apiAgent.solde;
        sim.id = apiAgent.id.toString();
        sim.creation = apiAgent.created_at;
        sim.reference = apiAgent.reference;
        sim.description = apiAgent.description;
    }
    return sim;
}

// Extract agents data
function extractAgentsData(apiAgents) {
    const agents = [];
    apiAgents.forEach(data => {
        agents.push(extractAgentData(
            data.puce,
            data.type,
            data.user,
            data.agent,
            data.corporate,
            data.flote,
            data.recouvreur
        ))
    });
    return agents;
}

// Combine to export all functions at once
export default function* sagaAgents() {
    yield all([
        /*fork(emitAgentsFetch),
        fork(emitAllAgentsFetch),
        fork(emitNextAgentsFetch),*/
    ]);
}