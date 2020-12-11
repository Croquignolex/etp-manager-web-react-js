// Data
export const APP_NAME = 'ETP';

export const BASE_URL = 'http://localhost:3000';
export const API_SERVER_URL = 'http://127.0.0.1';
// export const BASE_URL = 'https://etp.moyo-industry.com';
// export const BASE_URL = 'https://etp.dmsemergence.com';
// export const API_SERVER_URL = 'https://etp-api.zoom-lab.com';
// export const API_SERVER_URL = 'https://etp-api.dmsemergence.com/public';
// export const API_SERVER_URL = 'https://etp-api.moyo-industry.com/public';

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

// Pages paths
export const LOGIN_PAGE_PATH = '/';
export const APP_PAGE_PATH = '/app';
export const PROFILE_PAGE_PATH = `${APP_PAGE_PATH}/profile`;
export const SETTINGS_PAGE_PATH = `${APP_PAGE_PATH}/settings`;
export const NOTIFICATIONS_PAGE_PATH = `${APP_PAGE_PATH}/notifications`;

export const DASHBOARD_PAGE_PATH = `${APP_PAGE_PATH}`;
export const LISTING_PAGE_PATH = `${APP_PAGE_PATH}/listing`;

export const COMPANIES_PAGE_PATH = `${APP_PAGE_PATH}/companies`;
export const COMPANY_NEW_PAGE_PATH = `${APP_PAGE_PATH}/companies/new`;
export const COMPANY_EDIT_PAGE_PATH = `${APP_PAGE_PATH}/companies/edit`;

export const USERS_PAGE_PATH = `${APP_PAGE_PATH}/users`;
export const USER_NEW_PAGE_PATH = `${APP_PAGE_PATH}/users/new`;
export const USER_EDIT_PAGE_PATH = `${APP_PAGE_PATH}/users/edit`;

export const COLLECTORS_PAGE_PATH = `${APP_PAGE_PATH}/collectors`;
export const COLLECTOR_NEW_PAGE_PATH = `${APP_PAGE_PATH}/collectors/new`;
export const COLLECTOR_EDIT_PAGE_PATH = `${APP_PAGE_PATH}/collectors/edit`;
export const COLLECTOR_FLEETS_PAGE_PATH = `${APP_PAGE_PATH}/collectors/fleets`;

export const AGENTS_PAGE_PATH = `${APP_PAGE_PATH}/agents`;
export const AGENT_NEW_PAGE_PATH = `${APP_PAGE_PATH}/agents/new`;
export const AGENT_EDIT_PAGE_PATH = `${APP_PAGE_PATH}/agents/edit`;

export const OPERATORS_PAGE_PATH = `${APP_PAGE_PATH}/operators`;
export const OPERATOR_NEW_PAGE_PATH = `${APP_PAGE_PATH}/operators/new`;
export const OPERATOR_EDIT_PAGE_PATH = `${APP_PAGE_PATH}/operators/edit`;

export const ZONES_PAGE_PATH = `${APP_PAGE_PATH}/zones`;
export const ZONE_NEW_PAGE_PATH = `${APP_PAGE_PATH}/zones/new`;
export const ZONE_EDIT_PAGE_PATH = `${APP_PAGE_PATH}/zones/edit`;

export const SIMS_PAGE_PATH = `${APP_PAGE_PATH}/sims`;
export const SIM_NEW_PAGE_PATH = `${APP_PAGE_PATH}/sims/new`;
export const SIM_EDIT_PAGE_PATH = `${APP_PAGE_PATH}/sims/edit`;

export const OPERATIONS_FLEETS_PAGE_PATH = `${APP_PAGE_PATH}/operations/fleets`;
export const OPERATION_AFFORDS_PAGE_PATH = `${APP_PAGE_PATH}/operations/affords`;
export const OPERATIONS_TRANSFERS_PAGE_PATH = `${APP_PAGE_PATH}/operations/transfers`;
export const OPERATIONS_CLEARANCES_PAGE_PATH = `${APP_PAGE_PATH}/operations/clearances`;
export const OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH = `${APP_PAGE_PATH}/operations/anonymous-fleets`;

