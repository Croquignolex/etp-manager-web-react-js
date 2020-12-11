import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {emitZonesFetch} from "../../redux/zones/actions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {emitAgentFetch, emitAgentsFetch} from "../../redux/agents/actions";
import {
    UserContext,
    ZonesContext,
    ErrorsContext,
    AgentsContext,
    RequestsContext,
    DispatchContext,
    SimsTypesContext,
    OperatorsContext
} from '../../helpers/contexts'
import {
    AGENT_NEW_PAGE,
    AGENT_EDIT_PAGE,
    ALL_AGENTS_PAGE,
    AGENTS_PAGE_PATH,
    AGENT_NEW_PAGE_PATH,
    AGENT_EDIT_PAGE_PATH,
} from "../../helpers/constants";

// Component
function AgentsHigherOrder(WrappedComponent) {
    // Higher order component
    class AgentsHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === AGENT_NEW_PAGE_PATH) {
                dispatch(emitZonesFetch());
                document.title = getPageTitle(AGENT_NEW_PAGE);
            } else if(path === AGENTS_PAGE_PATH) {
                dispatch(emitAgentsFetch());
                document.title = getPageTitle(ALL_AGENTS_PAGE);
            } else if (path ===`${AGENT_EDIT_PAGE_PATH}/:id`) {
                document.title = getPageTitle(AGENT_EDIT_PAGE);
                dispatch(emitAgentFetch({id: match.params.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {requests, errors, dispatch, agents, zones,
                user, operators, simsTypes, match} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <ZonesContext.Provider value={zones}>
                        <AgentsContext.Provider value={agents}>
                            <ErrorsContext.Provider value={errors}>
                                <RequestsContext.Provider value={requests}>
                                    <DispatchContext.Provider value={dispatch}>
                                        <OperatorsContext.Provider value={operators}>
                                            <SimsTypesContext.Provider value={simsTypes}>
                                                <WrappedComponent match={match} />
                                            </SimsTypesContext.Provider>
                                        </OperatorsContext.Provider>
                                    </DispatchContext.Provider>
                                </RequestsContext.Provider>
                            </ErrorsContext.Provider>
                        </AgentsContext.Provider>
                    </ZonesContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    AgentsHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        zones: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        agents: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
        operators: PropTypes.object.isRequired,
        simsTypes: PropTypes.object.isRequired,
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        user: state.user,
        zones: state.zones,
        agents: state.agents,
        errors: state.errors,
        requests: state.requests,
        simsTypes: state.simsTypes,
        operators: state.operators,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(AgentsHigherOrderClass);
}

export default AgentsHigherOrder;
