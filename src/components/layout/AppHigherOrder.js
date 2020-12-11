import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {emitNotificationsFetch} from "../../redux/notifications/actions";
import {
    LOGIN_PAGE,
    PROFILE_PAGE,
    SETTINGS_PAGE,
    LOGIN_PAGE_PATH,
    PROFILE_PAGE_PATH,
    NOTIFICATIONS_PAGE,
    SETTINGS_PAGE_PATH,
    NOTIFICATIONS_PAGE_PATH
} from "../../helpers/constants";
import {
    UserContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    NotificationsContext
} from '../../helpers/contexts'

// Component
function AppHigherOrder(WrappedComponent) {
    // Higher order component
    class AppHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === LOGIN_PAGE_PATH) {
                document.title = getPageTitle(LOGIN_PAGE);
            } else if(path === SETTINGS_PAGE_PATH) {
                document.title = getPageTitle(SETTINGS_PAGE);
            } else if(path === PROFILE_PAGE_PATH) {
                document.title = getPageTitle(PROFILE_PAGE);
            } else if(path === NOTIFICATIONS_PAGE_PATH) {
                dispatch(emitNotificationsFetch())
                document.title = getPageTitle(NOTIFICATIONS_PAGE);
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {requests, errors, user, notifications, dispatch} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <ErrorsContext.Provider value={errors}>
                        <RequestsContext.Provider value={requests}>
                            <DispatchContext.Provider value={dispatch}>
                                <NotificationsContext.Provider value={notifications}>
                                    <WrappedComponent />
                                </NotificationsContext.Provider>
                            </DispatchContext.Provider>
                        </RequestsContext.Provider>
                    </ErrorsContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    AppHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired,
        notifications: PropTypes.object.isRequired,
    };

    // Map state function to component props
    const mapStateToProps = (state) => ({
        user: state.user,
        errors: state.errors,
        requests: state.requests,
        notifications: state.notifications,
    });

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(AppHigherOrderClass);
}

export default AppHigherOrder;
