import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {
    SimsContext,
    UserContext,
    AgentsContext,
    ErrorsContext,
    FleetsContext,
    DispatchContext,
    RequestsContext,
    ClearancesContext,
} from '../../helpers/contexts'

// Component
function CollectorDashboardHigherOrder(WrappedComponent) {
    // Higher order component
    class CollectorDashboardHigherOrderClass extends React.Component {

        render() {
            // All store
            const {
                user, errors, requests, dispatch, fleets, agents, clearances, sims} = this.props;

            return (
                <SimsContext.Provider value={sims}>
                    <UserContext.Provider value={user}>
                        <ErrorsContext.Provider value={errors}>
                            <FleetsContext.Provider value={fleets}>
                                <AgentsContext.Provider value={agents}>
                                    <RequestsContext.Provider value={requests}>
                                        <DispatchContext.Provider value={dispatch}>
                                            <ClearancesContext.Provider value={clearances}>
                                                <WrappedComponent />
                                            </ClearancesContext.Provider>
                                        </DispatchContext.Provider>
                                    </RequestsContext.Provider>
                                </AgentsContext.Provider>
                            </FleetsContext.Provider>
                        </ErrorsContext.Provider>
                    </UserContext.Provider>
                </SimsContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    CollectorDashboardHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        sims: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        fleets: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
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
        agents: state.agents,
        errors: state.errors,
        fleets: state.fleets,
        requests: state.requests,
        clearances: state.clearances,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(CollectorDashboardHigherOrderClass);
}

export default CollectorDashboardHigherOrder;
