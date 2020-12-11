import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {apiGetRequest, apiPostRequest, sortByCreationDate} from "../../helpers/functions";
import {storeRequestFailed, storeRequestInit, storeRequestSucceed} from "../requests/actions";
import {EMIT_ANONYMOUS_FLEET_FETCH, EMIT_NEW_ANONYMOUS_FLEET, storeSetAnonymousFleetsData} from "./actions";
import {
    ANONYMOUS_SCOPE,
    ANONYMOUS_NEW_SCOPE,
    ANONYMOUS_FLEETS_API_PATH,
    CREATE_ANONYMOUS_FLEET_API_PATH
} from "../../helpers/constants";

// Fetch anonymous fleets from API
export function* emitAnonymousFleetsFetch() {
    yield takeLatest(EMIT_ANONYMOUS_FLEET_FETCH, function*() {
        const scope = ANONYMOUS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, ANONYMOUS_FLEETS_API_PATH);
            const anonymousFleets = extractAnonymousFleetsData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetAnonymousFleetsData({anonymousFleets}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New anonymous fleet into API
export function* emitNewAnonymousFleet() {
    yield takeLatest(EMIT_NEW_ANONYMOUS_FLEET, function*({sim, amount, receiver, receiverSim}) {
        const scope = ANONYMOUS_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, CREATE_ANONYMOUS_FLEET_API_PATH,
            {
                montant: amount,
                id_puce_from: sim,
                nom_agent: receiver,
                nro_puce_to: receiverSim,
            });
            const anonymousFleets = extractAnonymousFleetsData(apiResponse.flottages);
            // Fire event to redux
            yield put(storeSetAnonymousFleetsData({anonymousFleets}));
            // Fire event at redux for new fleet toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Flottage anonyme éffectué avec succès`
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

function extractAnonymousFleetData(apiSim, apiUser, apiFleet) {
    let fleet = {
        id: '', reference: '', amount: '', receiver: '', receiverSim: '', status: '', creation: '',

        claimant: {id: '', name: '', phone: ''},
        sim_outgoing: {id: '', name: '', number: ''},
    };
    if(apiSim) {
        fleet.sim_outgoing = {
            name: apiSim.nom,
            number: apiSim.numero,
            id: apiSim.id.toString()
        };
    }
    if(apiUser) {
        fleet.claimant = {
            name: apiUser.name,
            phone: apiUser.phone,
            id: apiUser.id.toString(),
        }
    }
    if(apiFleet) {
        fleet.actionLoader = false;
        fleet.status = apiFleet.statut;
        fleet.amount = apiFleet.montant;
        fleet.id = apiFleet.id.toString();
        fleet.creation = apiFleet.created_at;
        fleet.reference = apiFleet.reference;
        fleet.receiver = apiFleet.nom_agent;
        fleet.receiverSim = apiFleet.nro_sim_to;
    }
    return fleet;
}

export function extractAnonymousFleetsData(apiFleets) {
    const fleets = [];
    apiFleets.forEach(data => {
        fleets.push(extractAnonymousFleetData(
            data.puce_emetrice,
            data.user,
            data.flottage
        ));
    });
    sortByCreationDate(fleets);
    return fleets;
}

// Combine to export all functions at once
export default function* sagaAnonymousFleets() {
    yield all([
        fork(emitNewAnonymousFleet),
        fork(emitAnonymousFleetsFetch),
    ]);
}
