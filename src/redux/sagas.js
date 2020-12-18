import { all } from 'redux-saga/effects';

import user from './user/saga';
import notifications from './notifications/saga';

// Combine all saga middleware
export default function* sagas() {
    yield all([
        user(),
        notifications(),
       /* sims(),
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
        */
    ]);
}
