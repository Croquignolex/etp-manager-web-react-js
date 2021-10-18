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
export const GROUP_FLEET_ADD_SUPPLY_API_PATH = `${API_URL}/flottage_groupee`;
export const ALL_FLEETS_API_PATH = `${API_URL}/list_demandes_flote_general_all`;
export const GROUP_FLEETS_API_PATH = `${API_URL}/list_demandes_flote_general_groupee`;

export const CLEARANCES_API_PATH = `${API_URL}/list_demandes_destockage`;
export const ALL_CLEARANCES_API_PATH = `${API_URL}/list_demandes_destockage_all`;

// Sims
export const SIM_API_PATH = `${API_URL}/show_puce`;
export const SIMS_API_PATH = `${API_URL}/puce_list`;
export const EDIT_SIM_API_PATH = `${API_URL}/edit_puce`;
export const All_SIMS_API_PATH = `${API_URL}/puce_list_all`;
export const AGENTS_SIMS_API_PATH = `${API_URL}/puce_list_all_agent`;
export const EDIT_SIM_OPERATOR_API_PATH = `${API_URL}/edit_puce_flote`;
export const FLEETS_SIMS_API_PATH = `${API_URL}/puce_list_gestionnaire`;
export const COLLECTORS_SIMS_API_PATH = `${API_URL}/puce_list_collector`;
export const RESOURCES_SIMS_API_PATH = `${API_URL}/puce_list_all_resource`;
export const All_INTERNAL_SIMS_API_PATH = `${API_URL}/puce_list_interne_all`;
export const ALL_FLEETS_SIMS_API_PATH = `${API_URL}/puce_list_gestionnaire_all`;

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
export const SEARCH_AGENTS_API_PATH = `${API_URL}/search_agents`;
export const AGENT_ZONE_UPDATE_API_PATH = `${API_URL}/edit_zone_agent`;
export const TOGGLE_AGENT_STATUS_API_PATH = `${API_URL}/edit_agent_status`;

// Checkout
export const REVENUES_API_PATH = `${API_URL}/treasuries_in`;
export const EXPENSES_API_PATH = `${API_URL}/treasuries_out`;
export const NEW_REVENUE_API_PATH = `${API_URL}/treasury_in`;
export const NEW_EXPENSE_API_PATH = `${API_URL}/treasury_out`;

// Handovers
export const NEW_HANDOVER_API_PATH = `${API_URL}/passation`;
export const HANDOVERS_API_PATH = `${API_URL}/passations_list`;
export const CANCEL_HANDOVER_API_PATH = `${API_URL}/annuler_passation`;
export const CONFIRM_HANDOVER_API_PATH = `${API_URL}/approuve_passation`;
export const GROUP_HANDOVERS_API_PATH = `${API_URL}/passations_list_groupee`;
export const GROUP_CONFIRM_HANDOVER_API_PATH = `${API_URL}/approuve_passation_groupee`;

// Outlay
export const NEW_OUTLAY_API_PATH = `${API_URL}/decaissement`;
export const OUTLAYS_API_PATH = `${API_URL}/decaissement_list`;
export const CANCEL_OUTLAY_API_PATH = `${API_URL}/annuler_decaissement`;

// Payment
export const PAYMENTS_API_PATH = `${API_URL}/encaissement_list`;
export const CONFIRM_PAYMENT_API_PATH = `${API_URL}/approuve_encaissement`;

// Zones
export const All_ZONES_API_PATH = `${API_URL}/zone_list_all`;

// Collectors
export const ALL_COLLECTORS_API_PATH = `${API_URL}/recouvreurs_all`;

// Manager
export const ALL_MANAGERS_API_PATH = `${API_URL}/gestionnaires_all`;

// Supervisor
export const ALL_SUPERVISORS_API_PATH = `${API_URL}/superviseurs_all`;

// Operators
export const All_OPERATORS_API_PATH = `${API_URL}/flote_list_all`;

// Affords
export const AFFORDS_API_PATH = `${API_URL}/list_approvisionnement`;

// Fleet recovery
export const NEW_FLEET_RECOVERIES_API_PATH = `${API_URL}/retour_flotte`;
export const FLEET_RECOVERIES_API_PATH = `${API_URL}/list_all_retour_flotte`;
export const SUPPLY_FLEET_RECOVERIES_API_PATH = `${API_URL}/list_retour_flotte`;
export const ADD_FLEET_RETURNS_API_PATH = `${API_URL}/retour_flotte_sans_flottage`;
export const CONFIRM_FLEET_RECOVERIES_API_PATH = `${API_URL}/approuve_retour_flotte`;

// Cash recovery
export const NEW_CASH_RECOVERIES_API_PATH = `${API_URL}/recouvrement`;
export const CASH_RECOVERIES_API_PATH = `${API_URL}/list_all_recouvrement`;
export const SUPPLY_CASH_RECOVERIES_API_PATH = `${API_URL}/list_recouvrement`;

// Transfers
export const NEW_TRANSFERS_API_PATH = `${API_URL}/flottage_rz`;
export const TRANSFERS_API_PATH = `${API_URL}/list_all_flottage_interne`;
export const CANCEL_TRANSFER_API_PATH = `${API_URL}/annuler_flottage_interne`;
export const CONFIRM_TRANSFER_API_PATH = `${API_URL}/approuve_flottage_interne`;
export const GROUP_TRANSFERS_API_PATH = `${API_URL}/list_all_flottage_interne_groupee`;
export const GROUP_CONFIRM_TRANSFER_API_PATH = `${API_URL}/approuve_flottage_interne_groupee`;

// Supplies
export const SUPPLIES_API_PATH = `${API_URL}/list_all_flottage`;
export const NEW_SUPPLY_API_PATH = `${API_URL}/flottage_express`;
export const CANCEL_SUPPLY_API_PATH = `${API_URL}/annuler_flottage`;
export const NEW_ANONYMOUS_SUPPLY_API_PATH = `${API_URL}/flottage_anonyme`;
export const SEARCH_SUPPLIES_API_PATH = `${API_URL}/search_list_all_flottage`;

// Refuels
export const REFUELS_API_PATH = `${API_URL}/list_destockage`;
export const NEW_REFUEL_API_PATH = `${API_URL}/approvisionnement_etp`;
export const CONFIRM_REFUEL_API_PATH = `${API_URL}/approuve_destockage`;
export const SEARCH_REFUELS_API_PATH = `${API_URL}/search_list_destockage`;
export const NEW_ANONYMOUS_REFUEL_API_PATH = `${API_URL}/destockage_anonyme`;

// Vendors
export const VENDORS_API_PATH = `${API_URL}/vendors`;
export const ALL_VENDORS_API_PATH = `${API_URL}/all_vendors`;
export const VENDOR_DETAILS_API_PATH = `${API_URL}/show_vendor`;

// Report
export const SIM_TRANSACTIONS_API_PATH = `${API_URL}/transactions_sim`;
export const PERSONAL_MOVEMENTS_API_PATH = `${API_URL}/movements_personal`;
export const PERSONAL_TRANSACTIONS_API_PATH = `${API_URL}/transactions_personal`;
