import user from './user/reducer';
import fleets from './fleets/reducer';
import settings from './settings/reducer';
import userRequests from './requests/user/reducer';
import notifications from './notifications/reducer';
import fleetsRequests from './requests/fleets/reducer';
import settingsRequests from './requests/settings/reducer';
import notificationsRequests from './requests/notifications/reducer';

// Combine all reducers
export default {
    user,
    fleets,
    settings,
    userRequests,
    notifications,
    fleetsRequests,
    settingsRequests,
    notificationsRequests,
};
