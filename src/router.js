import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import asyncComponent from './helpers/asyncComponent';
import PublicRoute from "./components/router/PublicRoute";

// Component
function AppRoutes({history}) {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                {/* Available pages on guest mode */}
                <PublicRoute exact path="/" component={asyncComponent(() => import('./containers/checkUserContainer'))} />
                {/* Available pages on auth mode */}
                {/*<RestrictedRoute
                    path={APP_PAGE_PATH}
                    component={asyncComponent(() => import('./components/layout/AppLayout'))}
                />*/}
                {/* 404 page */}
                <Route component={asyncComponent(() => import('./pages/NotFoundPage'))} />
            </Switch>
        </ConnectedRouter>
    );
}

export default React.memo(AppRoutes);
