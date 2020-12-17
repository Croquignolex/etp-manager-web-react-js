import {API_SERVER_URL} from "./generalConstants";

export const API_URL = `${API_SERVER_URL}/api`;
export const LOGOUT_API_PATH = `${API_URL}/logout`;
export const BALANCE_API_PATH = `${API_URL}/mon_solde`;
export const AUTHENTICATION_API_PATH = `${API_URL}/authentication`;
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