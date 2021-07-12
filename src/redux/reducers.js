import user from './user/reducer';
import sims from './sims/reducer';
import zones from './zones/reducer';
import fleets from './fleets/reducer';
import agents from './agents/reducer';
import outlays from './outlays/reducer';
import returns from './returns/reducer';
import refuels from './refuels/reducer';
import vendors from './vendors/reducer';
import affords from './affords/reducer';
import expenses from './expenses/reducer';
import revenues from './revenues/reducer';
import settings from './settings/reducer';
import payments from './payments/reducer';
import managers from './managers/reducer';
import supplies from './supplies/reducer';
import movements from './movements/reducer';
import operators from './operators/reducer';
import handovers from './handovers/reducer';
import transfers from './transfers/reducer';
import recoveries from './recoveries/reducer';
import clearances from './clearances/reducer';
import collectors from './collectors/reducer';
import supervisors from './supervisors/reducer';
import transactions from './transactions/reducer';
import userRequests from './requests/user/reducer';
import simsRequests from './requests/sims/reducer';
import notifications from './notifications/reducer';
import zonesRequests from './requests/zones/reducer';
import agentsRequests from './requests/agents/reducer';
import fleetsRequests from './requests/fleets/reducer';
import refuelsRequests from './requests/refuels/reducer';
import outlaysRequests from './requests/outlays/reducer';
import returnsRequests from './requests/returns/reducer';
import affordsRequests from './requests/affords/reducer';
import vendorsRequests from './requests/vendors/reducer';
import revenuesRequests from './requests/revenues/reducer';
import paymentsRequests from './requests/payments/reducer';
import settingsRequests from './requests/settings/reducer';
import managersRequests from './requests/managers/reducer';
import suppliesRequests from './requests/supplies/reducer';
import expensesRequests from './requests/expenses/reducer';
import operatorsRequests from './requests/operators/reducer';
import handoversRequests from './requests/handovers/reducer';
import transfersRequests from './requests/transfers/reducer';
import movementsRequests from './requests/movements/reducer';
import collectorsRequests from './requests/collectors/reducer';
import clearancesRequests from './requests/clearances/reducer';
import recoveriesRequests from './requests/recoveries/reducer';
import supervisorsRequests from './requests/supervisors/reducer';
import transactionsRequests from './requests/transactions/reducer';
import notificationsRequests from './requests/notifications/reducer';

// Combine all reducers
export default {
    user,
    sims,
    zones,
    agents,
    fleets,
    outlays,
    vendors,
    returns,
    refuels,
    affords,
    settings,
    managers,
    expenses,
    revenues,
    payments,
    supplies,
    handovers,
    operators,
    transfers,
    movements,
    recoveries,
    clearances,
    collectors,
    supervisors,
    simsRequests,
    userRequests,
    transactions,
    zonesRequests,
    notifications,
    fleetsRequests,
    agentsRequests,
    returnsRequests,
    refuelsRequests,
    outlaysRequests,
    affordsRequests,
    vendorsRequests,
    expensesRequests,
    revenuesRequests,
    suppliesRequests,
    managersRequests,
    settingsRequests,
    paymentsRequests,
    transfersRequests,
    movementsRequests,
    handoversRequests,
    operatorsRequests,
    recoveriesRequests,
    clearancesRequests,
    collectorsRequests,
    supervisorsRequests,
    transactionsRequests,
    notificationsRequests,
};
