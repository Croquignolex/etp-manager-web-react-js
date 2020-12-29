import { all } from 'redux-saga/effects';

import user from './user/saga';
import settings from './settings/saga';
import notifications from './notifications/saga';

// Combine all saga middleware
export default function* sagas() {
    yield all([
        user(),
        settings(),
        notifications(),
    ]);
}
