import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {
    UserContext,
    SimsContext,
    UsersContext,
    ZonesContext,
    AgentsContext,
    FleetsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    OperatorsContext,
    CollectorsContext,
    ClearancesContext,
} from '../../helpers/contexts'

// Component
function AdminDashboardHigherOrder(WrappedComponent) {
    // Higher order component
    class AdminDashboardHigherOrderClass extends React.Component {

        render() {
            // All store
            const {
                user, errors, requests, sims, operators, agents,
                fleets, dispatch, zones, users, collectors, clearances
            } = this.props;

            return (
                <SimsContext.Provider value={sims}>
                    <UserContext.Provider value={user}>
                        <UsersContext.Provider value={users}>
                            <ZonesContext.Provider value={zones}>
                                <FleetsContext.Provider value={fleets}>
                                    <AgentsContext.Provider value={agents}>
                                        <ErrorsContext.Provider value={errors}>
                                            <RequestsContext.Provider value={requests}>
                                                <DispatchContext.Provider value={dispatch}>
                                                    <OperatorsContext.Provider value={operators}>
                                                        <CollectorsContext.Provider value={collectors}>
                                                            <ClearancesContext.Provider value={clearances}>
                                                                <WrappedComponent />
                                                            </ClearancesContext.Provider>
                                                        </CollectorsContext.Provider>
                                                    </OperatorsContext.Provider>
                                                </DispatchContext.Provider>
                                            </RequestsContext.Provider>
                                        </ErrorsContext.Provider>
                                    </AgentsContext.Provider>
                                </FleetsContext.Provider>
                            </ZonesContext.Provider>
                        </UsersContext.Provider>
                    </UserContext.Provider>
                </SimsContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    AdminDashboardHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        sims: PropTypes.object.isRequired,
        users: PropTypes.object.isRequired,
        zones: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired,
        fleets: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
        operators: PropTypes.object.isRequired,
        collectors: PropTypes.object.isRequired,
        clearances: PropTypes.object.isRequired,
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        user: state.user,
        sims: state.sims,
        users: state.users,
        zones: state.zones,
        fleets: state.fleets,
        agents: state.agents,
        errors: state.errors,
        requests: state.requests,
        operators: state.operators,
        collectors: state.collectors,
        clearances: state.clearances,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(AdminDashboardHigherOrderClass);
}

export default AdminDashboardHigherOrder;
