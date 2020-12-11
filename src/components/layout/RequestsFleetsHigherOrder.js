import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {emitAgentsFetch} from "../../redux/agents/actions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {
    UserContext,
    SimsContext,
    AgentsContext,
    FleetsContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
} from '../../helpers/contexts'
import {
    AGENT_ROLE,
    COLLECTOR_ROLE,
    ADMIN_MANAGER_ROLE,
    REQUESTS_FLEETS_PAGE,
    REQUESTS_FLEET_NEW_PAGE,
    REQUESTS_FLEET_EDIT_PAGE,
    REQUESTS_FLEETS_PAGE_PATH,
    REQUESTS_FLEET_NEW_PAGE_PATH,
    REQUESTS_FLEET_EDIT_PAGE_PATH,
} from "../../helpers/constants";
import {
    emitFleetFetchByAgent,
    emitFleetsFetchByAgent,
    emitFleetFetchByManager,
    emitFleetsFetchByManager,
    emitFleetFetchByCollector,
    emitFleetsFetchByCollector
} from "../../redux/fleets/actions";

// Component
function RequestsFleetsHigherOrder(WrappedComponent) {
    // Higher order component
    class RequestsFleetsHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match, user} = this.props;
            const path = match.path;

            const agentProcess = AGENT_ROLE.includes(user.role.name);
            const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
            const adminManagerProcess = ADMIN_MANAGER_ROLE.includes(user.role.name);

            if(path === REQUESTS_FLEET_NEW_PAGE_PATH) {
                // List page
                document.title = getPageTitle(REQUESTS_FLEET_NEW_PAGE);
                collectorProcess && dispatch(emitAgentsFetch());
            } else if(path === REQUESTS_FLEETS_PAGE_PATH) {
                // Creation page
                agentProcess && dispatch(emitFleetsFetchByAgent());
                document.title = getPageTitle(REQUESTS_FLEETS_PAGE);
                collectorProcess && dispatch(emitFleetsFetchByCollector());
                adminManagerProcess && dispatch(emitFleetsFetchByManager());
            } else if (path ===`${REQUESTS_FLEET_EDIT_PAGE_PATH}/:id`) {
                // Edit page
                document.title = getPageTitle(REQUESTS_FLEET_EDIT_PAGE);
                agentProcess && dispatch(emitFleetFetchByAgent({id: match.params.id}));
                collectorProcess && dispatch(emitFleetFetchByCollector({id: match.params.id}));
                adminManagerProcess && dispatch(emitFleetFetchByManager({id: match.params.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {requests, errors, dispatch, user, agents, fleets, sims} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <SimsContext.Provider value={sims}>
                        <FleetsContext.Provider value={fleets}>
                            <AgentsContext.Provider value={agents}>
                                <ErrorsContext.Provider value={errors}>
                                    <RequestsContext.Provider value={requests}>
                                        <DispatchContext.Provider value={dispatch}>
                                            <WrappedComponent />
                                        </DispatchContext.Provider>
                                    </RequestsContext.Provider>
                                </ErrorsContext.Provider>
                            </AgentsContext.Provider>
                        </FleetsContext.Provider>
                    </SimsContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    RequestsFleetsHigherOrderClass.propTypes = {
        sims: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        fleets: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        sims: state.sims,
        user: state.user,
        agents: state.agents,
        errors: state.errors,
        fleets: state.fleets,
        requests: state.requests
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(RequestsFleetsHigherOrderClass);
}

export default RequestsFleetsHigherOrder;
