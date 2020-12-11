import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {apiGetRequest, apiPostRequest, sortByCreationDate} from "../../helpers/functions";
import {
    storeRequestInit,
    storeRequestFailed,
    storeRequestSucceed
} from "../requests/actions";
import {
    EMIT_NEW_SIM,
    EMIT_SIM_FETCH,
    EMIT_SIM_DELETE,
    EMIT_SIMS_FETCH,
    EMIT_UPDATE_SIM,
    storeSetSimData,
    storeSetSimsData,
    EMIT_UPDATE_SIM_AGENT,
    storeSetSimActionData,
    EMIT_UPDATE_SIM_OPERATOR,
    EMIT_UPDATE_COMPANY_AGENT
} from './actions'
import {
    SIM_SCOPE,
    SIMS_SCOPE,
    SIM_NEW_SCOPE,
    SIMS_API_PATH,
    SIM_EDIT_SCOPE,
    EDIT_SIM_API_PATH,
    CREATE_SIM_API_PATH,
    DELETE_SIM_API_PATH,
    SIM_AGENT_EDIT_SCOPE,
    SIMS_DETAILS_API_PATH,
    SIM_COMPANY_EDIT_SCOPE,
    SIM_OPERATOR_EDIT_SCOPE,
    EDIT_SIM_AGENT_API_PATH,
    EDIT_SIM_OPERATOR_API_PATH,
    EDIT_COMPANY_AGENT_API_PATH,
} from "../../helpers/constants";

// Fetch sims from API
export function* emitSimsFetch() {
    yield takeLatest(EMIT_SIMS_FETCH, function*() {
        const scope = SIMS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, SIMS_API_PATH);
            const sims = extractSimsData(apiResponse.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch sim from API
export function* emitSimFetch() {
    yield takeLatest(EMIT_SIM_FETCH, function*({id}) {
        const scope = SIM_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${SIMS_DETAILS_API_PATH}/${id}`);
            const sim = extractSimData(
                apiResponse.puce,
                apiResponse.type,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.corporate,
                apiResponse.flote,
                apiResponse.recouvreur,
            );
            // Fire event to redux
            yield put(storeSetSimData({sim}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New sim into API
export function* emitNewSim() {
    yield takeLatest(EMIT_NEW_SIM, function*({name, number, operator, agent, collector,
                                                 reference, description, simType, company}) {
        const scope = SIM_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            yield call(apiPostRequest, CREATE_SIM_API_PATH,
            {
                reference,
                nom: name,
                description,
                type: simType,
                numero: number,
                id_agent: agent,
                id_flotte: operator,
                id_corporate: company,
                id_recouvreur: collector,
            });
            // Fire event at redux for new sim toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce commerciale ajoutée avec succès`
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

// Update sim into API
export function* emitUpdateSim() {
    yield takeLatest(EMIT_UPDATE_SIM, function*({id, name, reference, description}) {
        const scope = SIM_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_SIM_API_PATH}/${id}`,
            {
                reference,
                nom: name,
                description
            });
            const sim = extractSimData(
                apiResponse.puce,
                apiResponse.type,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.corporate,
                apiResponse.flote,
                apiResponse.recouvreur,
            );
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce commerciale mise à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetSimData({sim}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update sim operator into API
export function* emitUpdateSimOperator() {
    yield takeLatest(EMIT_UPDATE_SIM_OPERATOR, function*({id, operator}) {
        const scope = SIM_OPERATOR_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_SIM_OPERATOR_API_PATH}/${id}`, {id_flotte: operator});
            const sim = extractSimData(
                apiResponse.puce,
                apiResponse.type,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.corporate,
                apiResponse.flote,
                apiResponse.recouvreur,
            );
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Opérateur de la puce commerciale mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetSimData({sim}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update sim agent into API
export function* emitUpdateSimAgent() {
    yield takeLatest(EMIT_UPDATE_SIM_AGENT, function*({id, agent}) {
        const scope = SIM_AGENT_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_SIM_AGENT_API_PATH}/${id}`, {id_agent: agent});
            const sim = extractSimData(
                apiResponse.puce,
                apiResponse.type,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.corporate,
                apiResponse.flote,
                apiResponse.recouvreur,
            );
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Agent de la puce commerciale mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetSimData({sim}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update company agent into API
export function* emitUpdateCompanyAgent() {
    yield takeLatest(EMIT_UPDATE_COMPANY_AGENT, function*({id, company}) {
        const scope = SIM_COMPANY_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_COMPANY_AGENT_API_PATH}/${id}`,
                {
                    id_corporate: company
                });
            const sim = extractSimData(
                apiResponse.puce,
                apiResponse.type,
                apiResponse.user,
                apiResponse.agent,
                apiResponse.corporate,
                apiResponse.flote,
                apiResponse.recouvreur,
            );
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Entreprise de la puce commerciale mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetSimData({sim}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Delete sim from API
export function* emitSimDelete() {
    yield takeLatest(EMIT_SIM_DELETE, function*({id}) {
        const scope = SIMS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetSimActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${DELETE_SIM_API_PATH}/${id}`);
            const sims = extractSimsData(apiResponse.puces);
            // Fire event at redux for sim delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce commerciale supprimée avec succès`
            }));
            // Fire event to redux
            yield put(storeSetSimsData({sims}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetSimActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract sim data
function extractSimData(apiSim, apiType, apiUser, apiAgent, apiCompany, apiOperator, apiCollector) {
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
    if(apiSim) {
        sim.name = apiSim.nom;
        sim.actionLoader = false;
        sim.number = apiSim.numero;
        sim.balance = apiSim.solde;
        sim.id = apiSim.id.toString();
        sim.creation = apiSim.created_at;
        sim.reference = apiSim.reference;
        sim.description = apiSim.description;
    }
    return sim;
}

// Extract sims data
function extractSimsData(apiSims) {
    const sims = [];
    apiSims.forEach(data => {
        sims.push(extractSimData(
            data.puce,
            data.type,
            data.user,
            data.agent,
            data.corporate,
            data.flote,
            data.recouvreur
        ))
    });
    sortByCreationDate(sims);
    return sims;
}

// Combine to export all functions at once
export default function* sagaSims() {
    yield all([
        fork(emitNewSim),
        fork(emitSimFetch),
        fork(emitUpdateSim),
        fork(emitSimsFetch),
        fork(emitSimDelete),
        fork(emitUpdateSimAgent),
        fork(emitUpdateSimOperator),
        fork(emitUpdateCompanyAgent),
    ]);
}
