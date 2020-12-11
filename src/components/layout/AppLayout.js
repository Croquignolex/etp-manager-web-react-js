import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import React, {useEffect, useLayoutEffect} from 'react';

import Footer from "../Footer";
import NavBar from "../app/NavBar";
import SideBar from "../app/SideBar";
import ToastAlert from "../ToastAlert";
import SimsPage from "../../pages/app/sims/SimsPage";
import ListingPage from "../../pages/app/ListingPage";
import ProfilePage from "../../pages/app/ProfilePage";
import SettingsPage from "../../pages/app/SettingsPage";
import RestrictedRoute from "../router/RestrictedRoute";
import UsersPage from "../../pages/app/users/UsersPage";
import ZonesPage from "../../pages/app/zones/ZonesPage";
import asyncComponent from "../../helpers/asyncComponent";
import DashboardPage from "../../pages/app/DashboardPage";
import SimsNewPage from "../../pages/app/sims/SimsNewPage";
import AgentsPage from "../../pages/app/agents/AgentsPage";
import SimsEditPage from "../../pages/app/sims/SimsEditPage";
import ZonesNewPage from "../../pages/app/zones/ZonesNewPage";
import UsersNewPage from "../../pages/app/users/UsersNewPage";
import ZonesEditPage from "../../pages/app/zones/ZonesEditPage";
import UsersEditPage from "../../pages/app/users/UsersEditPage";
import AgentsNewPage from "../../pages/app/agents/AgentsNewPage";
import NotificationsPage from "../../pages/app/NotificationsPage";
import AgentsEditPage from "../../pages/app/agents/AgentsEditPage";
import CompaniesPage from "../../pages/app/companies/CompaniesPage";
import OperatorsPage from "../../pages/app/operators/OperatorsPage";
import HandingOverPage from "../../pages/app/checkout/HandingOverPage";
import CollectorsPage from "../../pages/app/collectors/CollectorsPage";
import NetworkFleetsPage from "../../pages/app/network/NetworkFleetsPage";
import CompaniesNewPage from "../../pages/app/companies/CompaniesNewPage";
import OperatorsNewPage from "../../pages/app/operators/OperatorsNewPage";
import CompaniesEditPage from "../../pages/app/companies/CompaniesEditPage";
import OperatorsEditPage from "../../pages/app/operators/OperatorsEditPage";
import CollectorsNewPage from "../../pages/app/collectors/CollectorsNewPage";
import RecoveriesCashPage from "../../pages/app/recoveries/RecoveriesCashPage";
import CollectorsEditPage from "../../pages/app/collectors/CollectorsEditPage";
import CheckoutOutlaysPage from "../../pages/app/checkout/CheckoutOutlaysPage";
import {emitUnreadNotificationsFetch} from "../../redux/notifications/actions";
import CheckoutPaymentsPage from "../../pages/app/checkout/CheckoutPaymentsPage";
import OperationsFleetsPage from "../../pages/app/operations/OperationsFleetsPage";
import CollectorsFleetsPage from "../../pages/app/collectors/CollectorsFleetsPage";
import RecoveriesFleetsPage from "../../pages/app/recoveries/RecoveriesFleetsPage";
import RequestsFleetsPage from "../../pages/app/requests/fleets/RequestsFleetsPage";
import OperationsAffordsPage from "../../pages/app/operations/OperationsAffordsPage";
import OperationsTransfersPage from "../../pages/app/operations/OperationsTransfersPage";
import RequestsFleetsNewPage from "../../pages/app/requests/fleets/RequestsFleetsNewPage";
import OperationsClearancesPage from "../../pages/app/operations/OperationsClearancesPage";
import RequestsFleetsEditPage from "../../pages/app/requests/fleets/RequestsFleetsEditPage";
import RequestsClearancesPage from "../../pages/app/requests/clearances/RequestsClearancesPage";
import OperationsAnonymousFleetsPage from "../../pages/app/operations/OperationsAnonymousFleetsPage";
import RequestsClearancesNewPage from "../../pages/app/requests/clearances/RequestsClearancesNewPage";
import RequestsClearancesEditPage from "../../pages/app/requests/clearances/RequestsClearancesEditPage";
import {
    SIMS_PAGE_PATH,
    ZONES_PAGE_PATH,
    USERS_PAGE_PATH,
    AGENTS_PAGE_PATH,
    LISTING_PAGE_PATH,
    SIM_NEW_PAGE_PATH,
    PROFILE_PAGE_PATH,
    ZONE_NEW_PAGE_PATH,
    SIM_EDIT_PAGE_PATH,
    USER_NEW_PAGE_PATH,
    SETTINGS_PAGE_PATH,
    DASHBOARD_PAGE_PATH,
    OPERATORS_PAGE_PATH,
    USER_EDIT_PAGE_PATH,
    COMPANIES_PAGE_PATH,
    AGENT_NEW_PAGE_PATH,
    ZONE_EDIT_PAGE_PATH,
    COLLECTORS_PAGE_PATH,
    AGENT_EDIT_PAGE_PATH,
    COMPANY_NEW_PAGE_PATH,
    COMPANY_EDIT_PAGE_PATH,
    HANDING_OVER_PAGE_PATH,
    OPERATOR_NEW_PAGE_PATH,
    NOTIFICATIONS_PAGE_PATH,
    OPERATOR_EDIT_PAGE_PATH,
    COLLECTOR_NEW_PAGE_PATH,
    COLLECTOR_EDIT_PAGE_PATH,
    NETWORK_FLEETS_PAGE_PATH,
    REQUESTS_FLEETS_PAGE_PATH,
    RECOVERIES_CASH_PAGE_PATH,
    COLLECTOR_FLEETS_PAGE_PATH,
    CHECKOUT_OUTLAYS_PAGE_PATH,
    CHECKOUT_PAYMENTS_PAGE_PATH,
    RECOVERIES_FLEETS_PAGE_PATH,
    OPERATION_AFFORDS_PAGE_PATH,
    OPERATIONS_FLEETS_PAGE_PATH,
    REQUESTS_FLEET_NEW_PAGE_PATH,
    REQUESTS_FLEET_EDIT_PAGE_PATH,
    REQUESTS_CLEARANCES_PAGE_PATH,
    OPERATIONS_TRANSFERS_PAGE_PATH,
    OPERATIONS_CLEARANCES_PAGE_PATH,
    REQUESTS_CLEARANCE_NEW_PAGE_PATH,
    REQUESTS_CLEARANCE_EDIT_PAGE_PATH,
    OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH,
} from "../../helpers/constants";

