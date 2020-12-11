import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {emitAnonymousFleetsFetch} from "../../redux/anonymous/actions";
import {
    UserContext,
    SimsContext,
    ErrorsContext,
    AgentsContext,
    SuppliesContext,
    DispatchContext,
    RequestsContext,
    AnonymousContext,
} from '../../helpers/contexts'
import {
    AGENT_ROLE,
    COLLECTOR_ROLE,
    ADMIN_MANAGER_ROLE,
    OPERATIONS_FLEETS_PAGE,
    NETWORK_FLEETS_PAGE_PATH,
    OPERATIONS_FLEETS_PAGE_PATH,
    OPERATIONS_ANONYMOUS_FLEETS_PAGE,
    OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH,
} from "../../helpers/constants";
import {
    emitNetworkSuppliesFetch,
    emitSuppliesFetchByAgent,
    emitSuppliesFetchByManager,
    emitSuppliesFetchByCollector
} from "../../redux/supplies/actions";

// Component
function OperationsFleetsHigherOrder(WrappedComponent) {
    // Higher order component
    class OperationsFleetsHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match, user} = this.props;
            const path = match.path;

            const agentProcess = AGENT_ROLE.includes(user.role.name);
            const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
            const adminManagerProcess = ADMIN_MANAGER_ROLE.includes(user.role.name);

            if(path === OPERATIONS_FLEETS_PAGE_PATH) {
                // List page
                document.title = getPageTitle(OPERATIONS_FLEETS_PAGE);
                collectorProcess && dispatch(emitSuppliesFetchByCollector());
                adminManagerProcess && dispatch(emitSuppliesFetchByManager());
                agentProcess && dispatch(emitSuppliesFetchByAgent({id: user.id}));
            } else if(path === NETWORK_FLEETS_PAGE_PATH) {
                // List page
                document.title = getPageTitle(OPERATIONS_FLEETS_PAGE);
                dispatch(emitNetworkSuppliesFetch({id: user.id}));
            } else if(path === OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH) {
                // List page
                document.title = getPageTitle(OPERATIONS_ANONYMOUS_FLEETS_PAGE);
                dispatch(emitAnonymousFleetsFetch());
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {user, errors, requests, dispatch, sims, supplies, agents, anonymous} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <SimsContext.Provider value={sims}>
                        <ErrorsContext.Provider value={errors}>
                            <AgentsContext.Provider value={agents}>
                                <SuppliesContext.Provider value={supplies}>
                                    <RequestsContext.Provider value={requests}>
                                        <DispatchContext.Provider value={dispatch}>
                                            <AnonymousContext.Provider value={anonymous}>
                                                <WrappedComponent />
                                            </AnonymousContext.Provider>
                                        </DispatchContext.Provider>
                                    </RequestsContext.Provider>
                                </SuppliesContext.Provider>
                            </AgentsContext.Provider>
                        </ErrorsContext.Provider>
                    </SimsContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    OperationsFleetsHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        sims: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired,
        supplies: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
        anonymous: PropTypes.object.isRequired,
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
        agents: state.agents,
        supplies: state.supplies,
        requests: state.requests,
        anonymous: state.anonymous,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(OperationsFleetsHigherOrderClass);
}

export default OperationsFleetsHigherOrder;