export const RECOVERIES_CASH_PAGE_PATH = `${APP_PAGE_PATH}/recoveries/cash`;
export const RECOVERIES_FLEETS_PAGE_PATH = `${APP_PAGE_PATH}/recoveries/fleets`;

export const CHECKOUT_OUTLAYS_PAGE_PATH = `${APP_PAGE_PATH}/checkout/outlays`;
export const HANDING_OVER_PAGE_PATH = `${APP_PAGE_PATH}/checkout/handing-over`;
export const CHECKOUT_PAYMENTS_PAGE_PATH = `${APP_PAGE_PATH}/checkout/payments`;

export const REQUESTS_FLEETS_PAGE_PATH = `${APP_PAGE_PATH}/requests/fleets`;
export const REQUESTS_FLEET_NEW_PAGE_PATH = `${APP_PAGE_PATH}/requests/fleets/new`;
export const REQUESTS_CLEARANCES_PAGE_PATH = `${APP_PAGE_PATH}/requests/clearances`;
export const REQUESTS_FLEET_EDIT_PAGE_PATH = `${APP_PAGE_PATH}/requests/fleets/edit`;
export const REQUESTS_CLEARANCE_NEW_PAGE_PATH = `${APP_PAGE_PATH}/requests/clearances/new`;
export const REQUESTS_CLEARANCE_EDIT_PAGE_PATH = `${APP_PAGE_PATH}/requests/clearances/edit`;

export const NETWORK_FLEETS_PAGE_PATH = `${APP_PAGE_PATH}/network/fleets`;

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

// API URL
export const API_URL = `${API_SERVER_URL}/api`;
export const LOGIN_API_PATH = `${API_URL}/login`;
export const LOGOUT_API_PATH = `${API_URL}/logout`;
export const BALANCE_API_PATH = `${API_URL}/mon_solde`;
export const COMPARE_LISTING_API_PATH = `${API_URL}/import_flotage`;

export const ROLES_API_PATH = `${API_URL}/permisions_list`;
export const EDIT_AVATAR_API_PATH = `${API_URL}/edit_avatar`;
export const EDIT_SETTING_API_PATH = `${API_URL}/edit_setting`;
export const SIMS_TYPES_API_PATH = `${API_URL}/types_puces_list`;
export const EDIT_PROFILE_API_PATH = `${API_URL}/update_profile`;
export const EDIT_PASSWORD_API_PATH = `${API_URL}/edit_password`;

export const COMPANIES_API_PATH = `${API_URL}/corporate_list`;
export const EDIT_COMPANY_API_PATH = `${API_URL}/edit_corporate`;
export const COMPANY_ADD_SIM = `${API_URL}/ajouter_puce_corporate`;
export const CREATE_COMPANY_API_PATH = `${API_URL}/store_corporate`;
export const DELETE_COMPANY_API_PATH = `${API_URL}/delete_corporate`;
export const COMPANY_REMOVE_SIM = `${API_URL}/delete_puce_corporate`;
export const COMPANIES_DETAILS_API_PATH = `${API_URL}/show_corporate`;
export const EDIT_COMPANY_FILE_API_PATH = `${API_URL}/edit_corporate_folder`;

export const USERS_API_PATH = `${API_URL}/list`;
export const DELETE_USER_API_PATH = `${API_URL}/delete`;
export const EDIT_USER_API_PATH = `${API_URL}/edit_user`;
export const CREATE_USER_API_PATH = `${API_URL}/register`;
export const USERS_DETAILS_API_PATH = `${API_URL}/details`;
export const USER_ROLE_UPDATE_API_PATH = `${API_URL}/edit_role_user`;
export const USER_ZONE_UPDATE_API_PATH = `${API_URL}/edit_zone_user`;
export const EDIT_STATUS_USER_API_PATH = `${API_URL}/edit_user_status`;

