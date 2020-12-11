import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {emitAgentsFetch} from "../../redux/agents/actions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {emitSimsTypesFetch} from "../../redux/simsTypes/actions";
import {emitOperatorsFetch} from "../../redux/operators/actions";
import {emitCompaniesFetch} from "../../redux/companies/actions";
import {emitCollectorsFetch} from "../../redux/collectors/actions";
import {emitSimFetch, emitSimsFetch} from "../../redux/sims/actions";
import {
    UserContext,
    SimsContext,
    AgentsContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    OperatorsContext,
    SimsTypesContext,
    CompaniesContext,
    CollectorsContext,
} from '../../helpers/contexts'
import {
    SIM_NEW_PAGE,
    ALL_SIMS_PAGE,
    SIM_EDIT_PAGE,
    SIMS_PAGE_PATH,
    SIM_NEW_PAGE_PATH,
    SIM_EDIT_PAGE_PATH,
} from "../../helpers/constants";

// Component
function SimsHigherOrder(WrappedComponent) {
    // Higher order component
    class SimsHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === SIM_NEW_PAGE_PATH) {
                dispatch(emitAgentsFetch());
                dispatch(emitSimsTypesFetch());
                dispatch(emitOperatorsFetch());
                dispatch(emitCompaniesFetch());
                dispatch(emitCollectorsFetch());
                document.title = getPageTitle(SIM_NEW_PAGE);
            } else if(path === SIMS_PAGE_PATH) {
                dispatch(emitSimsFetch());
                document.title = getPageTitle(ALL_SIMS_PAGE);
            } else if (path ===`${SIM_EDIT_PAGE_PATH}/:id`) {
                document.title = getPageTitle(SIM_EDIT_PAGE);
                dispatch(emitSimFetch({id: match.params.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {
                requests, errors, dispatch, sims, companies,
                simsTypes, operators, user, agents, collectors
            } = this.props;

            return (
                <UserContext.Provider value={user}>
                    <SimsContext.Provider value={sims}>
                        <AgentsContext.Provider value={agents}>
                            <ErrorsContext.Provider value={errors}>
                                <RequestsContext.Provider value={requests}>
                                    <DispatchContext.Provider value={dispatch}>
                                        <SimsTypesContext.Provider value={simsTypes}>
                                            <OperatorsContext.Provider value={operators}>
                                                <CompaniesContext.Provider value={companies}>
                                                    <CollectorsContext.Provider value={collectors}>
                                                        <WrappedComponent />
                                                    </CollectorsContext.Provider>
                                                </CompaniesContext.Provider>
                                            </OperatorsContext.Provider>
                                        </SimsTypesContext.Provider>
                                    </DispatchContext.Provider>
                                </RequestsContext.Provider>
                            </ErrorsContext.Provider>
                        </AgentsContext.Provider>
                    </SimsContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    SimsHigherOrderClass.propTypes = {
        sims: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired,
        simsTypes: PropTypes.object.isRequired,
        operators: PropTypes.object.isRequired,
        companies: PropTypes.object.isRequired,
        collectors: PropTypes.object.isRequired,
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        sims: state.sims,
        user: state.user,
        errors: state.errors,
        agents: state.agents,
        requests: state.requests,
        simsTypes: state.simsTypes,
        operators: state.operators,
        companies: state.companies,
        collectors: state.collectors,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(SimsHigherOrderClass);
}

export default SimsHigherOrder;
