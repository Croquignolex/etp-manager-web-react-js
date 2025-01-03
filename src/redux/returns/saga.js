import Lodash from "lodash";
import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {storeUpdateSupplyData} from "../supplies/actions";
import {apiGetRequest, apiPostRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_NEW_RETURN,
    EMIT_RETURNS_FETCH,
    EMIT_CONFIRM_RETURN,
    storeSetReturnsData,
    storeUpdateReturnData,
    EMIT_ADD_FLEET_RETURN,
    EMIT_NEXT_RETURNS_FETCH,
    storeSetNextReturnsData,
    EMIT_GROUP_RETURNS_FETCH,
    storeSetGroupReturnsData,
    storeSetReturnActionData,
    EMIT_SUPPLY_RETURNS_FETCH,
    EMIT_GROUP_CONFIRM_RETURN,
    storeSetAddFleetReturnData,
    storeStopInfiniteScrollReturnData
} from "./actions";
import {
    storeReturnRequestInit,
    storeReturnsRequestInit,
    storeReturnRequestFailed,
    storeReturnsRequestFailed,
    storeReturnRequestSucceed,
    storeReturnsRequestSucceed,
    storeNextReturnsRequestInit,
    storeConfirmReturnRequestInit,
    storeNextReturnsRequestFailed,
    storeAddFleetReturnRequestInit,
    storeNextReturnsRequestSucceed,
    storeConfirmReturnRequestFailed,
    storeAddFleetReturnRequestFailed,
    storeConfirmReturnRequestSucceed,
    storeAddFleetReturnRequestSucceed,
} from "../requests/returns/actions";

// Fetch returns from API
export function* emitReturnsFetch() {
    yield takeLatest(EMIT_RETURNS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeReturnsRequestInit());
            yield put(storeSetReturnsData({returns: [], hasMoreData: false, page: 0}));
            const apiResponse = yield call(apiGetRequest, `${api.FLEET_RECOVERIES_API_PATH}?page=1`);
            // Extract data
            const returns = extractReturnsData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetReturnsData({returns, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeReturnsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReturnsRequestFailed({message}));
        }
    });
}

// Fetch group returns from API
export function* emitGroupReturnsFetch() {
    yield takeLatest(EMIT_GROUP_RETURNS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeReturnsRequestInit());
            yield put(storeSetReturnsData({returns: [], hasMoreData: false, page: 0}));
            const apiResponse = yield call(apiGetRequest, api.GROUP_RETURNS_API_PATH);
            // Extract data
            const returns = extractReturnsData(apiResponse.data.recouvrements);
            const groupedReturn = Object.values(Lodash.groupBy(returns, _return => [_return.agent.id, _return.operator.id]));
            // Fire event to redux
            yield put(storeSetGroupReturnsData({returns: groupedReturn}));
            // Fire event for request
            yield put(storeReturnsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReturnsRequestFailed({message}));
        }
    });
}

// Confirm group return from API
export function* emitGroupConfirmReturn() {
    yield takeLatest(EMIT_GROUP_CONFIRM_RETURN, function*({ids}) {
        try {
            // Fire event for request
            yield put(storeConfirmReturnRequestInit());
            const apiResponse = yield call(apiPostRequest, api.GROUP_CONFIRM_RETURN_API_PATH, {ids});
            const apiResponse2 = yield call(apiGetRequest, api.GROUP_RETURNS_API_PATH);
            // Extract data
            const returns = extractReturnsData(apiResponse2.data.recouvrements);
            const groupedReturn = Object.values(Lodash.groupBy(returns, _return => [_return.agent.id, _return.operator.id]));
            // Fire event to redux
            yield put(storeSetGroupReturnsData({returns: groupedReturn}));
            // Fire event for request
            yield put(storeConfirmReturnRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeConfirmReturnRequestFailed({message}));
        }
    });
}

