import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import asyncComponent from './helpers/asyncComponent';
import PublicRoute from "./components/router/PublicRoute";
import RestrictedRoute from "./components/router/RestrictedRoute";
import {APP_PAGE_PATH, LOGIN_PAGE_PATH} from "./helpers/constants";

// Component
function AppRoutes({history}) {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                {/* Available pages on guest mode */}
                <PublicRoute
                    exact
                    path={LOGIN_PAGE_PATH}
                    component={asyncComponent(() => import('./pages/LoginPage'))}
                />
                {/* Available pages on auth mode */}
                <RestrictedRoute
                    path={APP_PAGE_PATH}
                    component={asyncComponent(() => import('./components/layout/AppLayout'))}
                />
                {/* 404 page */}
                <Route component={asyncComponent(() => import('./pages/error/NotFoundPage'))} />
            </Switch>
        </ConnectedRouter>
    );
}

export default React.memo(AppRoutes);
