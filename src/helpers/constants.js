// Loader type
export const STATUS = 'STATUS';
export const ACTIONS = 'ACTIONS';

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