// Fetch next returns from API
export function* emitNextReturnsFetch() {
    yield takeLatest(EMIT_NEXT_RETURNS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextReturnsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEET_RECOVERIES_API_PATH}?page=${page}`);
            // Extract data
            const returns = extractReturnsData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetNextReturnsData({returns, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextReturnsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextReturnsRequestFailed({message}));
            yield put(storeStopInfiniteScrollReturnData());
        }
    });
}

// Confirm return from API
export function* emitConfirmReturn() {
    yield takeLatest(EMIT_CONFIRM_RETURN, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetReturnActionData({id}));
            // Fire event for request
            yield put(storeConfirmReturnRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CONFIRM_FLEET_RECOVERIES_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeUpdateReturnData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetReturnActionData({id}));
            // Fire event for request
            yield put(storeConfirmReturnRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetReturnActionData({id}));
            yield put(storeConfirmReturnRequestFailed({message}));
        }
    });
}

// New return from API
export function* emitNewReturn() {
    yield takeLatest(EMIT_NEW_RETURN, function*({supply, amount, agentSim, managerSim}) {
        try {
            // Fire event for request
            yield put(storeReturnRequestInit());
            const data = {id_flottage: supply, montant: amount, puce_agent: agentSim, puce_flottage: managerSim};
            const apiResponse = yield call(apiPostRequest, api.NEW_FLEET_RECOVERIES_API_PATH, data);
            // Fire event to redux
            yield put(storeUpdateSupplyData({id: supply, amount}));
            // Fire event for request
            yield put(storeReturnRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReturnRequestFailed({message}));
        }
    });
}

// New  add fleet from API
export function* emitAddFleetReturn() {
    yield takeLatest(EMIT_ADD_FLEET_RETURN, function*({amount, agent, agentSim, managerSim}) {
        try {
            // Fire event for request
            yield put(storeAddFleetReturnRequestInit());
            const data = {montant: amount, id_agent: agent, puce_agent: agentSim, puce_flottage: managerSim};
            const apiResponse = yield call(apiPostRequest, api.ADD_FLEET_RETURNS_API_PATH, data);
            // Extract data
            const returns = extractRecoveryData(
                apiResponse.data.recouvrement,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.recouvreur,
                apiResponse.data.puce_agent,
                apiResponse.data.puce_flottage,
                apiResponse.data.operateur,
            );
            // Fire event to redux
            yield put(storeSetAddFleetReturnData({data: returns}));
            // Fire event for request
            yield put(storeAddFleetReturnRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddFleetReturnRequestFailed({message}));
        }
    });
}

// Fetch supply returns from API
export function* emitSupplyReturnsFetch() {
    yield takeLatest(EMIT_SUPPLY_RETURNS_FETCH, function*({id}) {
        try {
            // Fire event for request
            yield put(storeReturnsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SUPPLY_FLEET_RECOVERIES_API_PATH}/${id}`);
            // Extract data
            const returns = extractReturnsData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetReturnsData({returns, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeReturnsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReturnsRequestFailed({message}));
        }
    });
}

// Extract recovery data
function extractRecoveryData(apiRecovery, apiUser, apiAgent, apiCollector, apiSimOutgoing, apiSimIncoming, apiOperator) {
    let recovery = {
        id: '', amount: '', creation: '', receipt: '', status: '',

        agent: {id: '', name: ''},
        operator: {id: '', name: ''},
        collector: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiAgent && apiUser) {
        recovery.agent = {
            name: apiUser.name,
            id: apiUser.id.toString(),
            reference: apiAgent.reference
        };
    }
    if(apiCollector) {
        recovery.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString(),
        };
    }
    if(apiSimOutgoing) {
        recovery.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        recovery.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiOperator) {
        recovery.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString(),
        }
    }
    if(apiRecovery) {
        recovery.actionLoader = false;
        recovery.status = apiRecovery.statut;
        recovery.amount = apiRecovery.montant;
        recovery.id = apiRecovery.id.toString();
        recovery.creation = apiRecovery.created_at;
        recovery.receipt = getFileFromServer(apiRecovery.recu);
    }
    return recovery;
}

// Extract returns data
function extractReturnsData(apiReturns) {
    const returns = [];
    if(apiReturns) {
        apiReturns.forEach(data => {
            returns.push(extractRecoveryData(
                data.recouvrement,
                data.user,
                data.agent,
                data.recouvreur,
                data.puce_agent,
                data.puce_flottage,
                data.operateur,
            ));
        });
    }
    return returns;
}

// Combine to export all functions at once
export default function* sagaReturns() {
    yield all([
        fork(emitNewReturn),
        fork(emitReturnsFetch),
        fork(emitConfirmReturn),
        fork(emitAddFleetReturn),
        fork(emitNextReturnsFetch),
        fork(emitGroupReturnsFetch),
        fork(emitSupplyReturnsFetch),
        fork(emitGroupConfirmReturn),
    ]);
}
