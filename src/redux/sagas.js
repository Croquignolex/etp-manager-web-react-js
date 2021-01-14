import { all } from 'redux-saga/effects';

import user from './user/saga';
import sims from './sims/saga';
import zones from './zones/saga';
import agents from './agents/saga';
import fleets from './fleets/saga';
import outlays from './outlays/saga';
import settings from './settings/saga';
import payments from './payments/saga';
import handovers from './handovers/saga';
import operators from './operators/saga';
import clearances from './clearances/saga';
import collectors from './collectors/saga';
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
        payments(),
        settings(),
        handovers(),
        operators(),
        clearances(),
        collectors(),
        notifications(),
    ]);
}
