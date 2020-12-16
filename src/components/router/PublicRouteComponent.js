import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from 'react-router-dom';

import {APP_PAGE_PATH} from "../../constants/pagePathConstants";

// Component
const PublicRouteComponent = ({ component: Component, user, dispatch, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !user.isLoggedIn
                ? <Component {...props} />
                : <Redirect to={{pathname: APP_PAGE_PATH}} />
        }
    />
);

// Prop types to ensure destroyed props data type
PublicRouteComponent.propTypes = {
    rest: PropTypes.object,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired,
};

// Connect component to Redux
export default React.memo(PublicRouteComponent);