export const COLLECTOR_ADD_SIM = `${API_URL}/ajouter_puce_rz`;
export const COLLECTOR_REMOVE_SIM = `${API_URL}/delete_puce_rz`;
export const CREATE_COLLECTOR_API_PATH = `${API_URL}/create_recouvreur`;

export const NOTIFICATIONS_API_PATH = `${API_URL}/all_notifications`;
export const READ_NOTIFICATIONS_API_PATH = `${API_URL}/read_notifications`;
export const UNREAD_NOTIFICATIONS_API_PATH = `${API_URL}/unread_notifications`;
export const DELETE_NOTIFICATIONS_API_PATH = `${API_URL}/delette_notifications`;

export const AGENTS_API_PATH = `${API_URL}/list_agents`;
export const EDIT_AGENT_API_PATH = `${API_URL}/edit_agent`;
export const EDIT_AGENT_CNI_API_PATH = `${API_URL}/edit_cni`;
export const AGENT_ADD_SIM = `${API_URL}/ajouter_puce_agent`;
export const AGENTS_DETAILS_API_PATH = `${API_URL}/show_agent`;
export const CREATE_AGENT_API_PATH = `${API_URL}/create_agent`;
export const DELETE_AGENT_API_PATH = `${API_URL}/delete_agent`;
export const AGENT_REMOVE_SIM = `${API_URL}/delete_puce_agent`;
export const EDIT_AGENT_FILE_API_PATH = `${API_URL}/edit_folder`;
export const AGENT_ZONE_UPDATE_API_PATH = `${API_URL}/edit_zone_agent`;
export const EDIT_STATUS_AGENT_API_PATH = `${API_URL}/edit_agent_status`;

export const OPERATORS_API_PATH = `${API_URL}/flote_list`;
export const EDIT_OPERATOR_API_PATH = `${API_URL}/edit_flote`;
export const OPERATOR_ADD_SIM = `${API_URL}/ajouter_puce_flote`;
export const CREATE_OPERATOR_API_PATH = `${API_URL}/store_flote`;
export const DELETE_OPERATOR_API_PATH = `${API_URL}/delete_flote`;
export const OPERATOR_REMOVE_SIM = `${API_URL}/delete_puce_flote`;
export const OPERATORS_DETAILS_API_PATH = `${API_URL}/show_flote`;

export const ZONES_API_PATH = `${API_URL}/zone_list`;
export const EDIT_ZONE_API_PATH = `${API_URL}/edit_zone`;
export const CREATE_ZONE_API_PATH = `${API_URL}/store_zone`;
export const DELETE_ZONE_API_PATH = `${API_URL}/delete_zone`;
export const ZONES_DETAILS_API_PATH = `${API_URL}/show_zone`;
export const ZONE_ADD_AGENT_API_PATH = `${API_URL}/ajouter_agent_zone`;
export const ZONE_REMOVE_AGENT_API_PATH = `${API_URL}/delete_agent_zone`;
export const ZONE_ADD_COLLECTOR_API_PATH = `${API_URL}/ajouter_recouvreur_zone`;
export const ZONE_REMOVE_COLLECTOR_API_PATH = `${API_URL}/delete_recouvreur_zone`;

export const CREATE_FLEET_BY_AGENT_API_PATH = `${API_URL}/demande_flote`;
export const FLEETS_BY_AGENT_API_PATH = `${API_URL}/list_all_demandes_flote`;
export const EDIT_FLEET_BY_AGENT_API_PATH = `${API_URL}/modifier_demandes_flote`;
export const CANCEL_FLEET_BY_AGENT_API_PATH = `${API_URL}/annuler_demandes_flote`;
export const FLEETS_DETAILS_BY_AGENT_API_PATH = `${API_URL}/detail_demandes_flote`;

