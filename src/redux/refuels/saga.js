import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {getFileFromServer} from "../agents/saga";
import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {storeRequestFailed, storeRequestInit, storeRequestSucceed} from "../requests/actions";
import {
    apiGetRequest,
    apiPostRequest,
    sortByCreationDate,
} from "../../helpers/functions";
import {
    EMIT_NEW_AFFORD,
    EMIT_NEW_REFUEL,
    EMIT_CONFIRM_AFFORD,
    EMIT_CONFIRM_REFUEL,
    storeSetRefuelsData,
    storeSetRefuelsActionData,
    EMIT_REFUELS_FETCH_BY_AGENT,
    EMIT_AFFORDS_FETCH_BY_MANAGER,
    EMIT_REFUELS_FETCH_BY_MANAGER,
    EMIT_REFUELS_FETCH_BY_COLLECTOR,
    EMIT_AFFORDS_FETCH_BY_COLLECTOR,
} from './actions'
import {
    AFFORDS_SCOPE,
    REFUELS_SCOPE,
    SUPPLY_BY_AGENT,
    AFFORD_NEW_SCOPE,
    REFUEL_NEW_SCOPE,
    CONFIRM_REFUEL_API_PATH,
    CONFIRM_AFFORD_API_PATH,
    SUPPLY_BY_DIGITAL_PARTNER,
    REFUELS_BY_AGENT_API_PATH,
    NEW_COMPANY_SUPPLY_API_PATH,
    REFUELS_BY_MANAGER_API_PATH,
    AFFORDS_BY_MANAGER_API_PATH,
    REFUELS_BY_COLLECTOR_API_PATH,
    AFFORDS_BY_COLLECTOR_API_PATH,
} from "../../helpers/constants";

