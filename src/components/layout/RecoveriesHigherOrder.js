import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {
    UserContext,
    SimsContext,
    AgentsContext,
    ErrorsContext,
    RefuelsContext,
    DispatchContext,
    RequestsContext,
    SuppliesContext,
    RecoveriesContext,
} from '../../helpers/contexts'
import {
    AGENT_ROLE,
    COLLECTOR_ROLE,
    ADMIN_MANAGER_ROLE,
    RECOVERIES_CASH_PAGE,
    RECOVERIES_FLEET_PAGE,
    RECOVERIES_CASH_PAGE_PATH,
    RECOVERIES_FLEETS_PAGE_PATH,
} from "../../helpers/constants";
import {
    emitCashRecoveriesFetchByAgent,
    emitFleetRecoveriesFetchByAgent,
    emitCashRecoveriesFetchByManager,
    emitFleetRecoveriesFetchByManager,
    emitCashRecoveriesFetchByCollector,
    emitFleetRecoveriesFetchByCollector
} from "../../redux/recoveries/actions";

// Component
function RecoveriesHigherOrder(WrappedComponent) {
    // Higher order component
    class RecoveriesHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match, user} = this.props;
            const path = match.path;

            const agentProcess = AGENT_ROLE.includes(user.role.name);
            const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
            const adminManagerProcess = ADMIN_MANAGER_ROLE.includes(user.role.name);

            if(path === RECOVERIES_CASH_PAGE_PATH) {
                // List
                document.title = getPageTitle(RECOVERIES_CASH_PAGE);
                adminManagerProcess && dispatch(emitCashRecoveriesFetchByManager());
                agentProcess && dispatch(emitCashRecoveriesFetchByAgent({id: user.id}));
                collectorProcess && dispatch(emitCashRecoveriesFetchByCollector({id: user.id}));
            } else if(path === RECOVERIES_FLEETS_PAGE_PATH) {
                // List
                document.title = getPageTitle(RECOVERIES_FLEET_PAGE);
                adminManagerProcess && dispatch(emitFleetRecoveriesFetchByManager());
                agentProcess && dispatch(emitFleetRecoveriesFetchByAgent({id: user.id}));
                collectorProcess && dispatch(emitFleetRecoveriesFetchByCollector({id: user.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {
                user, errors, requests, dispatch, recoveries,
                refuels, agents, supplies, sims
            } = this.props;

            return (
                <UserContext.Provider value={user}>
                    <SimsContext.Provider value={sims}>
                        <ErrorsContext.Provider value={errors}>
                            <AgentsContext.Provider value={agents}>
                                <RefuelsContext.Provider value={refuels}>
                                    <RequestsContext.Provider value={requests}>
                                        <SuppliesContext.Provider value={supplies}>
                                            <DispatchContext.Provider value={dispatch}>
                                                <RecoveriesContext.Provider value={recoveries}>
                                                    <WrappedComponent />
                                                </RecoveriesContext.Provider>
                                            </DispatchContext.Provider>
                                        </SuppliesContext.Provider>
                                    </RequestsContext.Provider>
                                </RefuelsContext.Provider>
                            </AgentsContext.Provider>
                        </ErrorsContext.Provider>
                    </SimsContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    RecoveriesHigherOrderClass.propTypes = {
        sims: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired,
        supplies: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
        recoveries: PropTypes.object.isRequired,
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
        requests: state.requests,
        supplies: state.supplies,
        recoveries: state.recoveries,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(RecoveriesHigherOrderClass);
}

export default RecoveriesHigherOrder;