export const ANONYMOUS_FLEETS_API_PATH = `${API_URL}/list_flottage_anonyme`;
export const CREATE_ANONYMOUS_FLEET_API_PATH = `${API_URL}/flottage_anonyme`;

export const CREATE_FLEET_BY_COLLECTOR_API_PATH = `${API_URL}/demande_flote_agent`;
export const FLEETS_BY_COLLECTOR_API_PATH = `${API_URL}/list_demandes_flote_general`;
export const EDIT_FLEET_BY_COLLECTOR_API_PATH = `${API_URL}/modifier_demandes_flote_agent`;
export const CANCEL_FLEET_BY_COLLECTOR_API_PATH = `${API_URL}/annuler_demandes_flote_agent`;
export const FLEETS_DETAILS_BY_COLLECTOR_API_PATH = `${API_URL}/detail_demandes_flote_agent`;

export const FLEET_ADD_SUPPLY_BY_MANAGER_API_PATH = `${API_URL}/flottage`;
export const FLEET_NEW_SUPPLY_BY_MANAGER_API_PATH = `${API_URL}/flottage_express`;
export const FLEETS_BY_MANAGER_API_PATH = `${API_URL}/list_demandes_flote_general`;
export const EDIT_FLEET_BY_MANAGER_API_PATH = `${API_URL}/modifier_demandes_flote_general`;

export const CREATE_CLEARANCE_BY_AGENT_API_PATH = `${API_URL}/demande_destockage`;
export const CLEARANCES_BY_AGENT_API_PATH = `${API_URL}/list_all_demandes_destockage`;
export const EDIT_CLEARANCE_BY_AGENT_API_PATH = `${API_URL}/modifier_demandes_destockage`;
export const CANCEL_CLEARANCE_BY_AGENT_API_PATH = `${API_URL}/annuler_demandes_destockage`;
export const CLEARANCES_DETAILS_BY_AGENT_API_PATH = `${API_URL}/detail_demandes_destockage`;

export const CLEARANCES_BY_COLLECTOR_API_PATH = `${API_URL}/list_demandes_destockage`;
export const CREATE_CLEARANCE_BY_COLLECTOR_API_PATH = `${API_URL}/demande_destockage_agent`;
export const PROCEED_CLEARANCE_BY_COLLECTOR_API_PATH = `${API_URL}/reponse_demandes_destockage`;
export const EDIT_CLEARANCE_BY_COLLECTOR_API_PATH = `${API_URL}/modifier_demandes_destockage_agent`;
export const CANCEL_CLEARANCE_BY_COLLECTOR_API_PATH = `${API_URL}/annuler_demandes_destockage_agent`;
export const CLEARANCES_DETAILS_BY_COLLECTOR_API_PATH = `${API_URL}/detail_demandes_destockage_agent`;

export const SUPPLIES_BY_MANAGER_API_PATH = `${API_URL}/list_all_flottage`;
export const SUPPLIES_BY_AGENT_API_PATH = `${API_URL}/list_all_flottage_agent`;
export const SUPPLIES_BY_COLLECTOR_API_PATH = `${API_URL}/list_all_flottage`;

export const NETWORK_NEW_SUPPLY_API_PATH = `${API_URL}/flottage_by_rz`;
export const NETWORK_SUPPLIES_API_PATH = `${API_URL}/list_flottage_rz_by_rz`;
export const NETWORK_COLLECTORS_SUPPLIES_API_PATH = `${API_URL}/list_all_flottage_by_rz`;

export const TRANSFERS_API_PATH = `${API_URL}/list_all_flottage_interne`;
export const NEW_TRANSFER_BY_MANAGER_API_PATH = `${API_URL}/flottage_rz`;
export const NEW_TRANSFER_BY_COLLECTOR_API_PATH = `${API_URL}/flottage_interne_rz_gf`;
export const NEW_TRANSFER_BY_SUPERVISOR_FOR_MANAGER_API_PATH = `${API_URL}/flottage_interne`;
export const NEW_TRANSFER_BY_SUPERVISOR_FOR_COLLECTOR_API_PATH = `${API_URL}/flottage_interne_rz`;

