import { all } from 'redux-saga/effects';

import user from './user/saga';
import sims from './sims/saga';
import zones from './zones/saga';
import roles from './roles/saga';
import users from './users/saga';
import agents from './agents/saga';
import fleets from './fleets/saga';
import refuels from './refuels/saga';
import outlays from './outlays/saga';
import payments from './payments/saga';
import supplies from './supplies/saga';
import requests from './requests/saga';
import simsTypes from './simsTypes/saga';
import handovers from './handovers/saga';
import operators from './operators/saga';
import companies from './companies/saga';
import anonymous from './anonymous/saga';
import transfers from './transfers/saga';
import collectors from './collectors/saga';
import clearances from './clearances/saga';
import recoveries from './recoveries/saga';
import notifications from './notifications/saga';

// Combine all saga middleware
export default function* sagas() {
    yield all([
        user(),
        sims(),
        users(),
        roles(),
        zones(),
        agents(),
        fleets(),
        outlays(),
        refuels(),
        supplies(),
        requests(),
        payments(),
        handovers(),
        operators(),
        anonymous(),
        companies(),
        transfers(),
        simsTypes(),
        collectors(),
        clearances(),
        recoveries(),
        notifications(),
    ]);
}
