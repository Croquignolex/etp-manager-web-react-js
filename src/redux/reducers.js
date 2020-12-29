import user from './user/reducer';
import settings from './settings/reducer';
import userRequests from './requests/user/reducer';
import notifications from './notifications/reducer';
import settingsRequests from './requests/settings/reducer';
import notificationsRequests from './requests/notifications/reducer';

// Combine all reducers
export default {
    user,
    settings,
    userRequests,
    notifications,
    settingsRequests,
    notificationsRequests,
};