export const NEW_HANDOVER_API_PATH = `${API_URL}/passation`;
export const NEW_OUTLAY_API_PATH = `${API_URL}/decaissement`;
export const NEW_PAYMENT_API_PATH = `${API_URL}/encassement`;
export const HANDOVERS_API_PATH = `${API_URL}/passations_list`;
export const OUTLAYS_API_PATH = `${API_URL}/decaissement_list`;
export const PAYMENTS_API_PATH = `${API_URL}/encaissement_list`;

export const REFUELS_BY_MANAGER_API_PATH = `${API_URL}/list_destockage`;
export const CONFIRM_REFUEL_API_PATH = `${API_URL}/approuve_destockage`;
export const REFUELS_BY_AGENT_API_PATH = `${API_URL}/list_destockage_agent`;
export const NEW_COMPANY_SUPPLY_API_PATH = `${API_URL}/approvisionnement_etp`;
export const AFFORDS_BY_MANAGER_API_PATH = `${API_URL}/list_approvisionnement`;
export const CONFIRM_AFFORD_API_PATH = `${API_URL}/approuve_approvisionnement`;
export const REFUELS_BY_COLLECTOR_API_PATH = `${API_URL}/list_destockage_collector`;
export const AFFORDS_BY_COLLECTOR_API_PATH = `${API_URL}/list_approvisionnement_collector`;

export const NEW_CASH_RECOVERIES_API_PATH = `${API_URL}/recouvrement`;
export const CONFIRM_CASH_RECOVERIES_API_PATH = `${API_URL}/approuve_recouvrement`;
export const CASH_RECOVERIES_BY_MANAGER_API_PATH = `${API_URL}/list_all_recouvrement`;
export const CASH_RECOVERIES_BY_AGENT_API_PATH = `${API_URL}/list_recouvrement_by_agent`;
export const CASH_RECOVERIES_BY_COLLECTOR_API_PATH = `${API_URL}/list_recouvrement_by_rz`;

export const NEW_FLEET_RECOVERIES_API_PATH = `${API_URL}/retour_flotte`;
export const CONFIRM_FLEET_RECOVERIES_API_PATH = `${API_URL}/approuve_retour_flotte`;
export const FLEET_RECOVERIES_BY_MANAGER_API_PATH = `${API_URL}/list_all_retour_flotte`;
export const FLEET_RECOVERIES_BY_AGENT_API_PATH = `${API_URL}/list_retour_flotte_by_agent`;
export const FLEET_RECOVERIES_BY_COLLECTOR_API_PATH = `${API_URL}/list_retour_flotte_by_rz`;

export const SIMS_API_PATH = `${API_URL}/puce_list`;
export const EDIT_SIM_API_PATH = `${API_URL}/edit_puce`;
export const CREATE_SIM_API_PATH = `${API_URL}/store_puce`;
export const DELETE_SIM_API_PATH = `${API_URL}/delete_puce`;
export const SIMS_DETAILS_API_PATH = `${API_URL}/show_puce`;
export const EDIT_SIM_AGENT_API_PATH = `${API_URL}/edit_puce_agent`;
export const EDIT_SIM_OPERATOR_API_PATH = `${API_URL}/edit_puce_flote`;
export const EDIT_COMPANY_AGENT_API_PATH = `${API_URL}/edit_puce_corporate`;

// Socket url
export const SOCKET_EVENT = ".notification.event";
export const SOCKET_SERVER_URL = `${API_SERVER_URL}:6001`;
export const SOCKET_CHANNEL = "role.";

