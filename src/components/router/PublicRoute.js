import PropTypes from "prop-types";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import { Route, Redirect } from 'react-router-dom';

import {APP_PAGE_PATH} from "../../helpers/constants";
import {storeResetErrorData} from "../../redux/errors/actions";

// Component
const PublicRoute = ({ component: Component, user, dispatch, ...rest }) => {

    useEffect(() => {
        dispatch(storeResetErrorData({scope: 'eeeeeeee'}))
    }, [dispatch]);

    return (
        <Route
            {...rest}
            render={props =>
                !user.isLoggedIn
                    ? <Component {...props} />
                    : <Redirect to={{pathname: APP_PAGE_PATH}} />
            }
        />
    );
}

// Prop types to ensure destroyed props data type
PublicRoute.propTypes = {
    rest: PropTypes.object,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired,
};

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action)}
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
