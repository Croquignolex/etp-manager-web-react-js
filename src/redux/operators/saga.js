import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {apiGetRequest, apiPostRequest, sortByCreationDate} from "../../helpers/functions";
import {
    storeRequestInit,
    storeRequestFailed,
    storeRequestSucceed
} from "../requests/actions";
import {
    EMIT_NEW_OPERATOR,
    EMIT_OPERATOR_FETCH,
    EMIT_OPERATOR_DELETE,
    EMIT_UPDATE_OPERATOR,
    EMIT_OPERATORS_FETCH,
    storeSetOperatorData,
    storeSetOperatorsData,
    EMIT_ADD_OPERATOR_SIMS,
    EMIT_REMOVE_OPERATOR_SIMS,
    storeSetOperatorActionData,
    storeSetOperatorSimsActionData,
} from './actions'
import {
    OPERATOR_SCOPE,
    SIMS_LIST_SCOPE,
    OPERATORS_SCOPE,
    OPERATOR_ADD_SIM,
    OPERATOR_NEW_SCOPE,
    OPERATORS_API_PATH,
    OPERATOR_EDIT_SCOPE,
    OPERATOR_REMOVE_SIM,
    EDIT_OPERATOR_API_PATH,
    OPERATOR_ADD_SIMS_SCOPE,
    CREATE_OPERATOR_API_PATH,
    DELETE_OPERATOR_API_PATH,
    OPERATORS_DETAILS_API_PATH,
} from "../../helpers/constants";

// Fetch operators from API
export function* emitOperatorsFetch() {
    yield takeLatest(EMIT_OPERATORS_FETCH, function*() {
        const scope = OPERATORS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, OPERATORS_API_PATH);
            const operators = extractOperatorsData(apiResponse.flotes);
            // Fire event to redux
            yield put(storeSetOperatorsData({operators}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch operator from API
export function* emitOperatorFetch() {
    yield takeLatest(EMIT_OPERATOR_FETCH, function*({id}) {
        const scope = OPERATOR_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${OPERATORS_DETAILS_API_PATH}/${id}`);
            const operator = extractOperatorData(apiResponse.flote, apiResponse.puces);
            // Fire event to redux
            yield put(storeSetOperatorData({operator}));
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
export function* emitNewOperator() {
    yield takeLatest(EMIT_NEW_OPERATOR, function*({name, description}) {
        const scope = OPERATOR_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            yield call(apiPostRequest, CREATE_OPERATOR_API_PATH, {name, description});
            // Fire event at redux for new operator toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Opérateur de flotte ajouté avec succès`
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
export function* emitUpdateOperator() {
    yield takeLatest(EMIT_UPDATE_OPERATOR, function*({id, name, description}) {
        const scope = OPERATOR_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_OPERATOR_API_PATH}/${id}`, {name, description});
            const operator = extractOperatorData(apiResponse.flote, apiResponse.puces);
            // Fire event at redux for operator update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Opérateur de flotte mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetOperatorData({operator}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Add operator sims into API
export function* emitAddOperatorSims() {
    yield takeLatest(EMIT_ADD_OPERATOR_SIMS, function*({id, name, reference, simType,
                                                                  number, description, agent, company}) {
        const scope = OPERATOR_ADD_SIMS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${OPERATOR_ADD_SIM}/${id}`,
                {
                    reference,
                    nom: name,
                    description,
                    type: simType,
                    numero: number,
                    id_agent: agent,
                    id_corporate: company,
                });
            const operator = extractOperatorData(apiResponse.flote, apiResponse.puces);
            // Fire event at redux for operator update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce commerciale ajoutée à l'opérateur de flotte avec succès`
            }));
            // Fire event to redux
            yield put(storeSetOperatorData({operator}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Remove operator sims into API
export function* emitRemoveOperatorSims() {
    yield takeLatest(EMIT_REMOVE_OPERATOR_SIMS, function*({id, sim}) {
        const scope = SIMS_LIST_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetOperatorSimsActionData({sim}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${OPERATOR_REMOVE_SIM}/${id}`, {id_puce: sim});
            const operator = extractOperatorData(apiResponse.flote, apiResponse.puces);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce commerciale supprimée avec succès`
            }));
            // Fire event to redux
            yield put(storeSetOperatorData({operator}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetOperatorSimsActionData({sim}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Delete operator from API
export function* emitOperatorDelete() {
    yield takeLatest(EMIT_OPERATOR_DELETE, function*({id}) {
        const scope = OPERATORS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetOperatorActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${DELETE_OPERATOR_API_PATH}/${id}`);
            const operators = extractOperatorsData(apiResponse.flotes);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Opérateur de flotte supprimé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetOperatorsData({operators}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetOperatorActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract operator data
function extractOperatorData(apiOperator, apiSims) {
    let operator = {
        id: '', name: '', description: '', creation: '',

        sims: []
    };
    if(apiSims) {
        apiSims.forEach(data => {
            operator.sims.push({
                name: data.nom,
                number: data.numero,
                actionLoader: false,
                id: data.id.toString(),
                reference: data.reference,
                creation: data.created_at,
            })
        });
        sortByCreationDate(operator.sims);
    }
    if(apiOperator) {
        operator.actionLoader = false;
        operator.name = apiOperator.nom;
        operator.id = apiOperator.id.toString();
        operator.creation = apiOperator.created_at;
        operator.description = apiOperator.description;
    }
    return operator;
}

// Extract operators data
function extractOperatorsData(apiOperators) {
    const operators = [];
    if(apiOperators) {
        apiOperators.forEach(data => {
            operators.push(extractOperatorData(data.flote, data.puces));
        });
    }
    sortByCreationDate(operators);
    return operators;
}

// Combine to export all functions at once
export default function* sagaOperators() {
    yield all([
        fork(emitNewOperator),
        fork(emitOperatorFetch),
        fork(emitUpdateOperator),
        fork(emitOperatorsFetch),
        fork(emitOperatorDelete),
        fork(emitAddOperatorSims),
        fork(emitRemoveOperatorSims),
    ]);
}
