import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import * as path from "./constants/pagePathConstants";
import asyncComponent from './components/asyncComponent';
import {NotificationContainer} from "react-notifications";
import PublicRouteContainer from "./containers/PublicRouteContainer";
import RestrictedRouteContainer from "./containers/RestrictedRouteContainer";

// Component
function AppRoutes() {
    return (
        <Router>
            <NotificationContainer />
            <Switch>
                {/* Available pages on guest mode */}
                <PublicRouteContainer exact path="/" component={asyncComponent(() => import('./containers/CheckUserContainer'))} />
                {/* Available pages on auth mode */}
                {/* Common pages */}
                <RestrictedRouteContainer exact path={path.HOME_PAGE_PATH} component={asyncComponent(() => import('./pages/HomePage'))} />
                <RestrictedRouteContainer exact path={path.PROFILE_PAGE_PATH} component={asyncComponent(() => import('./pages/ProfilePage'))} />
                <RestrictedRouteContainer exact path={path.SETTINGS_PAGE_PATH} component={asyncComponent(() => import('./containers/SettingsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.DASHBOARD_PAGE_PATH} component={asyncComponent(() => import('./containers/DashboardPageContainer'))} />
                <RestrictedRouteContainer exact path={path.NOTIFICATIONS_PAGE_PATH} component={asyncComponent(() => import('./containers/notifications/NotificationsPageContainer'))} />
                {/* Requests pages */}
                <RestrictedRouteContainer exact path={path.REQUESTS_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/requests/RequestsFleetsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.REQUESTS_CLEARANCES_PAGE_PATH} component={asyncComponent(() => import('./containers/requests/RequestsClearancesPageContainer'))} />
                {/* Checkouts */}
                <RestrictedRouteContainer exact path={path.CHECKOUT_HANDING_OVER_PAGE_PATH} component={asyncComponent(() => import('./containers/checkout/CheckoutHandoversPageContainer'))} />
                <RestrictedRouteContainer exact path={path.CHECKOUT_INTERNAL_OUTLAYS_PAGE_PATH} component={asyncComponent(() => import('./containers/checkout/CheckoutOutlaysPageContainer'))} />
                <RestrictedRouteContainer exact path={path.CHECKOUT_INTERNAL_PAYMENTS_PAGE_PATH} component={asyncComponent(() => import('./containers/checkout/CheckoutPaymentsPageContainer'))} />
                {/* Recoveries */}
                <RestrictedRouteContainer exact path={path.RECOVERIES_CASH_PAGE_PATH} component={asyncComponent(() => import('./containers/recoveries/RecoveriesCashPageContainer'))} />
                <RestrictedRouteContainer exact path={path.RECOVERIES_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/recoveries/RecoveriesFleetsPageContainer'))} />
                {/* Operations */}
                <RestrictedRouteContainer exact path={path.OPERATIONS_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsFleetsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.OPERATION_AFFORDS_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsAffordsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.OPERATIONS_TRANSFERS_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsTransfersPageContainer'))} />
                <RestrictedRouteContainer exact path={path.OPERATIONS_CLEARANCES_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsClearancesPageContainer'))} />
                {/* Sims */}
                <RestrictedRouteContainer exact path={path.FLEETS_SIMS_PAGE_PATH} component={asyncComponent(() => import('./containers/sims/FleetSimsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.COLLECTORS_SIMS_PAGE_PATH} component={asyncComponent(() => import('./containers/sims/CollectorSimsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.AGENTS_SIMS_PAGE_PATH} component={asyncComponent(() => import('./containers/sims/AgentSimsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.RESOURCES_SIMS_PAGE_PATH} component={asyncComponent(() => import('./containers/sims/ResourceSimsPageContainer'))} />
                {/* Other pages */}
                <RestrictedRouteContainer exact path={path.AGENTS_PAGE_PATH} component={asyncComponent(() => import('./containers/agents/AgentsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.VENDORS_PAGE_PATH} component={asyncComponent(() => import('./containers/vendors/VendorsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.RESOURCES_PAGE_PATH} component={asyncComponent(() => import('./containers/resources/ResourcesPageContainer'))} />
                {/* Report */}
                <RestrictedRouteContainer exact path={path.MOVEMENTS_PAGE_PATH} component={asyncComponent(() => import('./containers/reports/MovementsReportsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.TRANSACTIONS_PAGE_PATH} component={asyncComponent(() => import('./containers/reports/TransactionsReportsPageContainer'))} />
                {/* 404 page */}
                <Route component={asyncComponent(() => import('./pages/NotFoundPage'))} />
            </Switch>
        </Router>
    );
}

export default React.memo(AppRoutes);
