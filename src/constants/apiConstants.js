import {API_SERVER_URL} from "./generalConstants";

// User
export const API_URL = `${API_SERVER_URL}/api`;
export const LOGOUT_API_PATH = `${API_URL}/logout`;
export const EDIT_AVATAR_API_PATH = `${API_URL}/edit_avatar`;
export const FETCH_BALANCE_API_PATH = `${API_URL}/mon_solde`;
export const EDIT_PASSWORD_API_PATH = `${API_URL}/edit_password`;
export const EDIT_PROFILE_API_PATH = `${API_URL}/update_profile`;
export const AUTHENTICATION_API_PATH = `${API_URL}/authentication`;

// Settings
export const EDIT_SETTING_API_PATH = `${API_URL}/edit_setting`;

// Notifications
export const NOTIFICATIONS_API_PATH = `${API_URL}/all_notifications`;
export const READ_NOTIFICATIONS_API_PATH = `${API_URL}/read_notifications`;
export const UNREAD_NOTIFICATIONS_API_PATH = `${API_URL}/unread_notifications`;
export const DELETE_NOTIFICATIONS_API_PATH = `${API_URL}/delete_notifications`;

// Requests
export const FLEET_ADD_SUPPLY_API_PATH = `${API_URL}/flottage`;
export const FLEETS_API_PATH = `${API_URL}/list_demandes_flote_general`;
export const ALL_FLEETS_API_PATH = `${API_URL}/list_demandes_flote_general_all`;

export const CLEARANCES_API_PATH = `${API_URL}/list_demandes_destockage`;
export const ALL_CLEARANCES_API_PATH = `${API_URL}/list_demandes_destockage_all`;

// Sims
export const SIM_API_PATH = `${API_URL}/show_puce`;
export const SIMS_API_PATH = `${API_URL}/puce_list`;
export const All_SIMS_API_PATH = `${API_URL}/puce_list_all`;

// Agents
export const AGENT_API_PATH = `${API_URL}/show_agent`;
export const AGENTS_API_PATH = `${API_URL}/list_agents`;
export const EDIT_AGENT_CNI_API_PATH = `${API_URL}/edit_cni`;
export const AGENT_ADD_SIM = `${API_URL}/ajouter_puce_agent`;
export const CREATE_AGENT_API_PATH = `${API_URL}/create_agent`;
export const DELETE_AGENT_API_PATH = `${API_URL}/delete_agent`;
export const EDIT_AGENT_INFO_API_PATH = `${API_URL}/edit_agent`;
export const ALL_AGENTS_API_PATH = `${API_URL}/list_agents_all`;
export const EDIT_AGENT_DOC_API_PATH = `${API_URL}/edit_folder`;
export const AGENT_ZONE_UPDATE_API_PATH = `${API_URL}/edit_zone_agent`;
export const TOGGLE_AGENT_STATUS_API_PATH = `${API_URL}/edit_agent_status`;

// Checkout
export const NEW_HANDOVER_API_PATH = `${API_URL}/passation`;
export const NEW_OUTLAY_API_PATH = `${API_URL}/decaissement`;
export const NEW_PAYMENT_API_PATH = `${API_URL}/encassement`;
export const HANDOVERS_API_PATH = `${API_URL}/passations_list`;
export const OUTLAYS_API_PATH = `${API_URL}/decaissement_list`;
export const PAYMENTS_API_PATH = `${API_URL}/encaissement_list`;

// Zones
export const All_ZONES_API_PATH = `${API_URL}/zone_list_all`;

// Collectors
export const ALL_COLLECTORS_API_PATH = `${API_URL}/recouvreurs_all`;

// Manager
export const ALL_MANAGERS_API_PATH = `${API_URL}/gestionnaires_all`;

// Operators
export const All_OPERATORS_API_PATH = `${API_URL}/flote_list_all`;