// Fetch refuels by manager from API
export function* emitRefuelsFetchByManager() {
    yield takeLatest(EMIT_REFUELS_FETCH_BY_MANAGER, function*() {
        const scope = REFUELS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, REFUELS_BY_MANAGER_API_PATH);
            const refuels = extractRefuelsData(apiResponse);
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch affords by manager from API
export function* emitAffordsFetchByManager() {
    yield takeLatest(EMIT_AFFORDS_FETCH_BY_MANAGER, function*() {
        const scope = AFFORDS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, AFFORDS_BY_MANAGER_API_PATH);
            const refuels = extractRefuelsData(apiResponse);
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch refuels by collector from API
export function* emitRefuelsFetchByCollector() {
    yield takeLatest(EMIT_REFUELS_FETCH_BY_COLLECTOR, function*({id}) {
        const scope = REFUELS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${REFUELS_BY_COLLECTOR_API_PATH}/${id}`);
            const refuels = extractRefuelsData(apiResponse);
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch affords by collector from API
export function* emitAffordsFetchByCollector() {
    yield takeLatest(EMIT_AFFORDS_FETCH_BY_COLLECTOR, function*({id}) {
        const scope = AFFORDS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${AFFORDS_BY_COLLECTOR_API_PATH}/${id}`);
            const refuels = extractRefuelsData(apiResponse);
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch refuels by agent from API
export function* emitRefuelsFetchByAgent() {
    yield takeLatest(EMIT_REFUELS_FETCH_BY_AGENT, function*({id}) {
        const scope = REFUELS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${REFUELS_BY_AGENT_API_PATH}/${id}`);
            const refuels = extractRefuelsData(apiResponse);
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Confirm refuel
export function* emitConfirmRefuel() {
    yield takeLatest(EMIT_CONFIRM_REFUEL, function*({id}) {
        const scope = REFUELS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetRefuelsActionData({id}));
            const apiResponse = yield call(apiPostRequest, `${CONFIRM_REFUEL_API_PATH}/${id}`);
            const refuels = extractRefuelsData(apiResponse);
            // Fire event at redux for sim delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Déstockage confirmé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetRefuelsActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Confirm refuel
export function* emitConfirmAfford() {
    yield takeLatest(EMIT_CONFIRM_AFFORD, function*({id}) {
        const scope = AFFORDS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetRefuelsActionData({id}));
            const apiResponse = yield call(apiPostRequest, `${CONFIRM_AFFORD_API_PATH}/${id}`);
            const refuels = extractRefuelsData(apiResponse);
            // Fire event at redux for sim delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Approvisionnement confirmé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetRefuelsActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New refuel into API
export function* emitNewRefuel() {
    yield takeLatest(EMIT_NEW_REFUEL, function*({agent, amount, sim, receipt}) {
        const scope = REFUEL_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('id_puce', sim);
            data.append('recu', receipt);
            data.append('id_agent', agent);
            data.append('montant', amount);
            data.append('type', SUPPLY_BY_AGENT);
            const apiResponse = yield call(apiPostRequest, NEW_COMPANY_SUPPLY_API_PATH, data);
            const refuels = extractRefuelsData(apiResponse);
            // Fire event at redux for new agent toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Déstockage éffectué avec succès`
            }));
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New afford into API
export function* emitNewAfford() {
    yield takeLatest(EMIT_NEW_AFFORD, function*({amount, sim, receipt, vendor}) {
        const scope = AFFORD_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('id_puce', sim);
            data.append('recu', receipt);
            data.append('montant', amount);
            data.append('fournisseur', vendor);
            data.append('type', SUPPLY_BY_DIGITAL_PARTNER);
            const apiResponse = yield call(apiPostRequest, NEW_COMPANY_SUPPLY_API_PATH, data);
            const refuels = extractRefuelsData(apiResponse);
            // Fire event at redux for new agent toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Approvisionnement éffectué avec succès`
            }));
            // Fire event to redux
            yield put(storeSetRefuelsData({refuels}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract refuel data
function extractRefuelData(apiRefuel) {
    let refuel = {
        id: '', reference: '', amount: '', creation: '', type: '',
        note: '', vendor: '', receipt: '', status: '',

        request: {id: ''},
        collector: {id: '', name: ''},
        sim: {id: '', name: '', number: ''},
        agent: {id: '', name: '', reference: ''},
    };
    const apiSim = apiRefuel.puce;
    const apiUser = apiRefuel.user;
    const apiAgent = apiRefuel.agent;
    const apiCollector = apiRefuel.recouvreur;
    if(apiAgent && apiUser) {
        refuel.agent = {
            name: apiUser.name,
            id: apiAgent.id.toString(),
            reference: apiAgent.reference,
        };
    }
    if(apiSim) {
        refuel.sim = {
            name: apiSim.nom,
            number: apiSim.numero,
            id: apiSim.id.toString()
        };
    }
    if(apiCollector) {
        refuel.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString()
        };
    }
    if(apiRefuel) {
        refuel.actionLoader = false;
        refuel.note = apiRefuel.note;
        refuel.type = apiRefuel.type;
        refuel.status = apiRefuel.statut;
        refuel.amount = apiRefuel.montant;
        refuel.id = apiRefuel.id.toString();
        refuel.vendor = apiRefuel.fournisseur;
        refuel.creation = apiRefuel.created_at;
        refuel.reference = apiRefuel.reference;
        refuel.receipt = getFileFromServer(apiRefuel.recu);
    }
    return refuel;
}

// Extract refuels data
function extractRefuelsData(apiRefuels) {
    const refuels = [];
    apiRefuels.forEach(data => {
        refuels.push(extractRefuelData(data));
    });
    sortByCreationDate(refuels);
    return refuels;
}

// Combine to export all functions at once
export default function* sagaSupplies() {
    yield all([
        fork(emitNewRefuel),
        fork(emitNewAfford),
        fork(emitConfirmAfford),
        fork(emitConfirmRefuel),
        fork(emitRefuelsFetchByAgent),
        fork(emitAffordsFetchByManager),
        fork(emitRefuelsFetchByManager),
        fork(emitAffordsFetchByCollector),
        fork(emitRefuelsFetchByCollector),
    ]);
}