// Local storage keys
export const LOCAL_STORAGE_USER_ID = 'LOCAL_STORAGE_USER_ID';
export const LOCAL_STORAGE_USER_NAME = 'LOCAL_STORAGE_USER_NAME';
export const LOCAL_STORAGE_USER_POST = 'LOCAL_STORAGE_USER_POST';
export const LOCAL_STORAGE_USER_ROLE = 'LOCAL_STORAGE_USER_ROLE';
export const LOCAL_STORAGE_USER_SIMS = 'LOCAL_STORAGE_USER_SIMS';
export const LOCAL_STORAGE_USER_TOWN = 'LOCAL_STORAGE_USER_TOWN';
export const LOCAL_STORAGE_USER_ZONE = 'LOCAL_STORAGE_USER_ZONE';
export const LOCAL_STORAGE_USER_TOKEN = 'LOCAL_STORAGE_USER_TOKEN';
export const LOCAL_STORAGE_USER_EMAIL = 'LOCAL_STORAGE_USER_EMAIL';
export const LOCAL_STORAGE_USER_PHONE = 'LOCAL_STORAGE_USER_PHONE';
export const LOCAL_STORAGE_USER_AVATAR = 'LOCAL_STORAGE_USER_AVATAR';
export const LOCAL_STORAGE_USER_COUNTRY = 'LOCAL_STORAGE_USER_COUNTRY';
export const LOCAL_STORAGE_USER_ADDRESS = 'LOCAL_STORAGE_USER_ADDRESS';
export const LOCAL_STORAGE_USER_SETTING = 'LOCAL_STORAGE_USER_SETTING';
export const LOCAL_STORAGE_USER_BALANCE = 'LOCAL_STORAGE_USER_BALANCE';
export const LOCAL_STORAGE_USER_REFERENCE = 'LOCAL_STORAGE_USER_REFERENCE';
export const LOCAL_STORAGE_USER_COMMISSION = 'LOCAL_STORAGE_USER_COMMISSION';
export const LOCAL_STORAGE_USER_SALE_POINT = 'LOCAL_STORAGE_USER_SALE_POINT';
export const LOCAL_STORAGE_USER_DESCRIPTION = 'LOCAL_STORAGE_USER_DESCRIPTION';
export const LOCAL_STORAGE_USER_BACK_ID_CARD = 'LOCAL_STORAGE_USER_BACK_ID_CARD';
export const LOCAL_STORAGE_USER_CREATION_DATE = 'LOCAL_STORAGE_USER_CREATION_DATE';
export const LOCAL_STORAGE_USER_FRONT_ID_CARD = 'LOCAL_STORAGE_USER_FRONT_ID_CARD';
export const LOCAL_STORAGE_USER_AUTHENTICATION = 'LOCAL_STORAGE_USER_AUTHENTICATION';
export const LOCAL_STORAGE_USER_RECEIVED_NOTIFICATIONS = 'LOCAL_STORAGE_USER_RECEIVED_NOTIFICATIONS';

// Types
export const INFO = 'INFO';
export const DANGER = 'DANGER';
export const WARNING = 'WARNING';
export const SUCCESS = 'SUCCESS';

// Actions scopes
export const ROLES_SCOPE = 'ROLES_SCOPE';
export const LISTING_SCOPE = 'LISTING_SCOPE';
export const SETTINGS_SCOPE = 'SETTINGS_SCOPE';
export const SIMS_TYPES_SCOPE = 'SIMS_TYPES_SCOPE';

export const SIM_SCOPE = 'SIM_SCOPE';
export const SIMS_SCOPE = 'SIMS_SCOPE';
export const SIM_NEW_SCOPE = 'SIM_NEW_SCOPE';
export const SIM_EDIT_SCOPE = 'SIM_EDIT_SCOPE';
export const SIMS_LIST_SCOPE = 'SIMS_LIST_SCOPE';
export const SIM_AGENT_EDIT_SCOPE = 'SIM_AGENT_EDIT_SCOPE';
export const SIM_COMPANY_EDIT_SCOPE = 'SIM_COMPANY_EDIT_SCOPE';
export const SIM_OPERATOR_EDIT_SCOPE = 'SIM_OPERATOR_EDIT_SCOPE';

