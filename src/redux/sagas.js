import { all } from 'redux-saga/effects';

import user from './user/saga';
import sims from './sims/saga';
import zones from './zones/saga';
import agents from './agents/saga';
import fleets from './fleets/saga';
import outlays from './outlays/saga';
import returns from './returns/saga';
import settings from './settings/saga';
import payments from './payments/saga';
import managers from './managers/saga';
import supplies from './supplies/saga';
import handovers from './handovers/saga';
import operators from './operators/saga';
import transfers from './transfers/saga';
import anonymous from './anonymous/saga';
import clearances from './clearances/saga';
import collectors from './collectors/saga';
import recoveries from './recoveries/saga';
import notifications from './notifications/saga';

// Combine all saga middleware
export default function* sagas() {
    yield all([
        user(),
        sims(),
        zones(),
        agents(),
        fleets(),
        outlays(),
        returns(),
        payments(),
        supplies(),
        managers(),
        settings(),
        transfers(),
        anonymous(),
        handovers(),
        operators(),
        clearances(),
        recoveries(),
        collectors(),
        notifications(),
    ]);
}
