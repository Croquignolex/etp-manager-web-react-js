import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Route, Redirect } from 'react-router-dom';

import {accessRequiredRoles} from "../../helpers/functions";
import {LOGIN_PAGE_PATH, PROFILE_PAGE_PATH} from "../../helpers/constants";

// Component
const RestrictedRoute = ({ component: Component, user, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            user.isLoggedIn ?
                (
                    accessRequiredRoles((rest.customPath ? rest.customPath : rest.path), user.role.name)
                        ? <Component {...props} />
                        : <Redirect to={{pathname: PROFILE_PAGE_PATH}} />
                )
                : <Redirect to={{pathname: LOGIN_PAGE_PATH}} />
        }
    />
);

// Prop types to ensure destroyed props data type
RestrictedRoute.propTypes = {
    rest: PropTypes.object,
    user: PropTypes.object.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
});

// Connect component to Redux
export default connect(mapStateToProps)(RestrictedRoute);
