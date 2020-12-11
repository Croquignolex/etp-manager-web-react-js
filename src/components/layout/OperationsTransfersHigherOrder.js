import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {storeCurrentPath} from "../../redux/requests/actions";
import {emitTransfersFetch} from "../../redux/transfers/actions";
import {OPERATIONS_TRANSFERS_PAGE_PATH} from "../../helpers/constants";
import {
    UserContext,
    SimsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    TransfersContext,
} from '../../helpers/contexts'

// Component
function OperationsTransfersHigherOrder(WrappedComponent) {
    // Higher order component
    class OperationsTransfersHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === OPERATIONS_TRANSFERS_PAGE_PATH) {
                // List page
                dispatch(emitTransfersFetch());
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {user, errors, requests, dispatch, sims, transfers} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <SimsContext.Provider value={sims}>
                        <ErrorsContext.Provider value={errors}>
                            <TransfersContext.Provider value={transfers}>
                                <RequestsContext.Provider value={requests}>
                                    <DispatchContext.Provider value={dispatch}>
                                        <WrappedComponent />
                                    </DispatchContext.Provider>
                                </RequestsContext.Provider>
                            </TransfersContext.Provider>
                        </ErrorsContext.Provider>
                    </SimsContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    OperationsTransfersHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        sims: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
        transfers: PropTypes.object.isRequired,
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        user: state.user,
        sims: state.sims,
        errors: state.errors,
        requests: state.requests,
        transfers: state.transfers,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(OperationsTransfersHigherOrderClass);
}

export default OperationsTransfersHigherOrder;