export const ZONE_SCOPE = 'ZONE_SCOPE';
export const ZONES_SCOPE = 'ZONES_SCOPE';
export const ZONE_NEW_SCOPE = 'ZONE_NEW_SCOPE';
export const ZONE_EDIT_SCOPE = 'ONE_EDIT_SCOPE';
export const ZONES_AGENTS_SCOPE = 'ZONES_AGENTS_SCOPE';
export const ZONES_ADD_AGENTS_SCOPE = 'ZONES_ADD_AGENTS_SCOPE';
export const ZONES_COLLECTORS_SCOPE = 'ZONES_COLLECTORS_SCOPE';
export const ZONES_ADD_COLLECTORS_SCOPE = 'ZONES_ADD_COLLECTORS_SCOPE';

export const FLEET_SCOPE = 'FLEET_SCOPE';
export const FLEETS_SCOPE = 'FLEETS_SCOPE';
export const FLEET_NEW_SCOPE = 'FLEET_NEW_SCOPE';
export const FLEET_EDIT_SCOPE = 'FLEET_EDIT_SCOPE';
export const FLEET_ADD_SUPPLY_SCOPE = 'FLEET_ADD_SUPPLY_SCOPE';

export const CLEARANCE_SCOPE = 'CLEARANCE_SCOPE';
export const CLEARANCES_SCOPE = 'CLEARANCES_SCOPE';
export const CLEARANCE_NEW_SCOPE = 'CLEARANCE_NEW_SCOPE';
export const CLEARANCE_PROCEED_SCOPE = 'CLEARANCE_PROCEED_SCOPE';

export const LOGIN_SCOPE = 'LOGIN_SCOPE';
export const PROFILE_SCOPE = 'PROFILE_SCOPE';
export const PROFILE_AVATAR_SCOPE = 'PROFILE_AVATAR_SCOPE';
export const PROFILE_PASSWORD_SCOPE = 'PROFILE_PASSWORD_SCOPE';

export const AGENT_SCOPE = 'AGENT_SCOPE';
export const AGENTS_SCOPE = 'AGENTS_SCOPE';
export const AGENT_NEW_SCOPE = 'AGENT_NEW_SCOPE';
export const AGENT_EDIT_SCOPE = 'AGENT_EDIT_SCOPE';
export const AGENT_CNI_EDIT_SCOPE = 'AGENT_CNI_EDIT_SCOPE';
export const AGENT_ADD_SIMS_SCOPE = 'AGENT_ADD_SIMS_SCOPE';
export const AGENT_FILE_EDIT_SCOPE = 'AGENT_FILE_EDIT_SCOPE';

export const COMPANY_SCOPE = 'COMPANY_SCOPE';
export const COMPANIES_SCOPE = 'COMPANIES_SCOPE';
export const COMPANY_NEW_SCOPE = 'COMPANY_NEW_SCOPE';
export const COMPANY_EDIT_SCOPE = 'COMPANY_EDIT_SCOPE';
export const COMPANY_ADD_SIMS_SCOPE = 'COMPANY_ADD_SIMS_SCOPE';

export const USER_SCOPE = 'USER_SCOPE';
export const USERS_SCOPE = 'USERS_SCOPE';
export const USER_NEW_SCOPE = 'USER_NEW_SCOPE';
export const USER_EDIT_SCOPE = 'USER_EDIT_SCOPE';
export const USER_BALANCE_SCOPE = 'USER_BALANCE_SCOPE';
export const USER_ROLE_EDIT_SCOPE = 'USER_ROLE_EDIT_SCOPE';
export const USER_ZONE_EDIT_SCOPE = 'USER_ZONE_EDIT_SCOPE';

