import user from './user/reducer';
import sims from './sims/reducer';
import users from './users/reducer';
import zones from './zones/reducer';
import toast from './toast/reducer';
import roles from './roles/reducer';
import agents from './agents/reducer';
import fleets from './fleets/reducer';
import errors from './errors/reducer';
import refuels from './refuels/reducer';
import outlays from './outlays/reducer';
import requests from './requests/reducer';
import supplies from './supplies/reducer';
import payments from './payments/reducer';
import handovers from './handovers/reducer';
import simsTypes from './simsTypes/reducer';
import operators from './operators/reducer';
import transfers from './transfers/reducer';
import companies from './companies/reducer';
import anonymous from './anonymous/reducer';
import collectors from './collectors/reducer';
import clearances from './clearances/reducer';
import recoveries from './recoveries/reducer';
import notifications from './notifications/reducer';

// Combine all reducers
export default {
    user,
    sims,
    users,
    toast,
    roles,
    zones,
    agents,
    errors,
    fleets,
    outlays,
    refuels,
    requests,
    payments,
    supplies,
    handovers,
    transfers,
    companies,
    simsTypes,
    operators,
    anonymous,
    collectors,
    clearances,
    recoveries,
    notifications,
};
