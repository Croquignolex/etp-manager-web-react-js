import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {emitOperatorFetch, emitOperatorsFetch} from "../../redux/operators/actions";
import {
    ErrorsContext,
    AgentsContext,
    RequestsContext,
    DispatchContext,
    OperatorsContext,
    SimsTypesContext,
    CompaniesContext,
} from '../../helpers/contexts'
import {
    OPERATOR_NEW_PAGE,
    ALL_OPERATORS_PAGE,
    OPERATOR_EDIT_PAGE,
    OPERATORS_PAGE_PATH,
    OPERATOR_NEW_PAGE_PATH,
    OPERATOR_EDIT_PAGE_PATH,
} from "../../helpers/constants";

// Component
function OperatorsHigherOrder(WrappedComponent) {
    // Higher order component
    class OperatorsHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === OPERATOR_NEW_PAGE_PATH) {
                document.title = getPageTitle(OPERATOR_NEW_PAGE);
            } else if(path === OPERATORS_PAGE_PATH) {
                dispatch(emitOperatorsFetch());
                document.title = getPageTitle(ALL_OPERATORS_PAGE);
            } else if (path ===`${OPERATOR_EDIT_PAGE_PATH}/:id`) {
                document.title = getPageTitle(OPERATOR_EDIT_PAGE);
                dispatch(emitOperatorFetch({id: match.params.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {
                requests, errors, dispatch, agents, simsTypes,
                operators, match, companies
            } = this.props;

            return (
                <AgentsContext.Provider value={agents}>
                    <ErrorsContext.Provider value={errors}>
                        <RequestsContext.Provider value={requests}>
                            <DispatchContext.Provider value={dispatch}>
                                <OperatorsContext.Provider value={operators}>
                                    <SimsTypesContext.Provider value={simsTypes}>
                                        <CompaniesContext.Provider value={companies}>
                                            <WrappedComponent match={match} />
                                        </CompaniesContext.Provider>
                                    </SimsTypesContext.Provider>
                                </OperatorsContext.Provider>
                            </DispatchContext.Provider>
                        </RequestsContext.Provider>
                    </ErrorsContext.Provider>
                </AgentsContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    OperatorsHigherOrderClass.propTypes = {
        match: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        agents: PropTypes.object.isRequired,
        simsTypes: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
        operators: PropTypes.object.isRequired,
        companies: PropTypes.object.isRequired,
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        errors: state.errors,
        agents: state.agents,
        requests: state.requests,
        companies: state.companies,
        operators: state.operators,
        simsTypes: state.simsTypes,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(OperatorsHigherOrderClass);
}

export default OperatorsHigherOrder;