// Component
function AppLayout({toast, user, notifications, requests, dispatch}) {
    // User effect
    useLayoutEffect(() => {
       if(is_mobile()) {
           // Close drawer after any app page loading (link clicked)
           document.getElementsByTagName('body')[0].classList.remove('sidebar-open')
           document.getElementsByTagName('body')[0].classList.add('sidebar-collapse')
       }
    }, [requests.currentPath]);

    useEffect(() => {
        // Ask user permission for desktop notification
        if (Notification.permission !== "denied") {
            Notification.requestPermission()
        }
        // First call
        let intervalValue = setInterval(() => {
            dispatch(emitUnreadNotificationsFetch());
            /*if(!processingRequest(UNREAD_NOTIFICATIONS_SCOPE, requests.list)) {
                // Call while previous request is over
                dispatch(emitUnreadNotificationsFetch())
            }*/
        }, 6000);
        // Cleaner interval to avoid infinite loop or performance break
        return () => {
            clearInterval(intervalValue)
        }
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <>
            <ToastAlert toast={toast} dispatch={dispatch} playSound={user.setting.sound} />
            <div className="wrapper">
                <NavBar user={user} dispatch={dispatch} unreadNotifications={notifications.unread} />
                <SideBar user={user} requests={requests} />
                <Switch>
                    {/* Common pages */}
                    <RestrictedRoute path={LISTING_PAGE_PATH} exact component={ListingPage} />
                    <RestrictedRoute path={PROFILE_PAGE_PATH} exact component={ProfilePage} />
                    <RestrictedRoute path={SETTINGS_PAGE_PATH} exact component={SettingsPage} />
                    <RestrictedRoute path={DASHBOARD_PAGE_PATH} exact component={DashboardPage} />
                    <RestrictedRoute path={NOTIFICATIONS_PAGE_PATH} exact component={NotificationsPage} />
                    {/* Network pages */}
                    <RestrictedRoute path={NETWORK_FLEETS_PAGE_PATH} exact component={NetworkFleetsPage} />
                    {/* Requests Fleets pages */}
                    <RestrictedRoute path={REQUESTS_FLEETS_PAGE_PATH} exact component={RequestsFleetsPage} />
                    <RestrictedRoute path={REQUESTS_FLEET_NEW_PAGE_PATH} exact component={RequestsFleetsNewPage} />
                    <RestrictedRoute path={`${REQUESTS_FLEET_EDIT_PAGE_PATH}/:id`} exact component={RequestsFleetsEditPage} customPath={REQUESTS_FLEET_EDIT_PAGE_PATH} />
                    {/* Requests Clearances pages */}
                    <RestrictedRoute path={REQUESTS_CLEARANCES_PAGE_PATH} exact component={RequestsClearancesPage} />
                    <RestrictedRoute path={REQUESTS_CLEARANCE_NEW_PAGE_PATH} exact component={RequestsClearancesNewPage} />
                    <RestrictedRoute path={`${REQUESTS_CLEARANCE_EDIT_PAGE_PATH}/:id`} exact component={RequestsClearancesEditPage} customPath={REQUESTS_CLEARANCE_EDIT_PAGE_PATH} />
                    {/* Operations pages */}
                    <RestrictedRoute path={OPERATIONS_FLEETS_PAGE_PATH} exact component={OperationsFleetsPage} />
                    <RestrictedRoute path={OPERATION_AFFORDS_PAGE_PATH} exact component={OperationsAffordsPage} />
                    <RestrictedRoute path={OPERATIONS_TRANSFERS_PAGE_PATH} exact component={OperationsTransfersPage} />
                    <RestrictedRoute path={OPERATIONS_CLEARANCES_PAGE_PATH} exact component={OperationsClearancesPage} />
                    <RestrictedRoute path={OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH} exact component={OperationsAnonymousFleetsPage} />
                    {/* Checkout */}
                    <RestrictedRoute path={HANDING_OVER_PAGE_PATH} exact component={HandingOverPage} />
                    <RestrictedRoute path={CHECKOUT_OUTLAYS_PAGE_PATH} exact component={CheckoutOutlaysPage} />
                    <RestrictedRoute path={CHECKOUT_PAYMENTS_PAGE_PATH} exact component={CheckoutPaymentsPage} />
                    {/* Recoveries pages */}
                    <RestrictedRoute path={RECOVERIES_CASH_PAGE_PATH} exact component={RecoveriesCashPage} />
                    <RestrictedRoute path={RECOVERIES_FLEETS_PAGE_PATH} exact component={RecoveriesFleetsPage} />
                    {/* Operators pages */}
                    <RestrictedRoute path={OPERATORS_PAGE_PATH} exact component={OperatorsPage} />
                    <RestrictedRoute path={OPERATOR_NEW_PAGE_PATH} exact component={OperatorsNewPage} />
                    <RestrictedRoute path={`${OPERATOR_EDIT_PAGE_PATH}/:id`} exact component={OperatorsEditPage} customPath={OPERATOR_EDIT_PAGE_PATH} />
                    {/* Zones pages */}
                    <RestrictedRoute path={ZONES_PAGE_PATH} exact component={ZonesPage} />
                    <RestrictedRoute path={ZONE_NEW_PAGE_PATH} exact component={ZonesNewPage} />
                    <RestrictedRoute path={`${ZONE_EDIT_PAGE_PATH}/:id`} exact component={ZonesEditPage} customPath={ZONE_EDIT_PAGE_PATH} />
                    {/* Sims pages */}
                    <RestrictedRoute path={SIMS_PAGE_PATH} exact component={SimsPage} />
                    <RestrictedRoute path={SIM_NEW_PAGE_PATH} exact component={SimsNewPage} />
                    <RestrictedRoute path={`${SIM_EDIT_PAGE_PATH}/:id`} exact component={SimsEditPage} customPath={SIM_EDIT_PAGE_PATH} />
                    {/* Users pages */}
                    <RestrictedRoute path={USERS_PAGE_PATH} exact component={UsersPage} />
                    <RestrictedRoute path={USER_NEW_PAGE_PATH} exact component={UsersNewPage} />
                    <RestrictedRoute path={`${USER_EDIT_PAGE_PATH}/:id`} exact component={UsersEditPage} customPath={USER_EDIT_PAGE_PATH} />
                    {/* Collectors pages */}
                    <RestrictedRoute path={COLLECTORS_PAGE_PATH} exact component={CollectorsPage} />
                    <RestrictedRoute path={COLLECTOR_NEW_PAGE_PATH} exact component={CollectorsNewPage} />
                    <RestrictedRoute path={COLLECTOR_FLEETS_PAGE_PATH} exact component={CollectorsFleetsPage} />
                    <RestrictedRoute path={`${COLLECTOR_EDIT_PAGE_PATH}/:id`} exact component={CollectorsEditPage} customPath={COLLECTOR_EDIT_PAGE_PATH} />
                    {/* Agents pages */}
                    <RestrictedRoute path={AGENTS_PAGE_PATH} exact component={AgentsPage} />
                    <RestrictedRoute path={AGENT_NEW_PAGE_PATH} exact component={AgentsNewPage} />
                    <RestrictedRoute path={`${AGENT_EDIT_PAGE_PATH}/:id`} exact component={AgentsEditPage} customPath={AGENT_EDIT_PAGE_PATH} />
                    {/* Companies pages */}
                    <RestrictedRoute path={COMPANIES_PAGE_PATH} exact component={CompaniesPage} />
                    <RestrictedRoute path={COMPANY_NEW_PAGE_PATH} exact component={CompaniesNewPage} />
                    <RestrictedRoute path={`${COMPANY_EDIT_PAGE_PATH}/:id`} exact component={CompaniesEditPage} customPath={COMPANY_EDIT_PAGE_PATH} />
                    {/* 404 page */}
                    <Route path="*" exact component={asyncComponent(() => import('../../pages/error/NotFoundPage'))} />
                </Switch>
                <Footer />
            </div>
        </>
    )
}

// Check if the browser is on a mobile phone
function is_mobile() {
    let check = false;
    // eslint-disable-next-line
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

// Prop types to ensure destroyed props data type
AppLayout.propTypes = {
    user: PropTypes.object.isRequired,
    toast: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    requests: PropTypes.object.isRequired,
};

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action)}
});

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    toast: state.toast,
    requests: state.requests,
    notifications: state.notifications,
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
