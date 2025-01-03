import { all } from 'redux-saga/effects';

import user from './user/saga';
import sims from './sims/saga';
import zones from './zones/saga';
import agents from './agents/saga';
import fleets from './fleets/saga';
import outlays from './outlays/saga';
import returns from './returns/saga';
import refuels from './refuels/saga';
import vendors from './vendors/saga';
import affords from './affords/saga';
import expenses from './expenses/saga';
import revenues from './revenues/saga';
import settings from './settings/saga';
import payments from './payments/saga';
import managers from './managers/saga';
import agencies from './agencies/saga';
import supplies from './supplies/saga';
import handovers from './handovers/saga';
import operators from './operators/saga';
import transfers from './transfers/saga';
import movements from './movements/saga';
import clearances from './clearances/saga';
import collectors from './collectors/saga';
import recoveries from './recoveries/saga';
import supervisors from './supervisors/saga';
import transactions from './transactions/saga';
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
        refuels(),
        affords(),
        vendors(),
        revenues(),
        expenses(),
        payments(),
        supplies(),
        agencies(),
        managers(),
        settings(),
        transfers(),
        movements(),
        handovers(),
        operators(),
        clearances(),
        recoveries(),
        collectors(),
        supervisors(),
        transactions(),
        notifications(),
    ]);
}
