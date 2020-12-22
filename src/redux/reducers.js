import user from './user/reducer';
import errors from './errors/reducer';
import requests from './requests/reducer';
import settings from './settings/reducer';
import notifications from './notifications/reducer';

// Combine all reducers
export default {
    user,
    errors,
    requests,
    settings,
    notifications,
};
