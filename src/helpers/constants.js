// Loader type
export const STATUS = 'STATUS';
export const ACTIONS = 'ACTIONS';

// Roles as string
export const ADMIN = 'ADMIN';
export const AGENT = 'AGENT';
export const SUPERVISOR = 'SUPERVISEUR';
export const COLLECTOR = 'RESPONSABLE DE ZONNE';
export const MANAGER = 'GESTIONNAIRE DE FLOTTE';

// Notifications types
export const FLEET_OPERATION_NOTIFICATION = "App\\Notifications\\Flottage";
export const CASH_RECOVERY_NOTIFICATION = "App\\Notifications\\Recouvrement";
export const REQUEST_FLEET_NOTIFICATION = "App\\Notifications\\Demande_flotte";
export const FLEET_RECOVERY_NOTIFICATION = "App\\Notifications\\Retour_flotte";
export const CLEARANCE_OPERATION_NOTIFICATION = "App\\Notifications\\Destockage";
export const REQUEST_CLEARANCE_NOTIFICATION = "App\\Notifications\\Demande_destockage";

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

// Pages name
export const LOGIN_PAGE = 'Connexion';
export const PROFILE_PAGE = 'Mon profil';
export const SETTINGS_PAGE = 'Paramètres';
export const DASHBOARD_PAGE = 'Tableau de bord';
export const NOTIFICATIONS_PAGE = 'Notifications';
export const CASH_ACCOUNT_BALANCE = 'Mon solde';
export const FLEET_ACCOUNT_BALANCE = 'Flotte disponible';

export const LISTING_PAGE = 'Listing';
export const IMPORT_LISTING_PAGE = 'Comparer un listing';

export const COMPANIES = 'Entreprises';
export const COMPANY_NEW_PAGE = 'Nouvel entreprise';
export const ALL_COMPANIES_PAGE = 'Toutes les entreprises';
export const COMPANY_EDIT_PAGE = 'Modifier une entreprise';

export const USERS = 'Utilisateurs';
export const USER_NEW_PAGE = 'Nouvel utilisateur';
export const ALL_USERS_PAGE = 'Tous les utilisateurs';
export const USER_EDIT_PAGE = 'Modifier un utilissateur';

export const AGENTS = 'Agents';
export const AGENT_NEW_PAGE = 'Nouvel agent';
export const ALL_AGENTS_PAGE = 'Tous les agents';
export const AGENT_EDIT_PAGE = 'Modifier un agent';

export const COLLECTOR_FLEETS = 'Flottages';
export const COLLECTORS = 'Responsable de zone';
export const COLLECTOR_NEW_PAGE = 'Nouveau responsable';
export const ALL_COLLECTORS_PAGE = 'Tous les responsables';
export const COLLECTOR_EDIT_PAGE = 'Modifier un responsable';

export const OPERATORS = 'Opérateurs';
export const OPERATOR_NEW_PAGE = 'Nouvel opérateur';
export const ALL_OPERATORS_PAGE = 'Tous les opérateurs';
export const OPERATOR_EDIT_PAGE = 'Modifier un opérateur';

export const ZONES = 'Zones';
export const ZONE_NEW_PAGE = 'Nouvelle zone';
export const ALL_ZONES_PAGE = 'Toutes les zones';
export const ZONE_EDIT_PAGE = 'Modifier une zone';

export const SIMS = 'Puces';
export const SIM_NEW_PAGE = 'Nouvelle puce';
export const ALL_SIMS_PAGE = 'Toutes les puces';
export const SIM_EDIT_PAGE = 'Modifier une puce';

export const CLEARANCES = 'Déstockage';
export const CLEARANCE_NEW_PAGE = 'Nouvelle demande';
export const ALL_CLEARANCES_PAGE = 'Toutes mes demandes';
export const CLEARANCE_EDIT_PAGE = 'Modifier une demande (déstockage)';

export const OPERATIONS = 'Opérations';
export const OPERATIONS_FLEETS_PAGE = 'Flottages Agent';
export const OPERATIONS_CLEARANCES_PAGE = 'Déstockages';
export const OPERATIONS_AFFORDS_PAGE = 'Approvisionements';
export const OPERATIONS_TRANSFERS_PAGE = 'Tranferts de flotte';
export const OPERATIONS_ANONYMOUS_FLEETS_PAGE = 'Flottages Anonyme';

export const RECOVERIES = 'Recouvrement';
export const RECOVERIES_CASH_PAGE = 'Espèces';
export const RECOVERIES_FLEET_PAGE = 'Retour flotte';

export const CHECKOUT = 'Caisse';
export const CHECKOUT_OUTlAYS_PAGE = 'Décaissement';
export const CHECKOUT_PAYMENTS_PAGE = 'Encaissement';
export const HANDING_OVER_PAGE = 'Passation des service';

export const REQUESTS = 'Demandes';
export const REQUESTS_FLEETS_PAGE = 'Flottes';
export const REQUESTS_CLEARANCES_PAGE = 'Déstockages';
export const REQUESTS_FLEET_NEW_PAGE = 'Nouvelle demande de flotte';
export const REQUESTS_FLEET_EDIT_PAGE = 'Modifier demande de flotte';
export const REQUESTS_CLEARANCE_NEW_PAGE = 'Nouvelle demande de déstockage';
export const REQUESTS_CLEARANCE_EDIT_PAGE = 'Modifier demande de déstockage';

export const MY_NETWORK = 'Mon réseau';

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


