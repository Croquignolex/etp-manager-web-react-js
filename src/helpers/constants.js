// Loader type
export const STATUS = 'STATUS';
export const ACTIONS = 'ACTIONS';

// Roles as string
export const ADMIN = 'ADMIN';
export const AGENT = 'AGENT';
export const SUPERVISOR = 'SUPERVISEUR';
export const COLLECTOR = 'RESPONSABLE DE ZONNE';
export const MANAGER = 'GESTIONNAIRE DE FLOTTE';

// Sims type string
export const AGENT_TYPE = 'AGENT';
export const FLEET_TYPE = 'FLOTTAGE';
export const MASTER_TYPE = 'MASTER SIM';
export const ETP_AGENT_TYPE = 'AGENT ETP';
export const CORPORATE_TYPE = 'CORPORATE';
export const COLLECTOR_TYPE = 'RESPONSABLE';
export const FLEET_SIMS_TYPE = [FLEET_TYPE, MASTER_TYPE];
export const AGENT_SIMS_TYPE = [AGENT_TYPE, ETP_AGENT_TYPE];
export const FLEET_COLLECTOR_TYPE = [FLEET_TYPE, COLLECTOR_TYPE];

// Roles as array
export const AGENT_ROLE = [AGENT];
export const MANAGER_ROLE = [MANAGER];
export const COLLECTOR_ROLE = [COLLECTOR];
export const ADMIN_ROLE = [ADMIN, SUPERVISOR];
export const COLLECTOR_AGENT_ROLE = [AGENT, COLLECTOR];
export const MANAGER_COLLECTOR_ROLE = [MANAGER, COLLECTOR];
export const ADMIN_MANAGER_ROLE = [ADMIN, SUPERVISOR, MANAGER];
export const ADMIN_COLLECTOR_ROLE = [ADMIN, SUPERVISOR, COLLECTOR];
export const MANAGER_COLLECTOR_AGENT_ROLE = [MANAGER, COLLECTOR, AGENT];
export const EVERYONE_ROLE = [ADMIN, AGENT, MANAGER, COLLECTOR, SUPERVISOR];
export const ADMIN_MANAGER_AGENT_ROLE = [ADMIN, SUPERVISOR, AGENT, MANAGER];
export const ADMIN_MANAGER_COLLECTOR_ROLE = [ADMIN, SUPERVISOR, COLLECTOR, MANAGER];

// Status
export const CANCEL = 'annule';
export const DONE = 'effectue';
export const DECLINE = 'decline';
export const APPROVE = 'approuve';
export const PENDING = 'en-attente';
export const PROCESSING = 'en-cours';

// Supply type
export const SUPPLY_BY_AGENT = "D'un Agent";
export const SUPPLY_BY_BANK = 'De la Banque';
export const SUPPLY_BY_DIGITAL_PARTNER = "D'un Digital Partner";

// Types
export const INFO = 'INFO';
export const DANGER = 'DANGER';
export const WARNING = 'WARNING';
export const SUCCESS = 'SUCCESS';

// Others
export const UNKNOWN = 'INCONNU';
export const INVISIBLE_MENU_ITEM = 'INVISIBLE_MENU_ITEM';
export const VENDORS = [
    {id: 'DIGITAL PARTNER', name: 'DIGITAL PARTNER'},
    {id: 'BANQUE (MTN)', name: 'BANQUE (MTN)'},
];


