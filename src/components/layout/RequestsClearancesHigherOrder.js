import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {emitAgentsFetch} from "../../redux/agents/actions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {
    UserContext,
    AgentsContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    ClearancesContext,
} from '../../helpers/contexts'
import {
    AGENT_ROLE,
    COLLECTOR_ROLE,
    ADMIN_MANAGER_ROLE,
    REQUESTS_CLEARANCES_PAGE,
    REQUESTS_CLEARANCE_NEW_PAGE,
    REQUESTS_CLEARANCE_EDIT_PAGE,
    REQUESTS_CLEARANCES_PAGE_PATH,
    REQUESTS_CLEARANCE_NEW_PAGE_PATH,
    REQUESTS_CLEARANCE_EDIT_PAGE_PATH,
} from "../../helpers/constants";
import {
    emitClearanceFetchByAgent,
    emitClearancesFetchByAgent,
    emitClearanceFetchByCollector,
    emitClearancesFetchByCollector
} from "../../redux/clearances/actions";

// Component
function RequestsClearancesHigherOrder(WrappedComponent) {
    // Higher order component
    class RequestsClearancesHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match, user} = this.props;
            const path = match.path;

            const agentProcess = AGENT_ROLE.includes(user.role.name);
            const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
            const adminManagerProcess = ADMIN_MANAGER_ROLE.includes(user.role.name);

            if(path === REQUESTS_CLEARANCE_NEW_PAGE_PATH) {
                // List page
                collectorProcess && dispatch(emitAgentsFetch());
                document.title = getPageTitle(REQUESTS_CLEARANCE_NEW_PAGE);
            } else if(path === REQUESTS_CLEARANCES_PAGE_PATH) {
                // Creation page
                agentProcess && dispatch(emitClearancesFetchByAgent());
                document.title = getPageTitle(REQUESTS_CLEARANCES_PAGE);
                (adminManagerProcess || collectorProcess) && dispatch(emitClearancesFetchByCollector());
            } else if (path ===`${REQUESTS_CLEARANCE_EDIT_PAGE_PATH}/:id`) {
                // Edit page
                document.title = getPageTitle(REQUESTS_CLEARANCE_EDIT_PAGE);
                agentProcess && dispatch(emitClearanceFetchByAgent({id: match.params.id}));
                collectorProcess && dispatch(emitClearanceFetchByCollector({id: match.params.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {requests, errors, dispatch, user, agents, clearances} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <AgentsContext.Provider value={agents}>
                        <ErrorsContext.Provider value={errors}>
                            <RequestsContext.Provider value={requests}>
                                <DispatchContext.Provider value={dispatch}>
                                    <ClearancesContext.Provider value={clearances}>
                                        <WrappedComponent />
                                    </ClearancesContext.Provider>
                                </DispatchContext.Provider>
                            </RequestsContext.Provider>
                        </ErrorsContext.Provider>
                    </AgentsContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    RequestsClearancesHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
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
        agents: state.agents,
        errors: state.errors,
        requests: state.requests,
        clearances: state.clearances
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(RequestsClearancesHigherOrderClass);
}

export default RequestsClearancesHigherOrder;
