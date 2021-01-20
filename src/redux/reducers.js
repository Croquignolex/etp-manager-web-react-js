import user from './user/reducer';
import sims from './sims/reducer';
import zones from './zones/reducer';
import fleets from './fleets/reducer';
import agents from './agents/reducer';
import outlays from './outlays/reducer';
import returns from './returns/reducer';
import settings from './settings/reducer';
import payments from './payments/reducer';
import managers from './managers/reducer';
import operators from './operators/reducer';
import handovers from './handovers/reducer';
import recoveries from './recoveries/reducer';
import clearances from './clearances/reducer';
import collectors from './collectors/reducer';
import userRequests from './requests/user/reducer';
import simsRequests from './requests/sims/reducer';
import notifications from './notifications/reducer';
import zonesRequests from './requests/zones/reducer';
import agentsRequests from './requests/agents/reducer';
import fleetsRequests from './requests/fleets/reducer';
import outlaysRequests from './requests/outlays/reducer';
import returnsRequests from './requests/returns/reducer';
import paymentsRequests from './requests/payments/reducer';
import settingsRequests from './requests/settings/reducer';
import managersRequests from './requests/managers/reducer';
import operatorsRequests from './requests/operators/reducer';
import handoversRequests from './requests/handovers/reducer';
import collectorsRequests from './requests/collectors/reducer';
import clearancesRequests from './requests/clearances/reducer';
import recoveriesRequests from './requests/recoveries/reducer';
import notificationsRequests from './requests/notifications/reducer';

// Combine all reducers
export default {
    user,
    sims,
    zones,
    agents,
    fleets,
    outlays,
    returns,
    settings,
    managers,
    payments,
    handovers,
    operators,
    recoveries,
    clearances,
    collectors,
    simsRequests,
    userRequests,
    zonesRequests,
    notifications,
    fleetsRequests,
    agentsRequests,
    returnsRequests,
    outlaysRequests,
    managersRequests,
    settingsRequests,
    paymentsRequests,
    handoversRequests,
    operatorsRequests,
    recoveriesRequests,
    clearancesRequests,
    collectorsRequests,
    notificationsRequests,
};
