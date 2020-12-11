import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {emitCompaniesFetch, emitCompanyFetch} from "../../redux/companies/actions";
import {
    SimsContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    CompaniesContext,
    OperatorsContext,
} from '../../helpers/contexts'
import {
    COMPANY_NEW_PAGE,
    COMPANY_EDIT_PAGE,
    ALL_COMPANIES_PAGE,
    COMPANIES_PAGE_PATH,
    COMPANY_NEW_PAGE_PATH,
    COMPANY_EDIT_PAGE_PATH,
} from "../../helpers/constants";

// Component
function CompaniesHigherOrder(WrappedComponent) {
    // Higher order component
    class CompaniesHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === COMPANY_NEW_PAGE_PATH) {
                document.title = getPageTitle(COMPANY_NEW_PAGE);
            } else if(path === COMPANIES_PAGE_PATH) {
                dispatch(emitCompaniesFetch());
                document.title = getPageTitle(ALL_COMPANIES_PAGE);
            } else if (path ===`${COMPANY_EDIT_PAGE_PATH}/:id`) {
                document.title = getPageTitle(COMPANY_EDIT_PAGE);
                dispatch(emitCompanyFetch({id: match.params.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {requests, errors, dispatch, companies, sims, operators} = this.props;

            return (
                <SimsContext.Provider value={sims}>
                    <ErrorsContext.Provider value={errors}>
                        <RequestsContext.Provider value={requests}>
                            <DispatchContext.Provider value={dispatch}>
                                <CompaniesContext.Provider value={companies}>
                                    <OperatorsContext.Provider value={operators}>
                                        <WrappedComponent />
                                    </OperatorsContext.Provider>
                                </CompaniesContext.Provider>
                            </DispatchContext.Provider>
                        </RequestsContext.Provider>
                    </ErrorsContext.Provider>
                </SimsContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    CompaniesHigherOrderClass.propTypes = {
        sims: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired,
        companies: PropTypes.object.isRequired,
        operators: PropTypes.object.isRequired
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        sims: state.sims,
        errors: state.errors,
        requests: state.requests,
        companies: state.companies,
        operators: state.operators,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(CompaniesHigherOrderClass);
}

export default CompaniesHigherOrder;
