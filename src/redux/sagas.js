import { all } from 'redux-saga/effects';

import user from './user/saga';
import sims from './sims/saga';
import fleets from './fleets/saga';
import settings from './settings/saga';
import notifications from './notifications/saga';

// Combine all saga middleware
export default function* sagas() {
    yield all([
        user(),
        sims(),
        fleets(),
        settings(),
        notifications(),
    ]);
}
