import user from './user/reducer';
import sims from './sims/reducer';
import zones from './zones/reducer';
import fleets from './fleets/reducer';
import agents from './agents/reducer';
import outlays from './outlays/reducer';
import settings from './settings/reducer';
import payments from './payments/reducer';
import operators from './operators/reducer';
import clearances from './clearances/reducer';
import collectors from './collectors/reducer';
import userRequests from './requests/user/reducer';
import simsRequests from './requests/sims/reducer';
import notifications from './notifications/reducer';
import zonesRequests from './requests/zones/reducer';
import agentsRequests from './requests/agents/reducer';
import fleetsRequests from './requests/fleets/reducer';
import outlaysRequests from './requests/outlays/reducer';
import paymentsRequests from './requests/payments/reducer';
import settingsRequests from './requests/settings/reducer';
import operatorsRequests from './requests/operators/reducer';
import collectorsRequests from './requests/collectors/reducer';
import clearancesRequests from './requests/clearances/reducer';
import notificationsRequests from './requests/notifications/reducer';

// Combine all reducers
export default {
    user,
    sims,
    zones,
    agents,
    fleets,
    outlays,
    settings,
    payments,
    operators,
    clearances,
    collectors,
    simsRequests,
    userRequests,
    zonesRequests,
    notifications,
    fleetsRequests,
    agentsRequests,
    outlaysRequests,
    settingsRequests,
    paymentsRequests,
    operatorsRequests,
    clearancesRequests,
    collectorsRequests,
    notificationsRequests,
};
