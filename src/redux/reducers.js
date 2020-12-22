import user from './user/reducer';
import requests from './requests/reducer';
import settings from './settings/reducer';
import notifications from './notifications/reducer';

// Combine all reducers
export default {
    user,
    requests,
    settings,
    notifications,
};
