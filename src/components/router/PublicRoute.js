import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Route, Redirect } from 'react-router-dom';

import {APP_PAGE_PATH} from "../../helpers/constants";

// Component
const PublicRoute = ({ component: Component, user, ...rest }) => (
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
PublicRoute.propTypes = {
    rest: PropTypes.object,
    user: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired,
};

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user
});

// Connect component to Redux
export default connect(mapStateToProps)(PublicRoute);
