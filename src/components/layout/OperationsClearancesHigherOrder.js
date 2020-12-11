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
} from '../../helpers/contexts'
import {
    ADMIN_MANAGER_ROLE,
    OPERATIONS_AFFORDS_PAGE,
    AGENT_ROLE, COLLECTOR_ROLE,
    OPERATIONS_CLEARANCES_PAGE,
    OPERATION_AFFORDS_PAGE_PATH,
    OPERATIONS_CLEARANCES_PAGE_PATH,
} from "../../helpers/constants";
import {
    emitRefuelsFetchByAgent,
    emitRefuelsFetchByManager,
    emitAffordsFetchByManager,
    emitAffordsFetchByCollector,
    emitRefuelsFetchByCollector,
} from "../../redux/refuels/actions";

// Component
function OperationsClearancesHigherOrder(WrappedComponent) {
    // Higher order component
    class OperationsClearancesHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match, user} = this.props;
            const path = match.path;

            const agentProcess = AGENT_ROLE.includes(user.role.name);
            const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
            const adminManagerProcess = ADMIN_MANAGER_ROLE.includes(user.role.name);

            if(path === OPERATIONS_CLEARANCES_PAGE_PATH) {
                // List
                document.title = getPageTitle(OPERATIONS_CLEARANCES_PAGE);
                adminManagerProcess && dispatch(emitRefuelsFetchByManager());
                agentProcess && dispatch(emitRefuelsFetchByAgent({id: user.id}));
                collectorProcess && dispatch(emitRefuelsFetchByCollector({id: user.id}));
            } else if(path === OPERATION_AFFORDS_PAGE_PATH) {
                // List
                document.title = getPageTitle(OPERATIONS_AFFORDS_PAGE);
                adminManagerProcess && dispatch(emitAffordsFetchByManager());
                collectorProcess && dispatch(emitAffordsFetchByCollector({id: user.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {user, errors, requests, dispatch, sims, refuels, agents} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <SimsContext.Provider value={sims}>
                        <ErrorsContext.Provider value={errors}>
                            <AgentsContext.Provider value={agents}>
                                <RefuelsContext.Provider value={refuels}>
                                    <RequestsContext.Provider value={requests}>
                                        <DispatchContext.Provider value={dispatch}>
                                            <WrappedComponent />
                                        </DispatchContext.Provider>
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
    OperationsClearancesHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        sims: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired,
        refuels: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
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
        refuels: state.refuels,
        requests: state.requests,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(OperationsClearancesHigherOrderClass);
}

export default OperationsClearancesHigherOrder;
