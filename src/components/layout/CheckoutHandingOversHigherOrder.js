import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {storeCurrentPath} from "../../redux/requests/actions";
import {HANDING_OVER_PAGE_PATH} from "../../helpers/constants";
import {emitHandoversFetch} from "../../redux/handovers/actions";
import {
    UserContext,
    UsersContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    HandoversContext,
} from '../../helpers/contexts'

// Component
function HandingOverHigherOrder(WrappedComponent) {
    // Higher order component
    class HandingOverHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === HANDING_OVER_PAGE_PATH) {
                // List page
                dispatch(emitHandoversFetch());
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {user, errors, requests, dispatch, handovers, users} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <UsersContext.Provider value={users}>
                        <ErrorsContext.Provider value={errors}>
                            <RequestsContext.Provider value={requests}>
                                <DispatchContext.Provider value={dispatch}>
                                    <HandoversContext.Provider value={handovers}>
                                        <WrappedComponent />
                                    </HandoversContext.Provider>
                                </DispatchContext.Provider>
                            </RequestsContext.Provider>
                        </ErrorsContext.Provider>
                    </UsersContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    HandingOverHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        users: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
        handovers: PropTypes.object.isRequired,
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        user: state.user,
        users: state.users,
        errors: state.errors,
        requests: state.requests,
        handovers: state.handovers,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(HandingOverHigherOrderClass);
}

export default HandingOverHigherOrder;
