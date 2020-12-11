import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {emitRolesFetch} from "../../redux/roles/actions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {emitUserFetch, emitUsersFetch} from "../../redux/users/actions";
import {
    UserContext,
    RolesContext,
    UsersContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
} from '../../helpers/contexts'
import {
    USER_NEW_PAGE,
    ALL_USERS_PAGE,
    USER_EDIT_PAGE,
    USERS_PAGE_PATH,
    USER_NEW_PAGE_PATH,
    USER_EDIT_PAGE_PATH,
} from "../../helpers/constants";

// Component
function UsersHigherOrder(WrappedComponent) {
    // Higher order component
    class UsersHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === USER_NEW_PAGE_PATH) {
                dispatch(emitRolesFetch());
                document.title = getPageTitle(USER_NEW_PAGE);
            } else if(path === USERS_PAGE_PATH) {
                dispatch(emitUsersFetch());
                document.title = getPageTitle(ALL_USERS_PAGE);
            } else if (path ===`${USER_EDIT_PAGE_PATH}/:id`) {
                document.title = getPageTitle(USER_EDIT_PAGE);
                dispatch(emitUserFetch({id: match.params.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {requests, errors, dispatch, users, user, roles} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <UsersContext.Provider value={users}>
                        <RolesContext.Provider value={roles}>
                            <ErrorsContext.Provider value={errors}>
                                <RequestsContext.Provider value={requests}>
                                    <DispatchContext.Provider value={dispatch}>
                                        <WrappedComponent />
                                    </DispatchContext.Provider>
                                </RequestsContext.Provider>
                            </ErrorsContext.Provider>
                        </RolesContext.Provider>
                    </UsersContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    UsersHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        users: PropTypes.object.isRequired,
        roles: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        user: state.user,
        users: state.users,
        roles: state.roles,
        errors: state.errors,
        requests: state.requests,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(UsersHigherOrderClass);
}

export default UsersHigherOrder;