export const COLLECTOR_SCOPE = 'COLLECTOR_SCOPE';
export const COLLECTORS_SCOPE = 'COLLECTORS_SCOPE';
export const COLLECTOR_NEW_SCOPE = 'COLLECTOR_NEW_SCOPE';
export const COLLECTOR_EDIT_SCOPE = 'COLLECTOR_EDIT_SCOPE';
export const COLLECTOR_ADD_SIMS_SCOPE = 'COLLECTOR_EDIT_SCOPE';

export const OPERATOR_SCOPE = 'OPERATOR_SCOPE';
export const OPERATORS_SCOPE = 'OPERATORS_SCOPE';
export const OPERATOR_NEW_SCOPE = 'OPERATOR_NEW_SCOPE';
export const OPERATOR_EDIT_SCOPE = 'OPERATOR_EDIT_SCOPE';
export const OPERATOR_ADD_SIMS_SCOPE = 'OPERATOR_ADD_SIMS_SCOPE';

export const REFUELS_SCOPE = 'REFUELS_SCOPE';
export const AFFORDS_SCOPE = 'AFFORDS_SCOPE';
export const SUPPLIES_SCOPE = 'SUPPLIES_SCOPE';
export const ANONYMOUS_SCOPE = 'ANONYMOUS_SCOPE';
export const TRANSFERS_SCOPE = 'TRANSFERS_SCOPE';
export const SUPPLY_NEW_SCOPE = 'SUPPLY_NEW_SCOPE';
export const REFUEL_NEW_SCOPE = 'REFUEL_NEW_SCOPE';
export const AFFORD_NEW_SCOPE = 'AFFORD_NEW_SCOPE';
export const TRANSFER_NEW_SCOPE = 'TRANSFER_NEW_SCOPE';
export const ANONYMOUS_NEW_SCOPE = 'ANONYMOUS_NEW_SCOPE';

export const OUTLAYS_SCOPE = 'OUTLAYS_SCOPE';
export const PAYMENTS_SCOPE = 'PAYMENTS_SCOPE';
export const HANDOVERS_SCOPE = 'HANDOVERS_SCOPE';
export const OUTLAY_NEW_SCOPE = 'OUTLAY_NEW_SCOPE';
export const PAYMENT_NEW_SCOPE = 'PAYMENT_NEW_SCOPE';
export const HANDOVER_NEW_SCOPE = 'HANDOVER_NEW_SCOPE';

export const CASH_RECOVERIES_SCOPE = 'CASH_RECOVERIES_SCOPE';
export const FLEETS_RECOVERIES_SCOPE = 'FLEETS_RECOVERIES_SCOPE';
export const CASH_RECOVERY_NEW_SCOPE = 'CASH_RECOVERY_NEW_SCOPE';
export const FLEETS_RECOVERY_NEW_SCOPE = 'FLEETS_RECOVERY_NEW_SCOPE';

export const NOTIFICATIONS_SCOPE = 'NOTIFICATIONS_SCOPE';
export const UNREAD_NOTIFICATIONS_SCOPE = 'UNREAD_NOTIFICATIONS_SCOPE';

// Default data
export const DEFAULT_TOWN = 'Douala';
export const DEFAULT_PASSWORD = '000000';
export const DEFAULT_COUNTRY = 'CAMAEROUN';
export const DEFAULT_FORM_DATA = {isValid: true, message: '', val: ''};
export const DEFAULT_ARRAY_FORM_DATA = {isValid: true, message: '', val: []};
export const DEFAULT_OBJECT_FORM_DATA = {isValid: true, message: '', val: {}};

// Others
export const UNKNOWN = 'INCONNU';
export const INVISIBLE_MENU_ITEM = 'INVISIBLE_MENU_ITEM';
export const VENDORS = [
    {id: 'DIGITAL PARTNER', name: 'DIGITAL PARTNER'},
    {id: 'BANQUE (MTN)', name: 'BANQUE (MTN)'},
];


