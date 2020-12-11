import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {emitSimsFetch} from "../../redux/sims/actions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {LISTING_PAGE, LISTING_PAGE_PATH} from "../../helpers/constants";
import {SimsContext, ErrorsContext, DispatchContext, RequestsContext} from '../../helpers/contexts'

// Component
function ListingHigherOrder(WrappedComponent) {
    // Higher order component
    class ListingHigherOrder extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === LISTING_PAGE_PATH) {
                dispatch(emitSimsFetch());
                document.title = getPageTitle(LISTING_PAGE);
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {requests, errors, sims, dispatch} = this.props;

            return (
                <SimsContext.Provider value={sims}>
                    <ErrorsContext.Provider value={errors}>
                        <RequestsContext.Provider value={requests}>
                            <DispatchContext.Provider value={dispatch}>
                                <WrappedComponent />
                            </DispatchContext.Provider>
                        </RequestsContext.Provider>
                    </ErrorsContext.Provider>
                </SimsContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    ListingHigherOrder.propTypes = {
        sims: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired,
    };

    // Map state function to component props
    const mapStateToProps = (state) => ({
        sims: state.sims,
        errors: state.errors,
        requests: state.requests,
    });

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(ListingHigherOrder);
}

export default ListingHigherOrder;
